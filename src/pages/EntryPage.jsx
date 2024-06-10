import React, { useContext, useState } from 'react';
import ParkingContext from '../contexts/ParkingContext';
import '../styles/EntryPage.css';

const EntryPage = () => {
    const { employees, registerEntry } = useContext(ParkingContext);
    const [input, setInput] = useState('');
    const [selectedVehicles, setSelectedVehicles] = useState([]);

    const handleSearch = () => {
        const employee = employees.find(emp => emp.document === input);
        if (employee) {
            setSelectedVehicles(employee.vehicles.map(vehicle => ({ ...vehicle, document: employee.document })));
        } else {
            const allVehicles = employees.flatMap(emp => emp.vehicles.map(vehicle => ({ ...vehicle, document: emp.document })));
            const vehicle = allVehicles.find(v => v.plate === input);
            if (vehicle) {
                setSelectedVehicles([vehicle]);
            } else {
                alert('No se encontró el vehículo o documento.');
                setSelectedVehicles([]);
            }
        }
    };

    const handleRegister = (vehicle) => {
        const date = new Date();
        const entryData = {
            ...vehicle,
            entryTime: date.toLocaleString(),
            cellNumber: null,
        };
        registerEntry(entryData);
    };

    return (
        <div className="entry-page">
            <h2>Registrar Ingreso de Vehículos</h2>
            <div className="search-section">
            <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ingrese cédula o placa"
                />
                <button className='searchbutton' onClick={handleSearch}>Buscar</button>
            </div>
            {selectedVehicles.length > 0 && (
                <div className="vehicle-list">
                    {selectedVehicles.map(vehicle => (
                         <div key={vehicle.plate} className="vehicle-item">
                            <p>Placa: {vehicle.plate}</p>
                            <p>Tipo de vehículo: {vehicle.type === 'carro' ? 'Carro' : 'Moto'}</p>
                            <p>Marca: {vehicle.brand}</p>
                            <p>Modelo: {vehicle.model}</p>
                            <button onClick={() => handleRegister(vehicle)}>Registrar Ingreso</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EntryPage;