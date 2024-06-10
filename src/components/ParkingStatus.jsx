import React, { useContext } from 'react';
import ParkingContext from '../contexts/ParkingContext';
import '../styles/ParkingStatus.css';

const ParkingStatus = () => {
    const { carCells, motoCells } = useContext(ParkingContext);

    const renderCells = (cells, type) => (
        <div className="parking-grid">
            {cells.map((cell, index) => (
                <div key={index} className={`cell ${cell ? 'occupied' : ''}`}>
                    {cell ? (
                        <>
                            <p className="cell-text">{cell.plate}</p>
                            <p className="cell-text">Fecha y Hora de Ingreso: {cell.entryTime}</p>
                            <p className="cell-text">Número de Celda: {cell.cellNumber}</p>
                        </>
                    ) : (
                        <p className="cell-text">{type.charAt(0)}</p>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="parking-status">
            <h2>Estado del Parqueadero</h2>
            <div>
                <h3>Celdas de Carros</h3>
                {renderCells(carCells, 'Car')}
            </div>
            <div>
                <h3>Celdas de Motos</h3>
                {renderCells(motoCells, 'Moto')}
            </div>
        </div>
    );
};

export default ParkingStatus;