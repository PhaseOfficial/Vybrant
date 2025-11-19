import React, { useState } from 'react';
import { generateTrendingTitles } from '../services/geminiService';
import Spinner from './Spinner';

const TitleSuggester = ({ onSelectTitle }) => {
  const [topic, setTopic] = useState('Trends in care work in the UK');
  const [titles, setTitles] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setTitles([]);
    setSources([]);
    
    try {
      const result = await generateTrendingTitles(topic);
      setTitles(result.titles);
      setSources(result.sources);
    } catch (err) {
      setError('Failed to fetch trends. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-700/30 rounded-xl p-4 mb-6 border border-slate-600">
      <div className="flex justify-between items-center cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-400">
             <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.59l-2.2-2.2a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06l-2.2 2.2V6.75Z" clipRule="evenodd" />
           </svg>
           Idea Generator: Trending Topics
        </h2>
        <button className="text-slate-400 hover:text-white text-sm">
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic to find trends..."
                    className="flex-grow bg-slate-800 text-white placeholder-slate-400 p-2.5 rounded-lg border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition text-sm"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !topic}
                    className="flex-shrink-0 bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 disabled:bg-slate-600 transition-colors text-sm flex items-center"
                >
                    {isLoading ? <Spinner className="w-4 h-4" /> : 'Find Ideas'}
                </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {titles.length > 0 && (
                <div className="space-y-2 animation-fade-in">
                    <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Suggested Titles based on Trends</p>
                    <div className="grid gap-2">
                        {titles.map((title, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectTitle(title)}
                                className="text-left bg-slate-800 hover:bg-slate-600 p-3 rounded-lg text-white text-sm transition border border-slate-700 hover:border-sky-500 group"
                            >
                                <span className="group-hover:text-sky-300 transition-colors">{title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {sources.length > 0 && (
                <div className="pt-2 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Sources found via Google Search:</p>
                    <div className="flex flex-wrap gap-2">
                        {sources.slice(0, 3).map((source, idx) => (
                            <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-800 text-slate-400 hover:text-sky-400 px-2 py-1 rounded border border-slate-700 max-w-xs truncate transition-colors">
                                {source.title}
                            </a>
                        ))}
                        {sources.length > 3 && <span className="text-xs text-slate-500 px-2 py-1">+{sources.length - 3} more</span>}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TitleSuggester;