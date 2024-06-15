import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ImageInput = () => {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const inputFile = useRef(null);

  const handleSubmit = async () => {
    if (imageFile) {
    inputFile.current.value = "";
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image_file', imageFile);

    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/image2summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSummary(response.data.summary);
        setImageFile(null);
    } catch (error) {
      console.error('Error summarizing image:', error);
        toast.error('No file selected or File exceeds 25MB limit');
    } finally {
        setIsLoading(false);
      }
    } else {
        toast.error('No file selected')
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summarize Image</h2>
      <input
        type="file"
        accept="image/*"
        ref={inputFile}
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        className="bg-blue-500 text-white px-4 bg-primary py-2 rounded"
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
            <h3 className="text-lg font-bold mb-2">Image Description</h3>
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

export default ImageInput;
