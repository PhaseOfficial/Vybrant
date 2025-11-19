import React, { useState } from 'react';
import { editImage } from '../services/geminiService';
import Spinner from './Spinner';
import Modal from './Modal';

const ImageEditor = ({ image, onClose, onImageEdited }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditImage = async () => {
    if (!prompt || !image) return;
    setIsLoading(true);
    setError(null);
    try {
      const base64Data = image.src.split(',')[1];
      const { base64: newBase64, mimeType: newMimeType } = await editImage(base64Data, image.mimeType, prompt);
      onImageEdited(image.id, `data:${newMimeType};base64,${newBase64}`, newMimeType);
      onClose();
    } catch (err) {
      setError('Failed to edit image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={!!image} onClose={onClose} title="Edit Image with AI">
        {image && (
            <div className="space-y-4">
                <img src={image.src} alt={image.prompt} className="rounded-lg max-h-96 w-full object-contain" />
                <div className="relative">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Add a retro filter, make it black and white..."
                        className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                        disabled={isLoading}
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    onClick={handleEditImage}
                    disabled={isLoading || !prompt}
                    className="w-full flex justify-center items-center bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? <Spinner /> : 'Apply Edit'}
                </button>
            </div>
        )}
    </Modal>
  );
};

export default ImageEditor;