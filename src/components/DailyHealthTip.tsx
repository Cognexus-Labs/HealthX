import { useEffect, useState } from 'react';
import Groq from "groq-sdk";
import ReactMarkdown from 'react-markdown';


const DailyHealthTip = () => {
  const [healthTip, setHealthTip] = useState('Eat more fruits and vegetables to stay healthy.');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  useEffect(() => {
    const fetchStoredHealthTip = () => {
      const storedTip = localStorage.getItem('healthTip');
      const storedDate = localStorage.getItem('healthTipDate');
      const today = new Date().toISOString().split('T')[0];

      if (storedTip && storedDate === today) {
        setHealthTip(storedTip);
        setLoading(false);
      } else {
        handleFetchHealthTip();
      }
    };

    fetchStoredHealthTip();
  }, []);

  const handleFetchHealthTip = async () => {
    setLoading(true);
    setError(false);

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY, dangerouslyAllowBrowser: true });

    try {
      const response = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [{ role: 'system', content: 'Generate a short daily health tip related to Cholera, including preventive measures, symptoms, or treatment.' }], // Add your custom prompt here
        // max_tokens: 50,
      });

      const newTip = response.choices[0]?.message?.content;
      setHealthTip(newTip);

      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('healthTip', newTip);
      localStorage.setItem('healthTipDate', today);
    } catch (error) {
      setError(true);
      setHealthTip('Failed to load health tip');
    } finally {
      setLoading(false);
    }
  };
//   handleFetchHealthTip();

  return (
    <div className="w-full mb-5 mx-auto p-4 bg-gradient-to-r from-[#205c43] from-20% via-[#58b35e] via-50% to-[#abf2d4] to-99% text-white shadow-md rounded-md">
      {/* <h2 className="text-lg font-semibold mb-2">Daily Health Tip</h2> */}
      {error && <p className="text-red-500 mt-2">Error loading health tip</p>}
      <ReactMarkdown>{healthTip}</ReactMarkdown>
    </div>
  );
};

export default DailyHealthTip;
