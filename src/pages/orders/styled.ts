import styled from 'styled-components';

export const Container = styled.div`
  margin: 12vh auto;
  padding: 0 2rem;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    text-align: center;
    color: #1e293b;
    margin: 2rem 0;
  }

  .logout-icon {
    position: absolute;
    top: 1.5%;
    right: 2%;
    font-size: 2rem;
    cursor: pointer;
    color: #64748b;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #ef4444;
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 0 20px;
    line-height: 1.6;
  }

  .address-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 1rem;
    line-height: 1.6;
    border-radius: 10px;
  }

  .addressAndName {
    margin: 20px 0 10px;
    line-height: 1.6;
  }

  .icon {
    font-size: 2rem;
    cursor: pointer;
    color: #dc2b2b;
    transition: transform 0.2s ease-in-out, color 0.2s;

    &:hover {
      color: #b91c1c;
    }

    &:active {
      transform: scale(0.92);
    }
  }

  .categories-bar {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    width: 100%;
    overflow-x: auto;
    padding: 0.75rem 0;
    scrollbar-width: none; /* Hide standard scrollbar on Firefox */
    
    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar on Chrome/Safari */
    }

    h3 {
      font-size: 1.15rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.2s ease-in-out, transform 0.2s;

      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: #e2e8f0;
    margin: 1.5rem 0;
  }

  .order-history {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  small {
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  /* 🎴 Optimized Dashboard Grid System */
  .card-container {
    display: grid;
    width: 100%;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 1rem;
  }

  .total-title {
    grid-column: 1 / -1; /* Make total title stretch completely across grid columns */
    position: sticky;
    top: 0;
    background: #ffffff;
    z-index: 10;
    padding: 0.5rem 0;
    font-size: 1.35rem;
    color: #0f172a;
    border-bottom: 2px solid #ef4444;
    margin-bottom: 0.5rem;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }

  .card-content {
    font-size: 0.95rem;
    color: #334155;
    line-height: 1.7;

    b {
      color: #1e293b;
    }
  }

  .rest-name {
    color: #dc2b2b;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #1d4ed8;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .check-client-btn,
  .remove-btn {
    flex: 1;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s, transform 0.1s;

    &:active {
      transform: scale(0.98);
    }
  }

  .check-client-btn {
    background-color: #0f172a;
    color: #ffffff;

    &:hover {
      background-color: #1e293b;
    }
  }

  .remove-btn {
    background-color: #fee2e2;
    color: #ef4444;

    &:hover {
      background-color: #fca5a5;
    }
  }

  /* 📱 RESPONSIVE MEDIA QUERIES */
  @media (max-width: 660px) {
    margin: 10vh auto;
    padding: 0 1rem;

    h1 {
      font-size: 1.75rem;
    }

    .order-history {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 517px) {
    .icon {
      display: none;
    }

    .card-container {
      grid-template-columns: 1fr; /* Stack cards perfectly in one column on mobile screens */
    }

    .btn-container {
      flex-direction: column;
    }

    .check-client-btn,
    .remove-btn {
      width: 100%;
    }
  }
`;