import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signup, readUsers, updateUser, deleteUser } from '../functions/functions';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const Content = () => {

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

    // Almacenamos la lista de usuarios
    const [users, setUsers] = useState([]); 
    // Verificar si vamos a editar
    const [isEditing, setIsEditing] = useState(false);
    // Obtener el id del usuario
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        showUsers();
    }, []);

    const showUsers = async () => {
        const res = await readUsers();
        if (res.success) {
            setUsers(res.data);
        } else {
            //console.log(res.message);
        }
    };

    // Enviar (Crear o editar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const res = await updateUser(editUserId, form);
                if (res.success) {
                    console.log('¡Usuario actualizado correctamente!', res.data);
                    setIsEditing(false);
                    setEditUserId(null);
                    setForm({ fname: '', lname: '', phone: '', username: '', password: '' });
                } else {
                    console.log(res.message);
                }
            } else {
                const res = await signup(form);
                if (res.success) {
                    console.log('¡Usuario registrado correctamente!:', res.data);
                    setForm({ fname: '', lname: '', phone: '', username: '', password: '' });
                } else {
                    console.log(res.message);
                }
            }
            setIsEditing(false);
            showUsers();
        } catch (error) {
            console.error('¡Error al enviar el formulario!', error);
        }
    };

    const handleEdit = (user) => {
        setForm({
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            username: user.username,
            password: user.password
        });
        setIsEditing(true);
        setEditUserId(user.id);
    };

    const handleDelete = async (id) => {
        const res = await deleteUser(id);
        if (res.success) {
            console.log('¡Usuario eliminado correctamente!');
            showUsers();
        } else {
            console.log(res.message);
        }
    };

    return (
        <>
            <DivContainer>
                <h1>Tabla de Usuarios</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <input type="text" name="fname" value={form.fname} onChange={handleChange} placeholder="Nombre" required />
                    </div>
                    <div className="input">
                        <input type="text" name="lname" value={form.lname} onChange={handleChange} placeholder="Apellidos" required />
                    </div>
                    <div className="input">
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required />
                    </div>
                    <div className="input">
                        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Nombre de usuario" required />
                    </div>
                    <div className="input">
                        <input type="text" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required />
                    </div>
                    <div className="input">
                        <button type="submit">{isEditing ? 'Actualizar' : 'Registrar'}</button>
                    </div>
                </form>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Teléfono</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fname}</td>
                                <td width={200}>{user.lname}</td>
                                <td>{user.phone}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button id="btnEdit" onClick={() => handleEdit(user)}>
                                        <FiEdit />
                                    </button>
                                    <button id="btnDelete" onClick={() => handleDelete(user.id)}>
                                        <AiOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </DivContainer>
        </>
    );
};

export default Content;

const DivContainer = styled.div`
    padding: 40px;
    background: #fff;
    h1 {
        font-size: 22px;
        margin-bottom: 20px;
    }

    input {
        position: relative;
        margin-top: 5px;
        padding: 10px; 
        border: 2px solid #D9D9D9;
        border-radius: 8px;
        font-size: 16px; 
        color: #455A64; 
        outline: none;
    }

    button {
        border: none;
        background: #040202;
        color: #ffffff;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
    }
    
`

const Table = styled.table`
    border-collapse: collapse;
    margin-top: 20px;

    th,td {
        font-size: 16px;
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #f2f2f2;
    }

    button {
        border: none;
        border-radius: 6px;
        padding: 10px;
        color: white;
        font-size: 18px;
        margin: 2px;
        cursor: pointer;
    }

    #btnEdit {
        background:#080ec9;
    }

    #btnDelete {
        background: #ED2820;
    }
`
