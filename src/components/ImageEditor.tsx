"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageEditorProps {
  images: string[];
  onSave: (images: string[]) => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  section: 'servicos' | 'ipt';
}

// Função para pegar a URL base
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.empresajuniortoledo.com.br';
  }
  return 'http://localhost:3000';
};

export default function ImageEditor({ images, onSave, onCancel, title, description, section }: ImageEditorProps) {
  const [currentImages, setCurrentImages] = useState<string[]>(images);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('section', section);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer upload');
      }

      setCurrentImages([...currentImages, data.fileName]);
    } catch (error) {
      console.error('Erro no upload:', error);
      setError(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setCurrentImages(currentImages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(currentImages);
      onCancel();
    } catch (error) {
      alert('Erro ao salvar as alterações');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title || 'Editar Imagens'}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {currentImages.map((image, index) => (
            <div key={index} className="relative group aspect-video">
              <Image
                src={image}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          <label className={`
            relative aspect-video border-2 border-dashed rounded-lg
            flex items-center justify-center cursor-pointer
            hover:bg-gray-50 transition-colors
            ${isUploading ? 'bg-gray-100 cursor-wait' : ''}
          `}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="mt-2 text-sm text-gray-500">Enviando...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ArrowUpTrayIcon className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Adicionar Imagem</span>
              </div>
            )}
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(currentImages)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            disabled={isUploading}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
} 