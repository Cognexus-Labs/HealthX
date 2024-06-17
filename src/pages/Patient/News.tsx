import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';

const News: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [news, setNews] = useState([]);

//  function to shorten the article description return from the api
    const shortenDescription = (description) => {
        if (description.length > 100) {
        return description.substring(0, 100) + '...';
        }
        return description;
    }

  const API_KEY = process.env.NEWS_API_KEY;
  const MEDIASTACK_API_KEY = process.env.MEDIASTACK_API_KEY;
  const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

    // Get the news from the News API
    const getNews = async () => {
      try {
        console.log(API_KEY);
        const res = await fetch(`https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data);
        setNews(data.articles);
        } catch (err) {
        console.error(err);
        }
    }

    const getMediaStackNews = async () => {
        try {
            console.log(MEDIASTACK_API_KEY);
            const res = await fetch(`http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_API_KEY}&country=ni&languages=en&limit=10`);
            const data = await res.json();
            console.log(data);
            setNews(data.data);
            } catch (err) {
            console.error(err);
            }
        }

    const getNewsData = async () => {
        try {
            console.log(NEWSDATA_API_KEY);
            const res = await fetch(`https://newsdata.io/api/1/latest?country=ng&category=health&apikey=${NEWSDATA_API_KEY}`);
            const data = await res.json();
            console.log(data);
            setNews(data.results);
            } catch (err) {
            console.error(err);
            }
        }
    
    useEffect(() => {
        getNewsData();
    }
    , []);



  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="mb-6 flex flex-row gap-0 lg:gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Breadcrumb pageName="Trending News and Tips" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news?.map((article, index) => (
                  <div key={index} className="bg-white dark:bg-boxdark-1 dark:text-bodydark rounded-lg shadow-lg">
                    <img src={article.image_url} alt={article.title} className="rounded-t-lg" />
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shortenDescription(article.description)}</p>
                      <a href={article.link} target="_blank" rel="noreferrer" className="text-black mt-5 hover:underline">Read More</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    
    </div>
  );
};

export default News;
