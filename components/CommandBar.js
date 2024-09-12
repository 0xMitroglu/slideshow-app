import { useState } from "react";
import styles from "../styles/CommandBar.module.css";

export default function CommandBar({ setMode, setTheme }) {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleCommand = (command) => {
    if (command.includes("manual")) setMode("manual");
    if (command.includes("auto")) setMode("auto");
    if (command.includes("random")) setMode("random");
    if (command.includes("theme")) {
      const theme = command.split("theme ")[1].toUpperCase();
      setTheme(theme);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
      setIsVisible(false);
    }
    if (e.key === "Escape") {
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div className={styles.commandBar}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a command..."
          />
        </div>
      )}
      <button onClick={() => setIsVisible(!isVisible)}>Command Bar</button>
    </>
  );
}
