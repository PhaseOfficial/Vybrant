import React, { useState, useCallback } from 'react';
import { generateBlogContent, generateImage, analyzeSeo, fixGrammar, generateTrendingTitles, suggestImagePrompts, editImage } from '../services/geminiService';
import ImageEditor from '../components/ImageEditor';
import Spinner from '../components/Spinner';
import SeoSuggestions from '../components/SeoSuggestions';
import ContentPlanner from '../components/ContentPlanner';
import TitleSuggester from '../components/TitleSuggester';
import ImagePromptSuggester from '../components/ImagePromptSuggester';

const Header = () => (
  <header className="bg-slate-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-slate-700">
    <div className="container mx-auto flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-sky-400">
        <path d="M12 .75a8.25 8.25 0 0 0-4.133 15.543c.367.068.5-.158.5-.35v-1.246c0-.608-.022-2.502-1.523-3.024.994-.113 2.043-.484 2.043-2.261 0-.5.179-.909.472-1.229-.047-.113-.204-.582.045-1.212 0 0 .375-.12.123.475A4.295 4.295 0 0 1 12 6.45c1.155 0 2.225.41 3.016 1.088 1.153-.594 1.23-.475 1.23-.475.25.63.093 1.1.046 1.212.293.32.47.73.47 1.229 0 1.777 1.05 2.147 2.046 2.26-.929.8-1.408 1.83-1.488 2.793H15.5v-1.246c0-.192.133-.418.5-.35A8.25 8.25 0 0 0 12 .75Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12 23.25c-5.26 0-9.617-3.955-10.37-9h3.454a7.03 7.03 0 0 1 1.21 2.39L4.25 18.5h3.5l.82-2.5H15.5l.82 2.5h3.5l-2.043-1.859a7.03 7.03 0 0 1 1.21-2.39h3.454c-.753 5.045-5.11 9-10.37 9Z" clipRule="evenodd" />
      </svg>
      <h1 className="text-2xl font-bold text-white">AI Blog Assistant</h1>
    </div>
  </header>
);

const imageStyles = ['Photorealistic', 'Cartoon', 'Watercolor', 'Abstract', 'Minimalist', 'Retro', 'Cyberpunk', 'Fantasy'];

