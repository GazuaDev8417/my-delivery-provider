import styled from 'styled-components'



export const StyledDialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: auto;

  /* Target the native dimmed background overlay */
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }

  @media(max-width: 500px){
    max-width: 350px;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
    
    .subtitle{
        margin: 10px 0 30px;
    }

    .input-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
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

    .form-input {
        padding: .75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        margin: 5px;
        box-shadow: 1px 1px 4px;
    }

    .form-input:focus {
        border: 1px solid #b11717;
        box-shadow: 0 0 4px #000;
        outline: none;
    }  

    .btn-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 320px;
        margin-left: 12px;
    }

    .login-button {
        padding: 10px;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 1px 1px 4px black;
        background: #990f0f;
        cursor: pointer;
        border-radius: 5px;
        border: none;
    }

    .login-button:hover {
        box-shadow: 0 0 6px #a11414;
    }

    .login-button:focus {
        outline: 3px solid #a11414;
        box-shadow: 0 0 6px #000;
    }
`;

// Replaces the .close-btn class
export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  color: black;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  
  &:hover {
    color: #666;
  }
`