
import './App.css'
import { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";

function App() { 
  const [prompt, setPrompt] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const [placeholder, setPlaceholder] = useState(
  "Search for a lion with Paint Brushes painting the mona lisa painting..."
);
const configuration = new Configuration({
  apiKey:'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',
});

const openai = new OpenAIApi(configuration);
const generateImage = async () => {
  setPlaceholder(`Search ${prompt}..`);
  setLoading(true);

  try {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    setLoading(false);
    setResult(res.data.data[0].url);
  } catch (error) {
    setLoading(false);
    console.error(`Error generating image: ${error.response.data.error.message}`);
  }
};


  return (
    <>
   

<div className="container">
        { loading ? (
        <>
          <h3>Generating image... Please Wait...</h3>
        </>
        ) : (
        <>
          <h2>Generate an Image using Open AI API</h2>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="100"
          />

          <button onClick={generateImage}>Generate an Image</button>

          { result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <>
            </>
          )}
        </>
        )}
      </div>


    </>
  )
}

export default App
