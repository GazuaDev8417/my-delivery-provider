import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: #f8fafc; /* Subtle, clean background layout */
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-top: 12vh;
  }

  .title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2rem;
    letter-spacing: -0.5px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 340px;
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
  }

  /* Accessible Screen-Reader only wrapper */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .input-icon-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #334155;
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    box-sizing: border-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      border-color: #dc2b2b;
      box-shadow: 0 0 0 3px rgba(220, 43, 43, 0.15);
      outline: none;
    }

    &:disabled {
      background-color: #f1f5f9;
      color: #94a3b8;
      cursor: not-allowed;
    }
  }

  /* ✨ Absolute positioning handles alignment inside the relative wrapper natively! */
  .eye-icon-wrapper {
    color: #64748b;
    transition: color 0.2s;

    &:hover {
      color: #dc2b2b;
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    margin-top: 0.5rem;
  }

  .login-button {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease-in-out, transform 0.1s;

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Primary submission button styling */
    &[type="submit"] {
      background-color: #dc2b2b;
      color: #ffffff;

      &:hover:not(:disabled) {
        background-color: #b91c1c;
      }

      &:focus {
        outline: 3px solid rgba(220, 43, 43, 0.4);
      }
    }

    /* "Limpar" button styling */
    &.clear-btn {
      background-color: #f1f5f9;
      color: #475569;

      &:hover:not(:disabled) {
        background-color: #e2e8f0;
        color: #1e293b;
      }

      &:focus {
        outline: 3px solid rgba(71, 85, 105, 0.2);
      }
    }
  }

  p {
    margin-top: 1.5rem;
    font-size: 0.925rem;
    color: #64748b;
    text-align: center;
  }

  a {
    color: #dc2b2b;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: #b91c1c;
      text-decoration: underline;
    }
  }
`;