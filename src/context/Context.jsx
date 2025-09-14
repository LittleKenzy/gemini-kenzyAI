import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]); // history {prompt, response}
    const [activeIndex, setActiveIndex] = useState(null);   // percakapan aktif
    const [currentMessages, setCurrentMessages] = useState([]);
    const [displayedResultData, setDisplayedResultData] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isNewChat, setIsNewChat] = useState(true);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setDisplayedResultData((prev) => prev + nextWord);
        }, 5*index);
    };

    const newChat = () => {
        setInput("");
        setDisplayedResultData("");
        setShowResult(false);
        setLoading(false);
        setIsNewChat(true);
        setCurrentMessages([]);
    }

    const addConversation = (prompt, response) => {
        const newConv = { prompt, response };
        setConversations([newConv, ...conversations]);
        setActiveIndex(0); // otomatis buka yg terbaru
    };

    const [user, setUser] = useState(null);

    const contextValue = {
        user,
        setUser,
        input,
        setInput,
        loading,
        setLoading,
        conversations,
        setConversations,
        activeIndex,
        setActiveIndex,
        currentMessages,
        setCurrentMessages,
        displayedResultData,
        setDisplayedResultData,
        showResult,
        setShowResult,
        delayPara,
        addConversation,
        newChat,
        isNewChat,
        setIsNewChat
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
