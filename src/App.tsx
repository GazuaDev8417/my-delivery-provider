import type { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import Router from "./routes/Router"



const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 📜 Modern Cross-Browser Customized Scrollbar Layout */
  html {
    scrollbar-width: thin;
    scrollbar-color: #dc2b2b #f1f5f9;
  }

  html::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  html::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  html::-webkit-scrollbar-thumb {
    background: #dc2b2b;
    border-radius: 10px;
    border: 2px solid #f1f5f9;

    &:hover {
      background: #b91c1c;
    }
  }

  /* ⌨️ Form Element Primitives Overrides */
  input {
    font-family: inherit;
    font-size: 1rem;
    height: 42px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background-color: #ffffff;
    outline: none;
    transition: border-color 0.15s ease-in-out;

    &:focus {
      border-color: #dc2b2b;
    }
  }

  input[type='file'] {
    border: none;
    padding-left: 0;
    background: transparent;
    height: auto;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.2rem;
    color: #ffffff;
    background-color: #dc2b2b;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.2s;

    &:hover {
      background-color: #b91c1c;
      box-shadow: 0 4px 6px rgba(185, 28, 28, 0.2);
    }

    &:active {
      transform: scale(0.97);
    }
  }

  /* ⚡ Shared Global Utility Icons & Actions */
  .header-icon {
    font-size: 1.5rem;
    cursor: pointer;
    color: #64748b;
    transition: color 0.2s ease-in-out, transform 0.1s;

    &:hover {
      color: #dc2b2b;
    }

    &:active {
      transform: scale(0.93);
    }
  }

  .client {
    font-size: 1rem;
    font-weight: 600;
    color: #2563eb;
    cursor: pointer;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }
`;



const App:FC = ()=>{
  return(
    <BrowserRouter>
      <GlobalStyle/>
      <Router/>
    </BrowserRouter>
  )
}


export default App