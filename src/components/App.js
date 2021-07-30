import React, { useState } from "react";
import UploadStats from "./UploadStats";
import UploadForm from "./UploadForm";
import "./App.css";

export default function App() {
  const [stats, setStats] = useState({
    location: "",
    name: "",
    type: ""
  });

  const reset = () => setStats({ location: "" });

  return (
    <>
      <h1>Upload an image file to your bucket!</h1>
      {stats.location ? (
        <UploadStats {...stats} onUploadAnother={reset} />
      ) : (
        <UploadForm onComplete={setStats} />
      )}
    </>
  );
}