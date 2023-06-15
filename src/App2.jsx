import React from 'react'
import { useState } from 'react';

function App() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5500/Open/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
  
        const data = await response.json();
        setImageUrl(data.choices[0].data.url);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="App">
    <h1>OpenAI Image Generator</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a description"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit">Generate Image</button>
    </form>
    {imageUrl && <img src={imageUrl} alt="Generated" />}
  </div>
  )
}

export default App