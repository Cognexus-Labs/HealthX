// src/components/EhrInput.jsx
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

const EhrInput = () => {
  const [oldEhr, setOldEhr] = useState('');
  const [currentConversation, setCurrentConversation] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const inputFile = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/text2ehr', {
        old_ehr: oldEhr,
        current_conversation: currentConversation,
        system_prompt: systemPrompt,
        filename,
      });
      console.log(response.data.ehr_record)
      setSummary(response.data.ehr_record);
    } catch (error) {
      console.error('Error converting text to EHR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate EHR</h2>
      <textarea
        value={oldEhr}
        onChange={(e) => setOldEhr(e.target.value)}
        rows="2"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Previous EHR content..."
      />
      <textarea
        value={currentConversation}
        onChange={(e) => setCurrentConversation(e.target.value)}
        rows="2"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Current conversation text..."
      />
      <textarea
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        rows="2"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Optional system prompt..."
      />
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Optional filename (e.g., patient.md)"
      />
      <button
        className="bg-blue-500 text-white bg-primary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        {isLoading ? (
            <div className="flex items-center">
                <div className="spinner"></div>
                <span className="pl-1">Generating...</span>
            </div>
            ) : (
            <>Generate EHR</>
            )}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
            <div className='w-full flex flex-row justify-between'>
            <h3 className="text-lg font-bold mb-2">EHR</h3>
            <button
                className="bg-primary text-white px-4 py-1 rounded"
                onClick={() => setSummary('')}
            >
                Clear
            </button>
            </div>
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
        )}

    </div>
  );
};

export default EhrInput;
