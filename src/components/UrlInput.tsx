// src/components/UrlInput.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UrlInput = ({ addSummary }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/youtube2summary', { youtube_link: url });
      addSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing URL:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize YouTube Video</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL..."
      />
      <button
        className="mt-4 bg-blue-500 text-white bg-primary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Summarize
      </button>
    </div>
  );
};

export default UrlInput;
