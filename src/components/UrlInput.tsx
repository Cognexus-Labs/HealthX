import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSubmit = async () => {
    if (!url) {
      toast.error('No URL entered');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/youtube2summary', { youtube_link: url });
      setSummary(response.data.summary);
      setUrl('');
    } catch (error) {
      console.error('Error summarizing URL:', error);
        toast.error('Invalid URL, try again');
    } finally {
        setIsLoading(false);
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
        disabled={isLoading}
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
            <h3 className="text-lg font-bold mb-2">Youtube Summary</h3>
            <button
                className="bg-primary text-white px-4 py-1 rounded"
                onClick={() => setSummary('')}
            >
                Clear
            </button>
            </div>
            <p>{summary}</p>
        </div>
        )}
    </div>
  );
};

export default UrlInput;
