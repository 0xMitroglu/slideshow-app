"use client";

import Slideshow from "../components/Slideshow";
import CommandBar from "../components/CommandBar";
import ConfigPanel from "../components/ConfigPanel";

export default function Home() {
  return (
    <div>
      <h1>Photo Slideshow Tool</h1>
      <Slideshow />
      <ConfigPanel />
      <CommandBar />
    </div>
  );
}
