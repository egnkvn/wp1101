// import './App.css'
import { Button, Input, Tag, message } from 'antd'
import { useState, useEffect, useRef } from 'react'
import useChat from '../Hooks/useChat'
import Title from '../Components/Title';
import Message from '../Components/Message';
import styled from 'styled-components';

const Chatroom = ({ me, messages, sendMessage, clearMessages, username, setUsername, body, setBody, bodyRef, displayStatus }) => {
    return (
        <>
            <Title>
                <h1>{me}'s Chatroom</h1>
                <Button type="primary" danger onClick={clearMessages}>
                    Clear
                </Button>
            </Title>
            <Message>
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}> No messages... </p>
                ) : (
                    messages.map(({ name, body }, i) => (
                        <p className="App-message" key={i}>
                            <Tag color="blue">{name}</Tag> {body}
                        </p>
                    ))
                )}
            </Message>
            {/* <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        bodyRef.current.focus()
                    }
                }}
                style={{ marginBottom: 10 }}
            ></Input> */}
            <Input.Search
                enterButton="Send"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ref={bodyRef}
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                        return
                    }
                    sendMessage({ name: me, body: msg })
                    setBody('')
                }}
            ></Input.Search>
        </>
    )
}

export default Chatroom;
