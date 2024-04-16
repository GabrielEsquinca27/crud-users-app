import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signup } from '../functions/functions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Signup() {

    const [form, setForm] = useState({
        fname: '',
        lname: '',
        phone: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(form);
        if (res.success) {
            console.log('¡Usuario registrado correctamente!:', res.data);
            window.location.href = '/';
        } else {
            console.log(res.message);
        }
    };

    useEffect(() => {
        const user = cookies.get('username');
        if (user) {
            window.location.href = '/home';
        }
    },[]);

    return (
        <>
            <OverLay>
                <DivContainer>
                    <form onSubmit={handleSubmit}>
                        <div className="register">		
                            <div className="block">
                                <h1>Registro</h1>
                            </div> 
                            <div className="input">
                                <div className="group">
                                    <input type="text" name="fname" onChange={handleChange} placeholder="Nombre"/>
                                    <input type="text" name="lname" onChange={handleChange} placeholder="Apellidos"/>
                                </div>
                            </div>
                            <div className="input">
                                <input type="tel" name="phone" onChange={handleChange} placeholder="Teléfono"/>
                            </div>
                            <div className="input">
                                <input type="text" name="username" onChange={handleChange} placeholder="Usuario"/>
                            </div>
                            <div className="input">
                                <input type="password" name="password" onChange={handleChange} placeholder="Contraseña"/>
                            </div>
                            <div className="input">
                                <button type="submit" value="signup">Registrarse</button>   
                            </div>	
                            <div className="toLogin">
                                <a href="/">Tengo cuenta</a>
                            </div>
                        </div>
                    </form>
                </DivContainer>
            </OverLay>
        </>
    );
}

export default Signup;

const OverLay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #280ce0;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DivContainer = styled.div`
    display: flex; 
	justify-content: center; 
	align-items: center; 

    .register {
        position: relative; 
        padding: 60px;
        background: #fff;
        border-radius: 10px;
        width: 450px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07); 

        .block {
            text-align: center;
            margin-bottom: 8px;

            h1 {
                font-weight: 600;
                color: #280ce0;
            }
        }

        .group {
            display: flex;
            gap: 10px;
            
            input {
                width: 50%;
            }
        }

        input {
            box-sizing: border-box;
            position: relative; 
            width: 100%;
            padding: 15px; 
            border: 2px solid #D9D9D9;
            border-radius: 8px;
            font-size: 18px; 
            color: #455A64; 
            outline: none;
        }

        button {
            border: none;
            background: #040202;
            cursor: pointer;
            width: 100%;
            color: white;
            padding: 15px;        
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            font-size: 20px;
            border-radius: 5px;
            margin-top: 15px;
        }

        .toLogin {
            text-align: center;
            
            a {
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                color: #280ce0;
            }
        }
    }
`