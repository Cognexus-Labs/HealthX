// src/components/AudioInput.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AudioInput = ({ addSummary }) => {
  const [audioFile, setAudioFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('audio_file', audioFile);

    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/audio2summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      addSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing audio:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Audio</h2>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudioFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        className="bg-blue-500 text-white bg-primary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Summarize
      </button>
    </div>
  );
};

export default AudioInput;
