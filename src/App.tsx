import {useEffect, useState} from 'react'
import MessageBox from './MessageBox.tsx'
import {ChatInput} from "./ChatInput.tsx";
import ButtonBar from "./ButtonBar.tsx";
import {onConfigChange} from "./config.ts";
import OwlbearTheme from "./OwlbearTheme.tsx";
import OBR from "@owlbear-rodeo/sdk";
import './App.css'

function App() {
  const [view, setView] = useState("");

  function toggleView(toggle: string) {
    if(view == toggle) setView("");
    else setView("toggle");
  }

  useEffect(() => onConfigChange("windowSize", (size) => {
    OBR.action.setHeight(size == "small" ? 225 : 10000);
  }), []);

  return (
    <OwlbearTheme className="app-container">
      <ButtonBar toggleView={toggleView} />
      <MessageBox />
      <ChatInput />
      <OptionsMenu active={view == "options"}/>
    </OwlbearTheme>
  )
}

export default App
