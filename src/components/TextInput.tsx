import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';


const TextInput = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSubmit = async () => {
    if (text) {
      setIsLoading(true);
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/text2summary', { text: text });
      setSummary(response.data.summary);
      setText('');
    } catch (error) {
      console.error('Error summarizing text:', error);
        toast.error('No text entered');
    } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('No text entered');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Text</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
      />
      <button
        className="mt-4 bg-blue-500 text-white  bg-primary px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        {isLoading ? (
            <div className="flex items-center">
                <div className="spinner"></div>
                <span className="pl-1">Summarizing...</span>
            </div>
            ) : (
            <>Summarize</>
            )}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
            <div className='w-full flex flex-row justify-between'>
            <h3 className="text-lg font-bold mb-2">Text Summary</h3>
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

export default TextInput;
