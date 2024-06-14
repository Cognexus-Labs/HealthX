// import React, { useState } from 'react';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import Header from '../../components/Header';
// import micIcon from './mic.svg';
// import Sidebar from '../../components/Sidebar';
// import Breadcrumb from '../../components/Breadcrumb';
// import 'react-toastify/dist/ReactToastify.css';
// import '../signin.css';

// const Summary: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     crossBrowser: true,
//     googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//     speechRecognitionProperties: { interimResults: true },
//     useLegacyResults: false,
//   });

//   console.log(results, interimResult, isRecording, error);

//   if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

//   // Function to convert epoch time to human-readable format
//   const convertTimestamp = (timestamp) => {
//     const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
//     return date.toLocaleString(); // Change this to your preferred date format
//   };

//   return (
//     <div className="dark:bg-boxdark-2 dark:text-bodydark">
//       <div className="flex h-screen overflow-hidden">
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           <main>
//             <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
//               <div className="mb-6 flex flex-row gap-0 lg:gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <Breadcrumb pageName="Audio Transcription Summary" />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {results.map((result) => (
//                   <div key={result.timestamp} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//                     <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
//                       <span className="text-gray-500 text-sm">{convertTimestamp(result.timestamp)}</span>
//                       <FontAwesomeIcon icon={faEdit} className="text-gray-500 cursor-pointer" />
//                     </div>
//                     <div className="text-gray-800 dark:text-gray-200">{result.transcript}</div>
//                   </div>
//                 ))}
//                 {interimResult && (
//                   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//                     <div className="text-gray-800 dark:text-gray-200">{interimResult}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       <div className="fixed bottom-4 right-4">
//         <button
//           onClick={isRecording ? stopSpeechToText : startSpeechToText}
//           className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-6 text-white hover:bg-opacity-90"
//         >
//           <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
//           <img data-recording={isRecording} src={micIcon} alt="" className="ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Summary;


import React, { useState, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import micIcon from './mic.svg';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';

const Summary: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedResults, setCompletedResults] = useState([]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    speechRecognitionProperties: { interimResults: true },
    useLegacyResults: false,
  });

  useEffect(() => {
    if(!isRecording) {
      setResults([])
    }
  }, [isRecording])

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  // Function to convert epoch time to human-readable format
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Change this to your preferred date format
  };

  // Function to handle stop recording
  const handleStopRecording = () => {
    stopSpeechToText();

    if (results.length > 0) {
      const startTime = results[0].timestamp;
      const combinedTranscript = results.map(result => result.transcript).join(' ');

      // Add the new completed result
      setCompletedResults([
        ...completedResults,
        { timestamp: startTime, transcript: combinedTranscript }
      ]);
    }
  };

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedResults.map((result, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                      <span className="text-gray-500 text-sm">{convertTimestamp(result.timestamp)}</span>
                      <FontAwesomeIcon icon={faEdit} className="text-gray-500 cursor-pointer" />
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">{result.transcript}</div>
                  </div>
                ))}
                {interimResult && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <div className="text-gray-800 dark:text-gray-200">{interimResult}</div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={isRecording ? handleStopRecording : startSpeechToText}
          className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-6 text-white hover:bg-opacity-90"
        >
          <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
          <img data-recording={isRecording} src={micIcon} alt="" className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Summary;
