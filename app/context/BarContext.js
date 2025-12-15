import { createContext, useState, useMemo } from 'react';

export const BarContext = createContext('');

export const BarProvider = ({ children }) => {
    const [barsArray, setBarsArray] = useState({})
    const [selectedBarID, setSelectedBarID] = useState('');

    // Find the selected bar object based on the selectedBarID
    const selectedBarObj = useMemo(() => {
        return barsArray[selectedBarID] || {}; // Return the bar object or an empty object if not found
    }, [barsArray, selectedBarID]);

    const setSelectedBar = (barID) => {
        setSelectedBarID(barID); // Set the selected bar ID to trigger the memoized lookup
    };
    return (
        <BarContext.Provider
            value={{
                barsArray,
                setBarsArray,
                selectedBar: selectedBarObj, 
                setSelectedBar
            }}>
            { children }
        </BarContext.Provider>
    )
}
