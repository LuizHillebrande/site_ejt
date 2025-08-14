"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageEditorProps {
  images: string[];
  onSave: (images: string[]) => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  section: 'servicos' | 'ipt';
}

export default function ImageEditor({ images, onSave, onCancel, title, description, section }: ImageEditorProps) {
  const [currentImages, setCurrentImages] = useState<string[]>(images);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const data = await response.json();
        throw new Error(data.error + (data.debug ? `\n\nDebug Info:\n${JSON.stringify(data.debug, null, 2)}` : ''));
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

  const handleRemove = (index: number) => {
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    setCurrentImages(newImages);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title || 'Editar Imagens'}</h2>
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

        {/* Grid de Imagens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {currentImages.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] group">
              <Image
                src={image}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Botão de Upload */}
          <label className="relative aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-sm text-gray-500 mt-2">Enviando...</span>
              </div>
            ) : (
              <>
                <PlusIcon className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500 mt-1">Adicionar Imagem</span>
              </>
            )}
          </label>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(currentImages)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
} 