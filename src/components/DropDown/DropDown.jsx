import React, { useState, useRef} from 'react';

const Dropdown = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    
    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex w-full justify-between px-4 py-2 text-sm font-medium text-black bg-yellow border border-gray-300 rounded-md shadow-sm hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                {selectedOption || "Select an option"}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                        {options.length > 0 ? (
                            options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                                        selectedOption === option ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-700">No options available</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
