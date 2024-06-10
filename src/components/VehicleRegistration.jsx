import React, { useState, useContext } from 'react';
import ParkingContext from '../contexts/ParkingContext';
import '../styles/RegisterVehiclePage.css';

const VehicleRegistration = () => {
    const { registerVehicle } = useContext(ParkingContext);
    const [document, setDocument] = useState('');
    const [plate, setPlate] = useState('');
    const [type, setType] = useState('carro');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    const validatePlate = (plate, type) => {
        if (type === 'carro') {
            return /^[A-Z]{3}[0-9]{3}$/.test(plate);
        } else {
            return /^[A-Z]{3}[0-9]{2}[A-Z]$/.test(plate);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePlate(plate, type)) {
            alert('Placa no válida.');
            return;
        }
        const vehicle = { plate, type, brand, model };
        const success = registerVehicle(document, vehicle);
        if (success) {
            setDocument('');
            setPlate('');
            setType('carro');
            setBrand('');
            setModel('');
        }
    };

    return (
        <div className="register-vehicle-page">
            <h2>Registrar Vehículo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="Documento"
                    required
                />
                <input
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    placeholder="Placa"
                    maxLength="6"
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="carro">Carro</option>
                    <option value="moto">Moto</option>
                </select>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Marca"
                    list={type === 'carro' ? 'carBrands' : 'motoBrands'}
                    required
                />
                <datalist id="carBrands">
                    <option value="FORD" />
                    <option value="NISSAN" />
                    <option value="CHEVROLET" />
                    <option value="TOYOTA" />
                    <option value="BMW" />
                    <option value="HYUNDAI" />
                    <option value="MERCEDES BENZ" />
                    <option value="KIA" />
                    <option value="OPEL" />
                    <option value="RENAULT" />
                    <option value="MAZDA" />
                    <option value="JAGUAR" />
                </datalist>
                <datalist id="motoBrands">
                    <option value="SUZUKI" />
                    <option value="YAMAHA" />
                    <option value="HONDA" />
                    <option value="BMW" />
                    <option value="KAWASAKI" />
                    <option value="AKT" />
                    <option value="PULSAR" />
                    <option value="N-MAX" />
                    <option value="AGILITY" />
                </datalist>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Modelo"
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default VehicleRegistration;