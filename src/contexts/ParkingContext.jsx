import React, { createContext, useState } from 'react';

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [carCells, setCarCells] = useState(Array(30).fill(null));
    const [motoCells, setMotoCells] = useState(Array(20).fill(null));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const isPlateRegistered = (plate) => {
        return employees.some(employee => employee.vehicles.some(vehicle => vehicle.plate === plate));
    };

    const registerVehicle = (document, vehicle) => {
        if (isPlateRegistered(vehicle.plate)) {
            alert('La placa ya está registrada.');
            return false;
        }
        setEmployees(prevEmployees => {
            const employeeIndex = prevEmployees.findIndex(emp => emp.document === document);
            if (employeeIndex !== -1) {
                const updatedEmployees = [...prevEmployees];
                updatedEmployees[employeeIndex].vehicles.push(vehicle);
                return updatedEmployees;
            } else {
                return [...prevEmployees, { document, vehicles: [vehicle] }];
            }
        });
        return true;
    };

    const isEntryRegistered = (plate) => {
        return carCells.some(cell => cell && cell.plate === plate) || motoCells.some(cell => cell && cell.plate === plate);
    };

    const registerEntry = (entryData) => {
        if (isEntryRegistered(entryData.plate)) {
            alert(`El vehículo con placa ${entryData.plate} ya tiene un ingreso registrado.`);
            return;
        }

        let updatedCells;
        if (entryData.type === 'carro') {
            const index = carCells.findIndex(cell => cell === null);
            if (index !== -1) {
                updatedCells = [...carCells];
                updatedCells[index] = { ...entryData, cellNumber: index + 1 };
                setCarCells(updatedCells);
            } else {
                alert('No hay celdas disponibles para carros.');
            }
        } else {
            const index = motoCells.findIndex(cell => cell === null);
            if (index !== -1) {
                updatedCells = [...motoCells];
                updatedCells[index] = { ...entryData, cellNumber: index + 1 };
                setMotoCells(updatedCells);
            } else {
                alert('No hay celdas disponibles para motos.');
            }
        }
    };

    return (
        <ParkingContext.Provider value={{ 
            employees, carCells, motoCells, registerVehicle, registerEntry, isAuthenticated, login, logout 
        }}>
            {children}
        </ParkingContext.Provider>
    );
};

export default ParkingContext;