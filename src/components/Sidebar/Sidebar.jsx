import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(true);
    const {
        conversations,
        setDisplayedResultData,
        setShowResult,
        setInput,
        setCurrentMessages,
        newChat
    } = useContext(Context);

    // const loadPrompt = async (prompt) => {
    //     recentPrompt(prompt);
    //     await setUserPrompt(prompt);
    // }

    return (
        <div className='sidebar'>
            <div className='top'>
                <img
                    onClick={() => setExtended(!extended)}
                    src={assets.menu_icon}
                    alt=""
                    className='menu'
                />
                <div onClick={() => newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {conversations && conversations.map((item, index) => (
                            <div
                                className='recent-entry'
                                key={index}
                                onClick={() => {
                                    setCurrentMessages(item.messages || []);
                                    setDisplayedResultData(item.messages && item.messages.length > 0 ? item.messages[item.messages.length - 1].text : "");
                                    setShowResult(true);
                                    setInput("");
                                }}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{item.messages && item.messages.length > 0 && item.messages[0].text ? (item.messages[0].text.length <= 12 ? item.messages[0].text : item.messages[0].text.substring(0, 12) + '...') : ''}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>History</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
