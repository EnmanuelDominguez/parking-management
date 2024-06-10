import React, { useState, useContext } from 'react';
import ParkingContext from '../contexts/ParkingContext';
import '../styles/RegisterVehiclePage.css';

const RegisterVehiclePage = () => {
    const { registerVehicle } = useContext(ParkingContext);
    const [document, setDocument] = useState('');
    const [type, setType] = useState('carro');
    const [plate, setPlate] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cylinder, setCylinder] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const plateRegexCar = /^[A-Z]{3}[0-9]{3}$/;
        const plateRegexMoto = /^[A-Z]{3}[0-9]{2}[A-Z]$/;

        if (type === 'carro' && !plateRegexCar.test(plate)) {
            alert('La placa del carro debe tener formato ABC123.');
            return;
        }

        if (type === 'moto' && !plateRegexMoto.test(plate)) {
            alert('La placa de la moto debe tener formato ABC12D.');
            return;
        }

        const vehicle = { type, plate, brand, model, cylinder: type === 'moto' ? cylinder : undefined };
        registerVehicle(document, vehicle);

        setDocument('');
        setType('carro');
        setPlate('');
        setBrand('');
        setModel('');
        setCylinder('');
    };

    const carBrands = ["FORD", "NISSAN", "CHEVROLET", "TOYOTA", "BMW", "HYUNDAI", "MERCEDES BENZ", "KIA", "OPEL", "RENAULT", "MAZDA", "JAGUAR"];
    const motoBrands = ["SUZUKI", "YAMAHA", "HONDA", "BMW", "KAWASAKI", "AKT", "PULSAR", "N-MAX", "AGILITY"];

    return (
        <div className="register-vehicle-page">
            <h2>Registrar Vehículo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cédula:</label>
                    <input type="text" value={document} onChange={(e) => setDocument(e.target.value)} required />
                </div>
                <div>
                    <label>Tipo de Vehículo:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="carro">Carro</option>
                        <option value="moto">Moto</option>
                    </select>
                </div>
                <div>
                    <label>Placa:</label>
                    <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} maxLength={6} required />
                </div>
                <div>
                    <label>Marca:</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} required>
                        <option value="">Seleccione una marca</option>
                        {(type === 'carro' ? carBrands : motoBrands).map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Modelo:</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                </div>
                {type === 'moto' && (
                    <div>
                        <label>Cilindraje:</label>
                        <input type="text" value={cylinder} onChange={(e) => setCylinder(e.target.value)} required />
                    </div>
                )}
                <button type="submit">Registrar Vehículo</button>
            </form>
        </div>
    );
};

export default RegisterVehiclePage;