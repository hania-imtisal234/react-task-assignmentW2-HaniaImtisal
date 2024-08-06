import React, { useState, useEffect } from 'react';
import { debounce } from '../../Util/Util';

const Input = ({ value, onChange, delay = 500 }) => {
    const [inputValue, setInputValue] = useState(value);

    const debouncedChange = debounce((newValue) => {
        onChange(newValue);
    }, delay);

    useEffect(() => {
        debouncedChange(inputValue);
    }, [inputValue]);

    return (
        <input
            type="text"
            placeholder="Search by character name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border rounded w-60"
        />
    );
};

export default Input;
