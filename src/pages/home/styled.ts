import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0 1rem;
    margin-top: 12vh;
  }

  @media (max-width: 400px) {
    margin-top: 14vh;
  }

  /* 🏢 Master Restaurant Card Container Layout */
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
    width: 100%;

    @media (max-width: 768px) {
      padding: 1.25rem;
    }
  }

  .rest-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    text-align: center;
    margin-bottom: 1rem;
  }

  /* 🖼️ Sharp Responsive Restaurant Banner Asset */
  .image {
    width: 100%;
    max-width: 320px;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  /* 🧭 Central Menu Subheader Controller Row */
  .menuTitle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #f1f5f9;

    .products {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
    }

    .icon {
      font-size: 1.75rem;
      color: #dc2b2b;
      transition: color 0.2s, transform 0.1s;

      &:hover {
        color: #b91c1c;
        cursor: pointer
      }
      &:active {
        transform: scale(0.92);
      }
    }
  }

  /* 📑 Horizontal Scrollable Category Bar */
  .categories-bar {
    display: flex;
    gap: 1.5rem;
    width: 70%;
    overflow-x: auto;
    padding: 1rem 0;
    margin-bottom: 1rem;
    /* scrollbar-width: none; /* Hide scrollbar tracking metrics for clean navigation rows */
    
    &::-webkit-scrollbar {
      display: none;
    } */

    h3 {
      font-size: 1rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      padding-bottom: 0.5rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #dc2b2b !important;
      }
    }
  }

  /* 🔍 Polished Live Catalog Input Filter */
  .search-input {
    width: 100%;
    max-width: 450px;
    margin: 0.5rem 0 1.5rem;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  /* 📦 Catalog Core Flex Matrix Layout Wrapper */
  .products-container {
    max-height: 400px;
    overflow-y: auto;
    width: 100%;
    margin-top: 1rem;
  }

  /* 🍕 Modern Layout for individual Product Cards */
  .products-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }

  .product-image {
    width: 90px;
    height: 90px;  
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
    object-position: center;
    object-fit: cover;

    @media (max-width: 640px) {
      width: 100%;
      height: 140px;
    }
  }

  .product-desc {
    flex: 1;
    
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: #64748b;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .price-tag {
      font-weight: 700;
      color: #1e293b;
      font-size: 1rem;
    }
  }

  /* 🔘 Alignment Row for Action Control Buttons */
  .btn-button {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;

    @media (max-width: 640px) {
      flex-direction: row;
      width: 100%;
      gap: 1rem;
    }

    button {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      width: 110px;
      height: 38px;

      @media (max-width: 640px) {
        flex: 1;
        width: 100%;
      }

      /* Secondary action modifier layout targeting removal actions natively */
      &.remove-btn {
        background-color: #ef4444;

        &:hover {
          background-color: #dc2626;
          box-shadow: 0 4px 6px rgba(220, 38, 38, 0.15);
        }
      }
    }
  }

  .no-products-msg {
    color: #64748b;
    text-align: center;
    padding: 2rem 0;
    font-size: 0.95rem;
  }
`;