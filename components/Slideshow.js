import { useState, useEffect } from "react";
import styles from "../styles/Slideshow.module.css";
import ThemeA from "../styles/ThemeA.module.css";
import ThemeB from "../styles/ThemeB.module.css";
import ThemeC from "../styles/ThemeC.module.css";
import ThemeD from "../styles/ThemeD.module.css";
import ThemeE from "../styles/ThemeE.module.css";
import ThemeF from "../styles/ThemeF.module.css";
import ConfigPanel from "./ConfigPanel";

export default function Slideshow() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState("manual"); // auto, random
  const [theme, setTheme] = useState("A");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const themeStyles = {
    A: ThemeA,
    B: ThemeB,
    C: ThemeC,
    D: ThemeD,
    E: ThemeE,
    F: ThemeF,
  };

  // Handle auto-playing and random modes
  useEffect(() => {
    if (mode === "auto") {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 3000);
      return () => clearInterval(interval);
    } else if (mode === "random") {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * photos.length);
        setCurrentIndex(randomIndex);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [mode, photos]);

  // Handle manual navigation via keyboard
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (mode === "manual") {
        if (e.key === "ArrowRight") {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        } else if (e.key === "ArrowLeft") {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [mode, photos]);

  // Full-screen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Drag and drop photo handling
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    loadPhotos(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const loadPhotos = (files) => {
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    const photoData = fileArray.map((file) => {
      const caption = file.name
        .replace(/[-_]/g, " ")
        .replace(/\.\w+$/, "")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { file, caption };
    });
    setPhotos(photoData);
  };

  const displayPhoto = () => {
    if (photos.length === 0) return null;
    const photo = photos[currentIndex];
    const imgURL = URL.createObjectURL(photo.file);

    return (
      <div
        className={`${styles.slideshow} ${themeStyles[theme].photo}`}
        onClick={toggleFullscreen}>
        <img src={imgURL} alt={photo.caption} />
        <div className={themeStyles[theme].caption}>{photo.caption}</div>
      </div>
    );
  };

  return (
    <div
      className={styles.slideshowContainer}
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <ConfigPanel setMode={setMode} setTheme={setTheme} />
      {displayPhoto()}
      <input
        type="file"
        multiple
        onChange={(e) => loadPhotos(e.target.files)}
      />
    </div>
  );
}