const BlogApp = () => {
  const [blogTitle, setBlogTitle] = useState('My Awesome AI-Generated Blog Post');
  const [blogContent, setBlogContent] = useState('');
  const [images, setImages] = useState([]);
  
  const [contentPrompt, setContentPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImageStyle, setSelectedImageStyle] = useState(null);
  
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isAnalyzingSeo, setIsAnalyzingSeo] = useState(false);
  const [isFixingGrammar, setIsFixingGrammar] = useState(false);

  const [seoAnalysis, setSeoAnalysis] = useState(null);
  const [plannedPosts, setPlannedPosts] = useState([]);
  
  const [error, setError] = useState(null);
  
  const [editingImage, setEditingImage] = useState(null);

  const handleGenerateContent = async () => {
    if (!contentPrompt) return;
    setIsGeneratingContent(true);
    setSeoAnalysis(null);
    setError(null);
    try {
      const content = await generateBlogContent(contentPrompt);
      setBlogContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleAnalyzeSeo = async () => {
    if (!blogContent) return;
    setIsAnalyzingSeo(true);
    setError(null);
    try {
      const analysis = await analyzeSeo(blogTitle, blogContent);
      setSeoAnalysis(analysis);
    } catch (err) {
      setError('Failed to analyze SEO. Please try again.');
    } finally {
      setIsAnalyzingSeo(false);
    }
  };
  
  const handleFixGrammar = async () => {
    if (!blogContent) return;
    setIsFixingGrammar(true);
    setError(null);
    try {
      const fixed = await fixGrammar(blogContent);
      setBlogContent(fixed);
    } catch (err) {
      setError("Failed to fix grammar.");
    } finally {
      setIsFixingGrammar(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    setError(null);
    try {
      const finalPrompt = selectedImageStyle
        ? `${imagePrompt}, in a ${selectedImageStyle.toLowerCase()} style`
        : imagePrompt;

      const { base64, mimeType } = await generateImage(finalPrompt);
      const newImage = {
        id: new Date().toISOString(),
        src: `data:${mimeType};base64,${base64}`,
        prompt: imagePrompt,
        mimeType,
      };
      setImages(prev => [...prev, newImage]);
      setImagePrompt('');
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleImageEdited = useCallback((imageId, newSrc, newMimeType) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === imageId ? { ...img, src: newSrc, mimeType: newMimeType } : img
      )
    );
  }, []);

  const deleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };
  
  const addPlannedPost = (post) => {
    const newPost = { ...post, id: new Date().toISOString() };
    setPlannedPosts(prev => [...prev, newPost]);
  };

  const deletePlannedPost = (id) => {
    setPlannedPosts(prev => prev.filter(p => p.id !== id));
  };
  
  const startGenerationFromPlan = (topic) => {
    setContentPrompt(topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTitleSelection = (title) => {
    setBlogTitle(title);
    setContentPrompt(title);
  };

  return (
    <div className="min-h-screen text-slate-300">
      <Header />
      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Blog Content</h2>
          
          <TitleSuggester onSelectTitle={handleTitleSelection} />

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">Blog Title</label>
              <input 
                id="title"
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
              />
            </div>
            
            <div>
              <label htmlFor="content-prompt" className="block text-sm font-medium text-slate-400 mb-2">Content Prompt</label>
              <div className="flex gap-2">
                <input
                  id="content-prompt"
                  type="text"
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder="e.g., The future of renewable energy"
                  className="flex-grow w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                />
                <button
                  onClick={handleGenerateContent}
                  disabled={isGeneratingContent || !contentPrompt}
                  className="flex-shrink-0 flex items-center justify-center bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingContent ? <Spinner /> : 'Generate'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-400 mb-2">Blog Post Body</label>
              <textarea
                id="content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                rows={20}
                className="w-full bg-slate-900/50 text-white p-4 rounded-lg border-2 border-slate-700 focus:border-sky-500 focus:ring-sky-500 transition"
                placeholder="Your generated blog content will appear here. You can also start writing directly!"
              />
            </div>
            
            {blogContent && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleFixGrammar}
                  disabled={isFixingGrammar}
                  className="flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isFixingGrammar ? <Spinner /> : 'Fix Grammar & Spelling'}
                </button>
                <button
                  onClick={handleAnalyzeSeo}
                  disabled={isAnalyzingSeo}
                  className="flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzingSeo ? <Spinner /> : 'Analyze SEO'}
                </button>
              </div>
            )}
            <SeoSuggestions analysis={seoAnalysis} isLoading={isAnalyzingSeo} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <ContentPlanner 
            posts={plannedPosts}
            onAddPost={addPlannedPost}
            onDeletePost={deletePlannedPost}
            onGenerateFromPost={startGenerationFromPlan}
          />
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Image Tools</h2>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Artistic Style</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {imageStyles.map(style => (
                  <button 
                    key={style}
                    onClick={() => setSelectedImageStyle(prev => prev === style ? null : style)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedImageStyle === style ? 'bg-indigo-500 text-white font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              
              <ImagePromptSuggester 
                blogContent={blogContent} 
                onSelectPrompt={(prompt) => setImagePrompt(prompt)} 
              />

              <label htmlFor="image-prompt" className="block text-sm font-medium text-slate-400 mb-2">Image Prompt</label>
              <div className="flex flex-col gap-2">
                <textarea
                  id="image-prompt"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="e.g., A futuristic city skyline at sunset"
                  className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                  rows={3}
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage || !imagePrompt}
                  className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingImage ? <Spinner /> : 'Generate Image'}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white px-2">Image Gallery</h3>
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg">{error}</div>}
            {isGeneratingImage && <div className="text-center p-4">Generating your masterpiece...</div>}
            {images.length === 0 && !isGeneratingImage && <p className="text-slate-400 text-center p-4">Your generated images will appear here.</p>}
            <div className="columns-1 sm:columns-2 gap-4">
              {images.map(image => (
                <div key={image.id} className="group relative bg-slate-800 p-2 rounded-lg shadow-md mb-4 break-inside-avoid">
                  <img src={image.src} alt={image.prompt} className="rounded-md w-full" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => setEditingImage(image)} className="bg-sky-600/80 p-3 rounded-full hover:bg-sky-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white"><path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" /></svg>
                    </button>
                    <button onClick={() => deleteImage(image.id)} className="bg-red-600/80 p-3 rounded-full hover:bg-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52l.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193v-.443A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <ImageEditor 
        image={editingImage}
        onClose={() => setEditingImage(null)}
        onImageEdited={handleImageEdited}
      />
    </div>
  );
};

export default BlogApp;