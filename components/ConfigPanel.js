import React from "react";
import styles from "../styles/ConfigPanel.module.css";

const ConfigPanel = ({ setMode, setTheme }) => {
  if (!setMode || !setTheme) {
    console.error("setMode or setTheme is not passed as a prop.");
    return null;
  }

  return (
    <div className={styles.configPanel}>
      <div>
        <label htmlFor="mode">Mode:</label>
        <select id="mode" onChange={(e) => setMode(e.target.value)}>
          <option value="manual">Manual</option>
          <option value="auto">Auto-playing</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" onChange={(e) => setTheme(e.target.value)}>
          <option value="A">Theme A</option>
          <option value="B">Theme B</option>
          <option value="C">Theme C</option>
          <option value="D">Theme D</option>
          <option value="E">Theme E</option>
          <option value="F">Theme F</option>
        </select>
      </div>
    </div>
  );
};

export default ConfigPanel;
