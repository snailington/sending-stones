import {useEffect, useState} from 'react'
import MessageBox from './MessageBox.tsx'
import {ChatInput} from "./ChatInput.tsx";
import ButtonBar from "./ButtonBar.tsx";
import {onConfigChange} from "./config.ts";
import OwlbearTheme from "./OwlbearTheme.tsx";
import OBR from "@owlbear-rodeo/sdk";
import './App.css'
import OptionsMenu from "./options/OptionsMenu.tsx";

function App() {
  const [view, setView] = useState("");

  function toggleView(toggle: string) {
    setView(view == toggle ? "" : toggle);
  }

  useEffect(() => onConfigChange("windowSize", (size) => {
    OBR.action.setHeight(size == "small" ? 225 : 10000);
  }), []);

  useEffect(() => onConfigChange("windowWidth", (size) => {
    let width;
    switch(size) {
      case "small": width = 180; break;
      case "large": width = 450; break;
      default: width = 300;
    }
    OBR.action.setWidth(width);
  }), []);

  return (
    <OwlbearTheme className="app-container">
      <ButtonBar toggleView={toggleView} />
      <div className="view-container">
        <MessageBox />
        <ChatInput />
        <OptionsMenu active={view == "options"}/>
      </div>
    </OwlbearTheme>
  )
}

export default App
