import { type ChangeEvent, type SubmitEvent, useState, type FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { BASE_URL } from '../constants/url';
import { useGlobal } from '../hooks/useGlobal';

// 📋 Type Definitions
type Screen = 'list' | 'insert' | 'update';

interface InsertProductProps {
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

interface ProductFormData {
  category: string;
  description: string;
  name: string;
  price: string;
  stock: number
}


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

const InsertProduct: FC<InsertProductProps> = ({ setScreen }) => {
  const { providerToken } = useGlobal();
  
  // Component States
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<ProductFormData>({
    category: '',
    description: '',
    name: '',
    price: '',
    stock: 0
  });

  // Handle textual changes securely
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Restrict price keystrokes dynamically to valid decimals only
  const handlePriceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 46) {
      e.preventDefault();
    }
  };

  // Track dynamic canvas image allocations
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Reset form states completely 
  const handleClearForm = (): void => {
    setForm({
      category: '',
      description: '',
      name: '',
      price: '',
      stock: 0
    });
    setImage(null);
  };

  // Multi-part registration pipeline 
  const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const capitalizeFirstLetter = form.category.charAt(0).toUpperCase() + form.category.slice(1)
    const formData = new FormData();
    formData.append('category', capitalizeFirstLetter.trim());
    formData.append('description', form.description.trim());
    formData.append('name', form.name.trim());
    formData.append('price', String(form.price));
    formData.append('stock', form.price);

    if (image) {
      formData.append('image', image);
    }

    try {
      setIsSubmitting(true);
      
      await axios.post(`${BASE_URL}/restaurants/product`, formData, {
        headers: {
          Authorization: providerToken || '',
          'Content-Type': 'multipart/form-data'
        }
      });

      // Jump back cleanly to the catalog overview board
      setScreen('list');
    } catch (error: any) {
      console.error("Failed to commit item onto menu database tree:", error);
      alert(error?.response?.data?.message ||
        error?.response?.data ||
        "An error occured while registering product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-input"
          name="category"
          value={form.category}
          onChange={handleInputChange}
          placeholder="Category"
          disabled={isSubmitting}
          required
        />
        
        <input
          type="text"
          className="form-input"
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
          disabled={isSubmitting}
          required
        />
        
        <input
          type="text"
          className="form-input"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Product name"
          disabled={isSubmitting}
          required
        />

        <div className="photo-container">
          <label htmlFor="photo">Product image</label>
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
          placeholder="Price (R$ 0.00)"
          disabled={isSubmitting}
          required
        />

        <input
          type="text"
          className="form-input"
          onKeyPress={handlePriceKeyPress}
          name="stock"
          value={form.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          disabled={isSubmitting}
          required
        />

        <div className="btn-container">
          <button 
            type="button" 
            disabled={isSubmitting} 
            onClick={handleClearForm}
          >
            Clear
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resgistering...' : 'Register'}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default InsertProduct;