import React, { type ChangeEvent, type SubmitEvent, useState, useEffect, type FC, useMemo, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { BASE_URL } from '../constants/url';
import { useGlobal } from '../hooks/useGlobal';

// 📋 Type Definitions
type Screen = 'list' | 'insert' | 'update';

interface UpdateProductProps {
  product: string; // The specific ID of the target product to load and edit
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

interface ProductFormData {
  category: string;
  description: string;
  name: string;
  price: string;
}

// 🎨 Polished Modern CSS Interface Layer (Matches InsertProduct)
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 1.5rem 0;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  }

  .form-input {
    width: 100%;
    box-sizing: border-box;
  }

  /* 🖼️ Modernized Upload Box Area */
  .photo-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px dashed #cbd5e1;
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &:hover {
      border-color: #dc2b2b;
    }

    label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #475569;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  button {
    flex: 1;
    height: 44px;
    font-size: 0.95rem;
    font-weight: 600;
    
    &[type="button"] {
      background-color: #f1f5f9;
      color: #475569;

      &:hover:not(:disabled) {
        background-color: #e2e8f0;
        color: #1e293b;
      }
    }
  }
`;

const UpdateProduct: FC<UpdateProductProps> = ({ product, setScreen }) => {
  const { providerToken } = useGlobal();
  
  // Component States
  const [image, setImage] = useState<File | null>(null);
  const [isUiLoading, setIsUiLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<ProductFormData>({
    category: '',
    description: '',
    name: '',
    price: ''
  });
  

  const requestConfig = useMemo(() => ({
    headers: { Authorization: providerToken || '' }
  }), [providerToken]);
  

  const loadProductDetails = useCallback(async () => {
    try {
      setIsUiLoading(true);
      const res = await axios.get(`${BASE_URL}/product/${product}`, requestConfig);
      
      setForm({
        category: res.data.category || '',
        description: res.data.description || '',
        name: res.data.name || '',
        price: String(res.data.price || '')
      });
    } catch (error: any) {
      console.error("Failed to fetch product values from service database:", error);
      alert("Não foi possível carregar os detalhes do produto.");
      setScreen('list');
    } finally {
      setIsUiLoading(false);
    }
  }, [product, requestConfig, setScreen]);

  useEffect(() => {
    loadProductDetails();
  }, [loadProductDetails]);
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  

  const handlePriceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 46) {
      e.preventDefault();
    }
  };
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  
  const handleClearForm = (): void => {
    setForm({
      category: '',
      description: '',
      name: '',
      price: ''
    });
    setImage(null);
  };
  
  
  const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData();
    formData.append('category', form.category.trim());
    formData.append('description', form.description.trim());
    formData.append('name', form.name.trim());
    formData.append('price', String(form.price));

    if (image) {
      formData.append('image', image);
    }

    try {
      setIsSubmitting(true);
      
      await axios.patch(`${BASE_URL}/my-delivery-upload/product/${product}`, formData, {
        headers: {
          Authorization: providerToken || '',
          'Content-Type': 'multipart/form-data'
        }
      });

      // Navigate back to the visual layout menu tree list matching profile components
      setScreen('list');
    } catch (error: any) {
      console.error("Failed to commit item updates onto database:", error);
      alert(error.response?.data || "Ocorreu um erro ao atualizar o produto. Verifique os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUiLoading) {
    return <div style={{ textAlign: "center", padding: "1.5rem", color: "#64748b" }}>Buscando detalhes do produto...</div>;
  }

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-input"
          name="category"
          value={form.category}
          onChange={handleInputChange}
          placeholder="Categoria (Ex: Bebidas, Pizzas)"
          disabled={isSubmitting}
          required
        />
        
        <input
          type="text"
          className="form-input"
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Descrição dos ingredientes"
          disabled={isSubmitting}
          required
        />
        
        <input
          type="text"
          className="form-input"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Nome do produto"
          disabled={isSubmitting}
          required
        />

        <div className="photo-container">
          <label htmlFor="photo">Substituir Imagem do Produto (Opcional)</label>
          <input
            id="photo"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
        </div>

        <input
          type="text"
          className="form-input"
          onKeyPress={handlePriceKeyPress}
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Preço (R$ 0.00)"
          disabled={isSubmitting}
          required
        />

        <div className="btn-container">
          <button 
            type="button" 
            disabled={isSubmitting} 
            onClick={handleClearForm}
          >
            Limpar
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateProduct;