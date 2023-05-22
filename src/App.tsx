import {useEffect, useState} from 'react'
import MessageBox from './MessageBox.tsx'
import './App.css'
import {ChatInput} from "./ChatInput.tsx";
import ButtonBar from "./ButtonBar.tsx";
import {onConfigChange} from "./config.ts";
import OwlbearTheme from "./OwlbearTheme.tsx";

function App() {
  return (
    <OwlbearTheme>
      <ButtonBar />
      <MessageBox />
      <ChatInput />
    </OwlbearTheme>
  )
}

export default App
