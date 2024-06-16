import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import ReminderForm from '../../components/ReminderForm';
import ReminderList from '../../components/ReminderList';
import micIcon from './mic.svg';
import Music from '../../music/promise-616.mp3'
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';

const Reminders: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reminderPopupOpen, setReminderPopupOpen] = useState(false);
  const [reminders, setReminders] = useState([]);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach((reminder) => {
        const reminderDate = new Date(`${reminder.date}T${reminder.time}`);
        const now = new Date();

        if (reminderDate <= now) {
          new Notification(reminder.title, {
            body: reminder.description,
          });

          const audio = new Audio(Music);
          audio.play();

          if (reminder.frequency === 'Once') {
            setReminders(reminders.filter((r) => r !== reminder));
          } else if (reminder.frequency === 'Daily') {
            reminderDate.setDate(reminderDate.getDate() + 1);
          } else if (reminder.frequency === 'Weekly') {
            reminderDate.setDate(reminderDate.getDate() + 7);
          } else if (reminder.frequency === 'Hourly') {
            reminderDate.setHours(reminderDate.getHours() + 1);
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);


  const popup = useRef<HTMLDivElement | null>(null); 

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="mb-6 flex flex-row gap-0 lg:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="Reminders" />
                <button 
                  onClick={() => setReminderPopupOpen(!reminderPopupOpen)}
                  className="inline-flex mr-5 items-center justify-center rounded-full bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-100 lg:px-8 xl:px-6">
                    Add Reminder
                </button>
              </div>
             
                {reminderPopupOpen && (
                <div
                  ref={popup}
                  className="fixed inset-0 flex items-center justify-center z-50 bg-tertiary bg-tertiary/90"
                >
                  <div
                    className="bg-white lg:mt-15 lg:w-1/2 rounded-lg pt-3 px-4 shadow-md border border-stroke"
                    style={{ maxHeight: 'calc(100vh - 200px)', overflowY: "scroll" }}
                  >
                    <div className="flex flex-row justify-between">
                      <h2 className="text-xl font-semibold mb-2 text-primary">Add Reminder</h2>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setReminderPopupOpen(false)} 
                          className="text-blue-500 hover:text-gray-700 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 fill-current bg-primary   rounded-full p-1 hover:bg-opacity-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ReminderForm addReminder={addReminder} setReminderPopupOpen={setReminderPopupOpen} />
                  </div>
                </div>
              )}
          
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Manage Your Reminders</h1>
                <ReminderList reminders={reminders} deleteReminder={deleteReminder} />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          // onClick={isRecording ? handleStopRecording : startSpeechToText}
          className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-6 text-white hover:bg-opacity-90"
        >
          <span>Start Recording</span>
          <img src={micIcon} alt="" className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Reminders;
