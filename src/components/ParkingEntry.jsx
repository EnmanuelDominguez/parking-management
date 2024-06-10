import React, { useState, useContext } from 'react';
import ParkingContext from '../contexts/ParkingContext';
import '../styles/EntryPage.css';

const ParkingEntry = () => {
    const { employees, carCells, motoCells, registerEntry } = useContext(ParkingContext);
    const [input, setInput] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleSearch = () => {
        const employee = employees.find(emp => emp.document === input);
        if (employee) {
            setSelectedVehicle(employee.vehicles.map(vehicle => ({ ...vehicle, document: employee.document })));
        } else {
            const allVehicles = employees.flatMap(emp => emp.vehicles.map(vehicle => ({ ...vehicle, document: emp.document })));
            const vehicle = allVehicles.find(v => v.plate === input);
            if (vehicle) {
                setSelectedVehicle([vehicle]);
            } else {
                alert('No se encontró el vehículo o documento.');
                setSelectedVehicle(null);
            }
        }
    };

    const handleRegister = (vehicle) => {
        const allCells = [...carCells, ...motoCells];
        const isAlreadyRegistered = allCells.some(cell => cell && cell.plate === vehicle.plate);

        if (isAlreadyRegistered) {
            alert(`El vehículo con placa ${vehicle.plate} ya tiene un ingreso registrado.`);
            return;
        }

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
            <h2>Registrar Ingreso</h2>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ingrese cédula o placa"
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            {selectedVehicle && (
                <div>
                    {selectedVehicle.map(vehicle => (
                        <div key={vehicle.plate} className="vehicle-info">
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

export default ParkingEntry;