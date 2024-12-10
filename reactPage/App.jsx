import React from 'react'; // Import React
import { useState } from 'react';
import axios from 'axios';

const url = "http://localhost:8000/uploads";

function App() {
  const [postImage, setPostImage] = useState({ myFile: "" });

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postImage.myFile) {
      alert("Please upload an image before submitting!");
      return;
    }
    createPost(postImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Image Upload App</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <label htmlFor="file-upload" style={{ display: "block", marginBottom: "10px" }}>
          {postImage.myFile ? (
            <img
              src={postImage.myFile}
              alt="Uploaded Preview"
              style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px" }}
            />
          ) : (
            <span style={{ fontSize: "14px", color: "gray" }}>Click to upload an image</span>
          )}
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
          style={{ display: "block", margin: "10px auto" }}
        />

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}