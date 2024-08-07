import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userItem from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToGoogleGemini } from './api';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");

  const[messages, setMessages] = useState([
    {
      text: "I'm ChatGPT, an AI language model developed by OpenAI, built on the GPT-4 architecture. I'm here to help with a wide range of tasks, such as answering questions, providing explanations, generating text, and offering support with your studies, projects, and more." ,
      isBot: true,
  }
]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])

    const res = await sendMsgToGoogleGemini(text);
    setMessages([
      ...messages,
      {text: text, isBot: false},
      {text: res, isBot: true}
      ])
  }

  const handleEnter = async(e) =>{
    if(e.key === 'Enter') await handleSend();
  }
  const handleQuery = async (e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ])

    const res = await sendMsgToGoogleGemini(text);
    setMessages([
      ...messages,
      { text: text, isBot: false },
      { text: res, isBot: true }
    ])
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query" className="" />What is Programming?</button>
            <button className="query" onClick={handleQuery}  value={"How use an API?"}><img src={msgIcon} alt="Query" className="" />How to use an API?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listitemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listitemsImg" />Upgrade to Pro</div>
        </div>
      </div>

      <div className='main'>
        <div className="chats">
          {messages.map((message,i)=>
            <div key = {i} className= {message.isBot?"chat bot":"chat"}>
              <img className="chatimg" src={message.isBot?gptImgLogo:userItem} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref = {msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message' value={input}onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatGPT can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
