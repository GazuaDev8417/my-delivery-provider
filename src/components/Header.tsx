import type { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 20px;

    img:hover{
        cursor: pointer;
    }
`

interface HeaderProps{
    leftIcon:ReactNode
    rightIcon:ReactNode
}


const Header = (props:HeaderProps)=>{
    return(
        <Container>
            {props.leftIcon}
            {props.rightIcon}
        </Container>
    )
}

export default Header