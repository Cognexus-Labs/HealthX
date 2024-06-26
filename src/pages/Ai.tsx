import { useState,  useEffect } from "react";
import Breadcrumb from '../components/Breadcrumb';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Sidebar from '../components/Sidebar';
import DoctorSidebar from '../components/DoctorSidebar';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css'; 
import './ai.css';
export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");

  const chats = useQuery(api.chats.list, { userId: userId });
  const sendChat = useMutation(api.chats.send);
  const deleteAll = useMutation(api.chats.deleteAll);

  const deleteAllChats = async () => {
    await deleteAll({ userId: userId });
  }

  const [newChatText, setNewChatText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [chats]);


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {userType === 'patient' ? (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        ) : (
          <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="mb-6 flex flex-row gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="HealthX AI: Your Personal Healthcare Assistant" />   
                <button className="bg-primary rounded-lg text-white p-3 hover:bg-primary/50" onClick={deleteAllChats}>
                  Clear
                 </button>
              </div>
              <div className="flex flex-col gap-10 rounded-lg">
              <div className=" rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">

                <div className="chat">
                    {chats?.map((chat) => (
                        <article
                        key={chat._id}
                        className={chat.author === "You" ? "message-mine" : ""}
                        >
                        <div>{chat.author}</div>

                        <p>
                            {chat.body}
                        </p>
                        </article>
                    ))}
                    <form
                        className=""
                        onSubmit={async (e) => {
                        e.preventDefault();
                        await sendChat({ body: newChatText, author: "You", userId: userId });
                        setNewChatText("");
                        }}
                    >
                        <input
                        value={newChatText}
                        onChange={async (e) => {
                            const text = e.target.value;
                            setNewChatText(text);
                        }}
                        placeholder="Write a chat…"
                        />
                        <button type="submit" disabled={!newChatText}>
                        Send
                        </button>
                    </form>
                    </div>
                </div>
              </div>
              </div>
          </main>
        </div>
      </div>
    </div>
  );
}

