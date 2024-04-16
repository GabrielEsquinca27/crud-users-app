import axios from "axios";

// Endpoint donde haremos las peticiones
const baseUrl = "http://localhost:3001/users";

/* Métodos para hacer peticiones http a la API con el fin de
*  [1] consultar la información y permitir el Inicio de sesión */
const login = async (form) => {
    try {
        const request = await axios.get(baseUrl, {params: {
            username: form.username, 
            password: form.password
        }});
        if (request.data.length > 0) {
            return { 
                success: true, 
                data: request.data[0] 
            };
        } else {
            return { 
                success: false, 
                message: '¡Usuario no encontrado!' 
            };
        }
    } catch (err) {
        console.log('¡Ups! Tenemos problemas para iniciar sesión:', err);
        return { 
            success: false, 
            message: '¡Ups! Tenemos problemas para iniciar sesión' 
        };
    }
};

/* [2] permitir el registro de nuevos usuarios */

const getLastUserId = async () => {
    try {
        const request = await axios.get(baseUrl);
        const users = request.data;
        const lastUser = users.reduce((max, user) => (parseInt(user.id) > parseInt(max) ? user.id : max), "0");
        return lastUser;
    } catch (err) {
        console.log('¡Ups! No tuvimos éxito al obtener el último usuario:', err);
        return null;
    }
};

const signup = async (form) => {
    try {
        const lastUserId = await getLastUserId();
        const newId = (parseInt(lastUserId) + 1).toString();

        const request = await axios.post(baseUrl, {
            id: newId,
            fname: form.fname,
            lname: form.lname,
            phone: form.phone,
            username: form.username,
            password: form.password
        });
        return {
            success: true,
            data: request.data
        };
    } catch (err) {
        console.log('¡Ups! Tenemos problemas para registrar el usuario:', err);
        return { 
            success: false, 
            message: '¡Ups! Tenemos problemas para registrar el usuario:' 
        };
    }
};

// Leer datos de los usuarios
const readUsers = async () => {
    try {
        const request = await axios.get(baseUrl);
        return {
            success: true,
            data: request.data
        };
    } catch (err) {
        console.log('¡Ups! Tenemos problemas para acceder a la tabla de usuarios:', err);
        return [];
    }
};

// Actualizar dato de un usuario
const updateUser = async (id, formData) => {
    try {
        const userUrl = baseUrl + '/' + id;
        const getUserData = await axios.get(userUrl);
        const updateUserData = { ...getUserData.data, ...formData };
        const request = await axios.put(userUrl, updateUserData);

        return {
            success: true,
            data: request.data
        };
    } catch (err) {
        console.log('¡Ups! Tenemos problemas para actualizar el usuario:', err);
        return { 
            success: false, 
            message: '¡Ups! Tenemos problemas para actualizar el usuario' 
        };
    }
};

// Eliminar dato de un usuario
const deleteUser = async (id) => {
    try {
        const userUrl = baseUrl + '/' + id;
        await axios.delete(userUrl);
        return { 
            success: true, 
            message: 'Usuario eliminado correctamente' 
        };
    } catch (err) {
        console.log('¡Ups! Tenemos problemas para eliminar el usuario:', err);
        return { 
            success: false, 
            message: '¡Ups! Tenemos problemas para eliminar el usuario' 
        };
    }
};

export { login, signup, readUsers, updateUser, deleteUser };