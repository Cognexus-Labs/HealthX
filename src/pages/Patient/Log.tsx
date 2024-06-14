import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import micIcon from './mic.svg';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import { toast } from 'react-toastify'; 
import TextInput from '../../components/TextInput';
import AudioInput from '../../components/AudioInput';
import UrlInput from '../../components/UrlInput';
import ImageInput from '../../components/ImageInput';
import SummaryCard from '../../components/SummaryCard';
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

  const popup = useRef<HTMLDivElement | null>(null); 


  const [summaries, setSummaries] = useState([]);

  const addSummary = (summary) => {
    setSummaries([...summaries, summary]);
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
                <Breadcrumb pageName="HealthX Summarizer" />
              </div>
              <div className="min-h-screen bg-gray-100 p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-center">Summarize Anything</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TextInput addSummary={addSummary} />
                    <AudioInput addSummary={addSummary} />
                    <UrlInput addSummary={addSummary} />
                    <ImageInput addSummary={addSummary} />
                </div>
                <div className="mt-8">
                    {summaries.map((summary, index) => (
                    <SummaryCard key={index} summary={summary} />
                    ))}
                </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Summary;
