import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';


const AudioInput = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const inputFile = useRef(null);

  const handleSubmit = async () => {
    if (audioFile) {
    inputFile.current.value = "";
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio_file', audioFile);

    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/audio2summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSummary(response.data.summary);
      setAudioFile(null);
    } catch (error) {
      console.error('Error summarizing audio:', error);
        toast.error('File exceeds 25MB limit, try again');
    } finally {
      setIsLoading(false);
    }
} else {
    toast.error('No file selected');
}
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Audio</h2>
      <input
        type="file"
        accept="audio/*"
        ref={inputFile}
        onChange={(e) => setAudioFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        className="bg-blue-500 text-white bg-primary px-4 py-2 rounded"
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
            <h3 className="text-lg font-bold mb-2">Audio Summary</h3>
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

export default AudioInput;
