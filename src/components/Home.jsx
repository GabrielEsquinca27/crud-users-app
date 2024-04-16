import React, {useEffect} from 'react';
import styled from 'styled-components';
import { TbLogout } from "react-icons/tb";
import Cookies from 'universal-cookie';
import Content from './Content';

const cookies = new Cookies();

function Home() {

    const username = cookies.get('username');

    const logout = (e) => {
        cookies.remove('username',{path:"/"});
        window.location.href = '/';
    };

    useEffect(() => {
        const user = cookies.get('username');
        if (!user) {
            window.location.href = '/';
        }
    },[]);

    return (
        <>
            <DivContainer>
                <div className='logo'>
                    <h2><span>Página Principal</span></h2> 
                </div>
                <div className='welcome'> 
                    <div className='username'>
                        <p>¡Hola <b><span>{username}</span></b>!</p>
                    </div>       
                    <div className='bi btnLogout' onClick={logout}>
                        <TbLogout />
                    </div>                                
                </div>
            </DivContainer>
            <DivContent>
                <Content />
            </DivContent>
        </>
    );
}

export default Home;

const DivContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    color: #000000;
    padding: 1rem 3rem;
    border-bottom: 1px solid #c6c9db7b;
    user-select: none;
    height: 70px;
    .logo {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    h2{
        margin-left: 20px;
        color: #151515;
        font-weight: 400;
        span{
            font-weight: bold;
        }
    }
    .welcome {
        display: flex;
        align-items: center;
        gap: 20px; 
        .bi {
            font-size: 35px;
        }
    }
    .welcome div {
        display: flex;
        justify-content: center;
    }
    .username span {
        color: #3E08C9;
        font-weight: 700;
    }
    .username p{
        font-size: 20px;
    }
    .btnLogout {
        display: flex;
        align-items: center;
        width: 80px;
        height: 80%;
        &:hover {
            background: #f55a5c7a;
            border-radius: 50%;
            padding: 12px 0px;
            cursor: pointer;
            transition: all 0.3s;
        }
    }
`
const DivContent = styled.div`
    
`