import React, { createContext, useContext, useState, useEffect } from 'react';

const IDContext = createContext(null);

const generateUniqueID = () => {
    return `id-${Math.random().toString(36).slice(2, 9)}`;
};

export const IDProvider = ({ children }) => {
    const [uniqueID, setUniqueID] = useState(null);

    useEffect(() => {
        let storedID = localStorage.getItem('clientUniqueID');

        if (!storedID) {
            storedID = generateUniqueID();
            localStorage.setItem('clientUniqueID', storedID);
        }

        setUniqueID(storedID);
    }, []);

    return <IDContext.Provider value={uniqueID}>{children}</IDContext.Provider>;
};

export const useClientID = () => {
    return useContext(IDContext);
};


