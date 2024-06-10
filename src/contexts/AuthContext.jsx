import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password, callback) => {
        const validUsers = [
            { username: 'Enmanuel Dominguez', password: 'adminparking123' },
            { username: 'Luis Calvo', password: 'adminparking123' },
            { username: 'admin', password: 'admin' }
        ];
        
        const user = validUsers.find(user => user.username === username && user.password === password);
        
        if (user) {
            setUser({ username });
            callback();
        } else {
            alert('Credenciales invalidas');
        }
    };

    const logout = (callback) => {
        setUser(null);
        callback();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;