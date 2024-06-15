// src/components/UnifiedInput.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileAudio, faImage, faLink, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const UnifiedInput = ({ addSummary }) => {
  const [input, setInput] = useState(null);
  const [inputType, setInputType] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      determineFileType(file);
    }
  };

  const handleUrlChange = (e) => {
    setInput(e.target.value);
    setInputType('url');
  };

  const determineFileType = (file) => {
    const fileType = file.type;
    if (fileType.includes('pdf')) {
      setInputType('pdf');
    } else if (fileType.includes('audio')) {
      setInputType('audio');
    } else if (fileType.includes('image')) {
      setInputType('image');
    } else {
      setInputType('text');
    }
  };

  const handleSubmit = async () => {
    let endpoint = '';
    let data = null;
    const headers = {};

    switch (inputType) {
      case 'pdf':
        endpoint = '/pdf2summary';
        data = new FormData();
        data.append('pdf_file', input);
        headers['Content-Type'] = 'multipart/form-data';
        break;
      case 'audio':
        endpoint = '/audio2summary';
        data = new FormData();
        data.append('audio_file', input);
        headers['Content-Type'] = 'multipart/form-data';
        break;
      case 'image':
        endpoint = '/image2summary';
        data = new FormData();
        data.append('image_file', input);
        headers['Content-Type'] = 'multipart/form-data';
        break;
      case 'url':
        endpoint = '/youtube2summary';
        data = { youtube_link: input };
        headers['Content-Type'] = 'application/json';
        break;
      case 'text':
        endpoint = '/text2summary';
        data = { text: input };
        headers['Content-Type'] = 'application/json';
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(`https://summarizeanything.azurewebsites.net${endpoint}`, data, { headers });
      addSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing input:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Anything</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          </label>
          <label className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faFileAudio} className="text-blue-500" />
            <input type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
          </label>
          <label className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faImage} className="text-green-500" />
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <label className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faLink} className="text-yellow-500" />
            <input type="url" placeholder="Enter URL" className="hidden" onChange={handleUrlChange} />
          </label>
          <label className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
            <textarea
              placeholder="Enter text"
              className="hidden"
              onChange={(e) => {
                setInput(e.target.value);
                setInputType('text');
              }}
            />
          </label>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
          disabled={!input}
        >
          Summarize
        </button>
      </div>
    </div>
  );
};

export default UnifiedInput;
