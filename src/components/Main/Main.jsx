import { assets } from '../../assets/assets';
import './Main.css';
import { useContext } from 'react';
import { runGemini } from '../../config/gemini';
import { Context } from '../../context/Context';

const Main = () => {
    const {
        showResult,
        setShowResult,
        loading,
        setLoading,
        displayedResultData,
        setDisplayedResultData,
        setConversations,
        currentMessages,
        setCurrentMessages,
        input,
        setInput,
        isNewChat,
        setIsNewChat
    } = useContext(Context);

    const handleSendClick = async () => {
        if (!input.trim()) return;

        setCurrentMessages(prev => [...prev, {type: 'user', text: input}, {type: 'ai', text: ''}]);
        setShowResult(true);
        setLoading(true);

        const response = await runGemini(input);

        if (response) {
            setCurrentMessages(prev => prev.map((msg, i) => i === prev.length - 1 ? { ...msg, text: response } : msg));
            setLoading(false);
            animateTyping(response);

            if (isNewChat) {
                // simpan history max 10
                setConversations(prev => [
                    { messages: [...currentMessages, {type: 'ai', text: response}] },
                    ...prev.slice(0, 9)
                ]);
                setIsNewChat(false);
            }
        } else {
            setLoading(false);
        }

        setInput('');
    };

    const animateTyping = (text) => {
        setDisplayedResultData('');
        const words = text.split(' ');
        const delay = 5;
        words.forEach((word, index) => {
            setTimeout(() => {
                setDisplayedResultData(prev => prev + word + ' ');
            }, index * delay);
        });
        setTimeout(() => setLoading(false), words.length * delay + 500);
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini KenzyAI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest a beautiful place to visit</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest a feature for Gemini</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Write me a blog post</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Make me a website</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        {currentMessages.map((message, index) => (
                            message.type === 'user' ? (
                                <div key={index} className="result-title">
                                    <img src={assets.user_icon} alt="" />
                                    <p>{message.text}</p>
                                </div>
                            ) : (
                                <div key={index} className="result-data">
                                    <img src={assets.gemini_icon} alt="" />
                                    {loading && index === currentMessages.length - 1 ? (
                                        <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: index === currentMessages.length - 1 ? displayedResultData : message.text }}></p>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder='Enter your prompt'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !loading && handleSendClick()}
                            disabled={loading}
                        />
                        <div onClick={() => !loading && handleSendClick()} style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Try typing "Write me a poem about the sea"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
