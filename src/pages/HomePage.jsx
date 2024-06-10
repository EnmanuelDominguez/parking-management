import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div>
        <h2>Bienvenido al Parking Management</h2>
        <p/>
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registrar vehiculo</Link></li>
                <li><Link to="/entry">Registrar ingreso de vehiculo</Link></li>
                <li><Link to="/status">Estado del parqueadero</Link></li>
            </ul>
        </nav>
    </div>
);

export default HomePage;