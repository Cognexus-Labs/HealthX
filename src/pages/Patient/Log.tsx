import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import micIcon from './mic.svg';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';

const Summary: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedResults, setCompletedResults] = useState([]);
  const [currentSummary, setCurrentSummary] = useState<{ id: string; body: string }>({ id: "", body: "" });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [popupOpenMap, setPopupOpenMap] = useState<{ [key: string]: boolean }>({});
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [filename, setFilename] = useState('patient.md');
  const [isLoading, setIsLoading] = useState(false);
  const [ehrLoading, setEhrLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [ehr, setEhr] = useState('');

  const popup = useRef<HTMLDivElement | null>(null); 

  const createSummary = useMutation(api.summary.createSummary);
  const summaries = useQuery(api.summary.getSummaries, {});
  const updateSummary = useMutation(api.summary.updateSummary);
  const deleteSummary = useMutation(api.summary.deleteSummary);

  const {
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
    if (!isRecording) {
      setResults([]);
    }
  }, [isRecording]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCurrentSummary((prevSummary) => ({
      ...prevSummary,
      body: value,
    }));
  };

  const showDeleteConfirmation = (userId: any) => {
    setUserToDeleteId(userId);
    setDeleteConfirmationVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setUserToDeleteId(null);
    setDeleteConfirmationVisible(false);
  };

  const togglePopup = (summaryId: string, body: string) => {
    setCurrentSummary({ id: summaryId, body });
    setPopupOpenMap((prevMap) => ({
      ...prevMap,
      [summaryId]: !prevMap[summaryId],
    }));
  };

  const closePopup = (summaryId: string) => {
    setPopupOpenMap((prevMap) => ({
      ...prevMap,
      [summaryId]: false,
    }));
  };

  const updateSummaryDetails = async (recordId: string, data: { body: string }) => {
    setUpdateLoading(true);
    try {
      await updateSummary({ id: recordId, ...data });
      toast.success('Successfully updated your record', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
      closePopup(recordId); // Close the popup after updating
    } catch (error) {
      console.error('Error in updating record:', error);
      toast.error('Error in updating record:', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteSummaryDetails = async (userId: any) => {
    try {
      await deleteSummary({ id: userId});
      toast.success('Successfully deleted record', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
      hideDeleteConfirmation();
    } catch (error) {
      console.error('Error in deleteSummaryDetails:', error);
      toast.error('Error in deleteSummaryDetails:', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
      });
    }
  };

  // Function to convert epoch time to human-readable format
  const convertTimestamp = (date: any) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  // Function to handle stop recording
  const handleStopRecording = async () => {
    stopSpeechToText();

    if (results.length > 0) {
      const startTime = results[0].timestamp;
      const combinedTranscript = results.map(result => result.transcript).join(' ');

      // Add the new completed result
      setCompletedResults([
        ...completedResults,
        { timestamp: startTime, transcript: combinedTranscript }
      ]);

      // Create a new summary
      await createSummary({ body: combinedTranscript });
    }
  };

  const generateSummary = async () => {
    setIsLoading(true);
    try {
      // Combine all summaries for the day
      const allSummaries = summaries?.map(summary => summary.body).join(' ');
      console.log(allSummaries)
      const response = await axios.post('https://summarizeanything.azurewebsites.net/text2summary', { text: allSummaries });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
      toast.error('Error summarizing text');
    } finally {
      setIsLoading(false);
    }
  };

  const generateEhr = async () => {
    setEhrLoading(true);
    generateSummary();
    try {
      const response = await axios.post('https://summarizeanything.azurewebsites.net/text2ehr', {
        // old_ehr: oldEhr,
        current_conversation: summary,
        // system_prompt: systemPrompt,
        filename: filename,
      });
      setEhr(response.data.ehr_record);
    } catch (error) {
      console.error('Error converting text to EHR:', error);
    } finally {
      setEhrLoading(false);
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
                <Breadcrumb pageName="Health Consultation Logs" />
                <button
                  onClick={generateSummary}
                  className="bg-primary text-white hover:bg-primary/80 py-2 px-4 rounded-3xl"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating Summary...' : 'Generate Summary'}
                </button>
                <button
                  onClick={generateEhr}
                  className="bg-primary text-white hover:bg-primary/80 py-2 px-4 rounded-3xl"
                  disabled={ehrLoading}
                >
                  {ehrLoading ? 'Generating EHR...' : 'Generate EHR'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {summaries?.map((summary, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                      <span className="text-gray-500 text-sm">{convertTimestamp(summary._creationTime)}</span>
                      <FontAwesomeIcon 
                        onClick={() => togglePopup(summary._id, summary.body)} 
                        icon={faEdit} 
                        className="text-gray-500 cursor-pointer" 
                      />
                      {popupOpenMap[summary._id] && (
                        <div
                          ref={popup}
                          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                        >
                          <div
                            className="bg-white lg:mt-15 lg:w-1/2 rounded-lg pt-3 px-4 shadow-md"
                            style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}
                          >              
                            <div className="flex flex-row justify-between">
                              <h2 className="text-xl font-semibold mb-4">Edit Summary</h2>
                              <div className="flex justify-end">
                                <button
                                  onClick={() => closePopup(summary._id)}
                                  className="text-blue-500 hover:text-gray-700 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 fill-current bg-primary rounded-full p-1 hover:bg-opacity-90"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <form>
                              <div className="rounded-sm px-6.5 bg-white dark:border-strokedark dark:bg-boxdark">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                  <div className="w-full">
                                    <div className={`relative `}>
                                      <textarea
                                        name="body"
                                        rows={5}
                                        value={currentSummary.body}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus-border-primary"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                            <button
                              type="button"
                              onClick={() => updateSummaryDetails(currentSummary.id, { body: currentSummary.body })}
                              disabled={updateLoading}
                              className={`mr-5 mb-5 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {updateLoading ? (
                                <div className="flex items-center">
                                  <div className="spinner"></div>
                                  <span className="pl-1">Updating...</span>
                                </div>
                              ) : (
                                <>Update Details</>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      <FontAwesomeIcon 
                      onClick={() => showDeleteConfirmation(summary._id)}
                      icon={faTrash} 
                        className="text-gray-500 cursor-pointer" 
                      />
                      {isDeleteConfirmationVisible && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
                        <div className="bg-white p-5 rounded-lg shadow-md">
                          <p>Are you sure you want to delete this record?</p>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={hideDeleteConfirmation}
                              className="mr-4 rounded bg-primary py-2 px-3 text-white hover:bg-opacity-90"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                hideDeleteConfirmation();
                                deleteSummaryDetails(summary._id);
                              }}
                              className="rounded bg-danger py-2 px-3 text-white hover:bg-opacity-90"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">{summary.body}</div>
                  </div>
                ))}
                {interimResult && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <div className="text-gray-800 dark:text-gray-200">{interimResult}</div>
                  </div>
                )}
              </div>
              {summary && (
                <div className="bg-white mt-5 dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h3>Generated Summary:</h3>
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              )}  
              {ehr && (
                <div className="bg-white mt-5 dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h3>Generated EHR:</h3>
                  <ReactMarkdown>{ehr}</ReactMarkdown>
                </div>
              )}
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
