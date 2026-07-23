import { type ChangeEvent, type FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdFeed } from "react-icons/md";
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import { Container } from './styled';
import { BASE_URL } from "../../constants/url";
import Header from "../../components/Header";
import InsertProduct from "../../components/InsertProduct";
import UpdateProduct from "../../components/UpdateProduct";
import type { Products, Restaurant } from "../../types/types";
import { useGlobal } from "../../hooks/useGlobal";
import { ProviderRoutes } from "../../routes/paths";

type GroupedProducts = {
  category: string;
  items: Products[];
};

type Screen = 'list' | 'insert' | 'update';

const Profile: FC = () => {
  const navigate = useNavigate();
  const { providerToken, logoutProvider } = useGlobal();
  const productsRef = useRef<HTMLDivElement | null>(null);

  // Core UI states
  const [searchWord, setSearchWord] = useState<string>('');
  const [products, setProducts] = useState<Products[]>([]);
  const [screen, setScreen] = useState<Screen>('list');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [menu, setMenu] = useState<Restaurant>({
    address: '',
    category: '',
    email: '',
    id: '',
    logourl: '',
    name: '',
    phone: '',
  });

  // 🛡️ Memoize Authorization Headers
  const requestConfig = useMemo(() => ({
    headers: { Authorization: providerToken || '' }
  }), [providerToken]);

  // 🔄 Fetch and Synchronize Restaurant Profile Data
  const fetchRestaurantProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const restaurantRes = await axios.get<Restaurant>(`${BASE_URL}/restaurants`, requestConfig);
      setMenu(restaurantRes.data);

      const productsRes = await axios.get<Products[]>(`${BASE_URL}/restaurants/products`, requestConfig);
      setProducts(productsRes.data);
    } catch (error: any) {
      console.error("Failed to fetch restaurant profile datasets:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [requestConfig]);

  // Sync initial dataset and run updates when returning to the catalog overview list view
  useEffect(() => {
    if (screen === 'list') {
      fetchRestaurantProfile();
    }
  }, [screen, fetchRestaurantProfile]);

  // 📜 Autoscroll helper when selecting categories
  useEffect(() => {
    if (openCategory && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openCategory]);

  // 🗂️ Optimally group products by category using useMemo to prevent re-calculations during live text searches
  const groupedProducts = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      const categoryKey = product.category.trim();
      if (!acc[categoryKey]) {
        acc[categoryKey] = { category: categoryKey, items: [] };
      }
      acc[categoryKey].items.push(product);
      return acc;
    }, {} as Record<string, GroupedProducts>);

    const results = Object.values(grouped);
    
    // Auto-select the first category if none is currently selected
    if (results.length > 0 && !openCategory) {
      setOpenCategory(results[0].category);
    }
    
    return results;
  }, [products, openCategory]);

  // 🔍 Interactive Catalog Live Filter
  const filteredCategoryItems = useMemo(() => {
    const activeGroup = groupedProducts.find(g => g.category === openCategory);
    if (!activeGroup) return [];
    
    return activeGroup.items.filter(product =>
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    );
  }, [groupedProducts, openCategory, searchWord]);

  // 🗑️ Delete Product Flow
  const handleDeleteProduct = async (product: Products) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${product.name}" from your menu?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/restaurants/product/${product.id}`, requestConfig);
      await fetchRestaurantProfile();
    } catch (error: any) {
      console.error("Product deletion stream failed:", error.response?.data || error.message);
      alert("It was not possible to remove the product from your menu.");
    }
  };

  // 🚪 Session Logout Engine
  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja deslogar do painel administrativo?')) {
      logoutProvider();
      navigate(ProviderRoutes.LOGIN);
    }
  };

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!openCategory) {
      alert('Selecione uma categoria de produto antes de realizar uma busca');
      return;
    }
    setSearchWord(e.target.value);
  };

  if (isLoading && screen === 'list') {
    return <div style={{ textAlign: 'center', marginTop: '20vh' }}>Carregando dados do cardápio...</div>;
  }

  return (
    <>
      <Header
        leftIcon={
          <MdFeed className="header-icon" onClick={() => navigate(ProviderRoutes.ORDERS)} />
        }
        rightIcon={
          <AiOutlineLogout className="header-icon" onClick={handleLogout} />
        }
      />
      
      <Container>
        <div className="card">
          <div className="rest-name">{menu.name || menu.category}</div>
          
          {menu.logourl && (
            <img 
              src={`/imgs/restaurants/${menu.logourl}`}
              alt={menu.name || "Logo do Restaurante"}
              className="image"
              onError={(e) => {
                // Fallback rendering asset if target disk reference is broken
                (e.target as HTMLImageElement).src = '/imgs/restaurants/fallback-restaurant.png';
              }}
            />
          )}

          <div className="menuTitle-container">
            <div/>
            <div className="products">
              {screen === 'list' && 'Menu'}
              {screen === 'insert' && 'Add New Product'}
              {screen === 'update' && 'Update Product'}
            </div>
            
            {screen === 'list' ? (
              <IoMdAddCircle title="Add Product" className="icon" onClick={() => setScreen('insert')} />
            ) : (
              <IoMdCloseCircle title="Back" className="icon" onClick={() => setScreen('list')} />
            )}
          </div>
          
          {screen === 'list' && (  
            <>                  
              <div className="categories-bar" title="Clique para filtrar por categoria">
                {groupedProducts.map(group => (
                  <h3 
                    key={group.category} 
                    onClick={() => {
                      setOpenCategory(group.category);
                      setSearchWord(''); // Auto-clear search when switching categories
                    }}
                    style={{
                      color: openCategory === group.category ? "#dc2b2b" : "#475569",
                      borderBottom: openCategory === group.category ? "2px solid #dc2b2b" : "none",
                      cursor: 'pointer'
                    }}
                  >
                    {group.category}
                  </h3>
                ))}
              </div>

              <input 
                className="search-input"
                type="text" 
                value={searchWord}
                onChange={handleInputSearch}
                placeholder="🔍 Search for products in this category..."
              />
            </>
          )}
          
          <div className="products-container" ref={productsRef}>
            {screen === 'list' && openCategory && (
              <div>
                {filteredCategoryItems.map(product => (
                  <div className="products-card" key={product.id}>
                    <img
                      className="product-image" 
                      src={product.photoUrl || '/imgs/restaurants/fallback-food.png'}
                      alt={product.name}
                    />
                    <div className="product-desc">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <div className="price-tag">R$ {Number(product.price).toFixed(2)}</div>
                    </div>
                    
                    <div className="btn-button">
                      <button 
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product.id);
                          setScreen('update');
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        type="button"
                        className="remove-btn"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Remove
                      </button>
                    </div>                                 
                  </div>
                ))}

                {filteredCategoryItems.length === 0 && (
                  <p className="no-products-msg">No product found.</p>
                )}
              </div>
            )}

            {screen === 'insert' && <InsertProduct setScreen={setScreen} />}
            {screen === 'update' && selectedProduct && (
              <UpdateProduct product={selectedProduct} setScreen={setScreen} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;