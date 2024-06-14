// src/components/ImageInput.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageInput = ({ addSummary }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/image2summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      addSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing image:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        className="bg-blue-500 text-white px-4 bg-primary py-2 rounded"
        onClick={handleSubmit}
      >
        Summarize
      </button>
    </div>
  );
};

export default ImageInput;
