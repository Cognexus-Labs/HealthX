import React, { useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Header from '../../components/Header';
import micIcon from './mic.svg';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';


const Summary: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    speechRecognitionProperties: { interimResults: true },
    useLegacyResults: false
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  // Cleanup function to stop recording and release media resources

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="mb-6 flex flex-row gap-0 lg:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="Audio Transcription Summary" />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl mb-3'>Recording: {isRecording.toString()}</h1>
                <button onClick={isRecording ? stopSpeechToText : startSpeechToText}
                 className="ml-2 mr-2 inline-flex lg:mr-5 items-center justify-center rounded-full bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                  <img data-recording={isRecording} src={micIcon} alt=""/>                
                </button>
                <ul>
                  {results.map((result) => (
                    <li key={result.timestamp}>{result.transcript}</li>
                  ))}
                  {interimResult && <li>{interimResult}</li>}
                </ul>
              </div>
              

              </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Summary;
