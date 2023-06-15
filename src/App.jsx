import axios from 'axios';
import React, { useState } from 'react'

function App() {
    const [prompt, setPrompt] = useState("");
    const [imageURL, setImage] = useState("");
  
    const createImg = async () => {
      const response = await axios.post("http://localhost:5500/Open/create", {
        prompt,
      }); 
      setImage(response.data);
    };
  
    const handleChange = (e) => { 
      setPrompt(e.target.value);
    }; 
  return (
    <div className="container-fluid">
      <div className="form">
        <h1>Create Your Art!</h1>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter your image description"
        />
        <button type="submit" className="btn btn-primary" onClick={createImg}>
          Submit
        </button>
        {imageURL && <img src={imageURL} alt="prompt" />}
      </div>
    </div>
  )
}

export default App