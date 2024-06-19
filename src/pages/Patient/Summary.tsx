import React, { useState, useRef } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import TextInput from '../../components/TextInput';
import AudioInput from '../../components/AudioInput';
import UrlInput from '../../components/UrlInput';
import ImageInput from '../../components/ImageInput';
import EhrInput from '../../components/EhrInput';
// import SummaryCard from '../../components/SummaryCard';
import PdfInput from '../../components/PdfInput';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';

const Summary: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [summaries, setSummaries] = useState([]);

//   const addSummary = (summary) => {
//     setSummaries([...summaries, summary]);
//   };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="mb-6 flex flex-row gap-0 lg:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="HealthX Summarizer: Summarize Anything" />
              </div>
              <div className="min-h-screen bg-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <TextInput />
                    <PdfInput />
                    <AudioInput />
                    <UrlInput />
                    <ImageInput />
                    <EhrInput />
                </div>
                {/* <div className="mt-8">
                    {summaries.map((summary, index) => (
                    <SummaryCard key={index} summary={summary} />
                    ))}
                </div> */}
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Summary;