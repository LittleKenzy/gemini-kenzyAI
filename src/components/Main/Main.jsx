import { assets } from '../../assets/assets'
import './Main.css'
import { useContext, useState } from 'react'
import { runGemini } from '../../config/gemini'
import { Context } from '../../context/Context'

const Main = () => {
    const {showResult, setShowResult, loading, setLoading, resultData, setResultData} = useContext(Context);

    const [input, setInput] = useState('')

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSendClick = async () => {
        if (!input.trim()) return
        setLoading(true)
        const response = await runGemini(input)
        if (response) {
            setResultData(response)
            setShowResult(true)
        }
        setLoading(false)
        setInput('')
    }

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
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{input}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder='Enter your prompt'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div onClick={handleSendClick} style={{ cursor: 'pointer' }}>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" onClick={handleSendClick}/>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Try typing "Write me a poem about the sea"
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
