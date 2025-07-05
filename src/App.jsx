import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBusinessData = async () => {
    if (!name || !location) {
      alert("Please enter both fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('https://growthproai-backend-v57b.onrender.com/business-data', { name, location });
      setData(res.data);
    } catch (error) {
      alert("Failed to fetch data. Please check your backend.");
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`);
      setData(prev => ({ ...prev, headline: res.data.headline }));
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error regenerating headline.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📊 Mini Business Dashboard</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Business Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={fetchBusinessData}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {data && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl space-y-2 text-sm text-gray-800 shadow-inner">
            <p><span className="font-semibold">⭐ Rating:</span> {data.rating}</p>
            <p><span className="font-semibold">📝 Reviews:</span> {data.reviews}</p>
            <p><span className="font-semibold">📢 SEO Headline:</span> {data.headline}</p>
            <button
              onClick={regenerateHeadline}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition duration-200"
            >
              🔄 Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
