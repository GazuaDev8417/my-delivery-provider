import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0 1rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin: 1.5rem 0 0.5rem;
    text-align: left;

    @media (max-width: 660px) {
      font-size: 1.5rem;
    }
  }

  /* 🧑‍💼 Modern Profile Details Sections */
  .user-section, 
  .address-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.25rem;
    margin-top: 1rem;
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    line-height: 1.6;
    font-size: 1rem;
    color: #334155;
    box-sizing: border-box;
    
    strong {
      color: #0f172a;
      font-size: 1.1rem;
    }
  }    

  /* Highlighting the physical address panel cleanly without using raw gray */
  .address-section {
    background-color: #f8fafc;
    border-left: 4px solid #dc2b2b;
  }

  .addressAndName {
    margin: 1.5rem 0;
    line-height: 1.5;
  }

  .sticky-title{
    position: sticky;
    top:0; 
    background: white;
    padding: 0 5px;
    border-radius: 5px;
    z-index: 100;
  }

  .order-history {
    font-size: 1.35rem;
    font-weight: 600;
    color: #0f172a;
    margin: 2.5rem 0 0.5rem;

    @media (max-width: 660px) {
      font-size: 1.2rem;
    }
  }

  /* 📦 Flex Grid Active Orders Layout */
  .card-container {
    /* display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem; */
    display: grid;
    width: 100%;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin-top: 1rem;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    width: 100%;
    padding: 1.25rem;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    line-height: 1.5;
    color: #475569;
    font-size: 0.95rem;

    b {
      color: #1e293b;
    }
  }

  .rest-name {
    color: #dc2b2b;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    border-bottom: 1px dashed #f1f5f9;
    padding-bottom: 0.5rem;
  }

  /* 🔘 Adaptive Action Utilities inside Cards */
  button {
    width: 100%;
    max-width: 240px;
    margin-top: 0.75rem;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    
    @media (max-width: 480px) {
      max-width: 100%;
    }
  }
`;