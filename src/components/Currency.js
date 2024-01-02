import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext'; // Ensure this path is correct

const Currency = () => {
    const { dispatch } = useContext(AppContext);
    const dropdownRef = useRef(null);
    const [selectedCurrency, setSelectedCurrency] = useState('pound');

    const currencySymbols = {
        dollar: '$',
        pound: '£',
        euro: '€',
        rupee: '₹',
    };

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        dispatch({ type: 'CHG_CURRENCY', payload: currencySymbols[currency] });
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const dropdownItemStyle = {
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: '#8dd7bf',
        borderBottom: '1px solid white'
    };

    return (
        <div ref={dropdownRef} style={{
            backgroundColor: '#8dd7bf',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '3px',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
        }}
        onClick={toggleDropdown}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#333',
            }}>
                <div>Currency: {currencySymbols[selectedCurrency]} ({selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)})</div>
                <div style={{ fontSize: '18px' }}>{showDropdown ? '▲' : '▼'}</div>
            </div>
            {showDropdown && (
                <div style={{
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: '100%',
                    zIndex: 1000,
                }}>
                    {Object.entries(currencySymbols).map(([currency, symbol]) => (
                        <div key={currency} style={dropdownItemStyle} 
                            onClick={() => handleCurrencyChange(currency)}>
                            {symbol} {currency.charAt(0).toUpperCase() + currency.slice(1)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Currency;
