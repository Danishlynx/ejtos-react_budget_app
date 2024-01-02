import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });
    };

        return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost}</td>
            <td>
                <button 
                    onClick={() => increaseAllocation(props.name)} 
                    style={{
                        backgroundColor: '#4CAF50', // Green background
                        color: 'white', // White text
                        border: 'none',
                        padding: '5px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                    }}
                >
                    +
                </button>
            </td>
            <td>
                <button 
                    onClick={() => decreaseAllocation(props.name)} 
                    style={{
                        backgroundColor: '#f44336', // Red background
                        color: 'white', // White text
                        border: 'none',
                        padding: '5px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                    }}
                >
                    -
                </button>
            </td>
            <td>
                <TiDelete 
                    size='1.5em' 
                    onClick={handleDeleteExpense}
                    style={{ cursor: 'pointer' }}
                />
            </td>
        </tr>
    );

};

export default ExpenseItem;
