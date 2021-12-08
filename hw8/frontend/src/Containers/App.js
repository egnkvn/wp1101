// import './App.css'
import { Button, Input, Tag, message } from 'antd'
import { useState, useEffect, useRef } from 'react'
import useChat from '../Hooks/useChat'
import Title from '../Components/Title';
import Message from '../Components/Message';
import styled from 'styled-components';
import Chatroom from './Chatroom';
import SignIn from './SignIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const [me, setMe] = useState(savedMe || "")
  const [signedIn, setSignedIn] = useState(false);
  const bodyRef = useRef(null);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }
  useEffect(() => { displayStatus(status) }, [status])
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);
  return (
    <Wrapper>{signedIn ?
      (<Chatroom
        me={me}
        messages={messages}
        sendMessage={sendMessage}
        clearMessages={clearMessages}
        username={username}
        setUsername={setUsername}
        body={body}
        setBody={setBody}
        bodyRef={bodyRef}
        displayStatus={displayStatus}
      />)
      : (<SignIn
        me={me}
        setMe={setMe}
        setSignedIn={setSignedIn}
        displayStatus={displayStatus}
      />)}
    </Wrapper>
  )
}

export default App
