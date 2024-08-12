import React from 'react';
import { getColor } from '../../Util/Util';

const Card = ({ name, imageUrl, onClick , skinColor}) => {
    const backgroundColor = getColor(skinColor);
    console.log('Background Color:', skinColor);
    console.log('Image URL:', imageUrl);
    return (
        <div className="cursor-pointer p-4 transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg" onClick={onClick}>
        <div className=" p-6 rounded-lg text-center" style={{ backgroundColor }}>
            <img src={imageUrl} alt={name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <h2 className="text-white text-xl font-semibold">{name}</h2>
        </div>
    </div>
    
    );
};


export default Card;
