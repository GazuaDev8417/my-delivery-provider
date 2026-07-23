import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 600px; /* Limits the profile width on desktop so it doesn't stretch too wide */
    margin: 40px auto 80px; /* Centered with reliable top/bottom margins instead of VH */
    padding: 0 20px; /* Safe padding for mobile edges */
    box-sizing: border-box;

    @media(max-width: 517px){
        margin: 20px auto 40px;
    }

    h1 {
        text-align: center;
        font-size: 1.8rem;
        margin: 20px 0;
        color: #333;
    }

    .user-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 20px 10px;
        line-height: 1.8;
        border-bottom: 1px solid #eaeaea; /* Elegant separation line instead of a heavy hr */
    }   
    
    .properties {
        font-weight: 600;
        color: #555;
    }

    .address-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: #f7f7f7; /* Softer, modern light gray background */
        padding: 20px;
        line-height: 1.8;
        border-radius: 12px;
        margin-top: 25px;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
    }

    .registered-address {
        font-weight: 600;
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 12px;

        @media(max-width: 375px){
            font-size: 1.1rem;
        }
    }

    .icon {
        font-size: 1.6rem;
        color: #666;
        cursor: pointer;
        transition: color 0.2s, transform 0.1s;
        padding: 5px;

        &:hover {
            color: #dc2b2b; /* Subtle hover color feedback */
        }

        &:active {
            transform: scale(0.9);
        }
    }

    /* MEDIA QUERIES */
    @media(max-width: 660px){
        h1 {
            font-size: 1.5rem;
        }
    }
`