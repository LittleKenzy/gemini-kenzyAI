import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [user, setUser] = useState(null); // contoh state global

    const contextValue = {
        user,
        setUser,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
