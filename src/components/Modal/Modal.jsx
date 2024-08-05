import React from 'react';

const Modal = ({ character, onClose }) => {
    if (!character) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
                <p><strong>Height:</strong> {character.height} meters</p>
                <p><strong>Mass:</strong> {character.mass} kg</p>
                <p><strong>Date Added:</strong> {character.created}</p>
                <p><strong>Number of Films:</strong> {character.films}</p>
                <p><strong>Birth Year:</strong> {character.birth_year}</p>
                <h3 className="text-xl font-bold mt-4">Home World</h3>
                <p><strong>Name:</strong> {character.homeWorldName}</p>
                <p><strong>Terrain:</strong> {character.terrain}</p>
                <p><strong>Climate:</strong> {character.climate}</p>
                <p><strong>Number of Residents:</strong> {character.residents}</p>
            </div>
        </div>
    );
};

export default Modal;
