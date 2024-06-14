import { useState } from 'react';
import axios from 'axios';

const TextInput = ({ addSummary }) => {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/text2summary', { text: text });
      addSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Text</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
      />
      <button
        className="mt-4 bg-blue-500 text-white  bg-primary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Summarize
      </button>
    </div>
  );
};

export default TextInput;
