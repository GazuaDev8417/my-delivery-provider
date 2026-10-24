import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 80vh; /* Replaced hardcoded heights with a responsive minimum floor */
    padding: 2rem 1rem;
    box-sizing: border-box;
    width: 100%;

    img {
        width: 120px;
        margin-bottom: 1rem;
        object-fit: contain;
    }

    .title {
        font-size: 2rem;
        margin-bottom: 2rem;
        font-weight: 500;
        color: #333;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
        width: 100%;
        max-width: 340px; /* Unified form width constraint */
    }

    /* Screen-reader only class for accessible hidden labels */
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
        padding: 0.75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Modern soft shadow texture */
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus {
        border-color: #b11717;
        box-shadow: 0 0 0 3px rgba(177, 23, 23, 0.2); /* Clean, modern focus halo */
        outline: none;
    }

    /* Reliable wrapping container for fields that contain secondary overlay icons */
    .input-icon-container {
        position: relative;
        width: 100%;
    }
    
    /* Robust relative centering that will never drift off the input field bounds */
    .eye-icon {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        font-size: 1.2rem;
        cursor: pointer;
        color: #666;
        transition: color 0.2s;

        &:hover {
            color: #b11717;
        }
    }

    .btn-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
        width: 100%;        
    }

    .signup-button {
        width: 100%;
        padding: 0.75rem;
        color: white;
        background-color: #b11717; /* Defined clear default fallback background state */
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;

        &:hover {
            background-color: #990f0f;
            box-shadow: 0 4px 8px rgba(153, 15, 15, 0.3);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(177, 23, 23, 0.4);
        }

        &:active {
            transform: scale(0.98); /* Native press effect feedback */
        }
    }

    /* Outlines the primary grouped configuration layout block */
    .submit-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        width: 100%;
    }

    /* Dynamic responsive sizing adaptation */
    @media (max-width: 360px) {
        form {
            max-width: 100%;
        }
        
        .title {
            font-size: 1.6rem;
        }
    }
`