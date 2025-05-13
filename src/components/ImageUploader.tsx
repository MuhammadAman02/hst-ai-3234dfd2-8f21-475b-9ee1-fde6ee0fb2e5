import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImageUploaderProps } from '@/types';
import { detectSkinTone } from '@/utils/colorUtils';

const ImageUploader = ({ onImageUpload, onSkinToneDetected }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageUrl = e.target.result as string;
        
        // Create an image element to detect skin tone
        const img = new Image();
        img.onload = () => {
          const detectedTone = detectSkinTone(img);
          onSkinToneDetected(detectedTone);
          onImageUpload(imageUrl);
          setIsLoading(false);
        };
        img.src = imageUrl;
      }
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`upload-area ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {isLoading ? (
          <div className="py-4">
            <div className="w-8 h-8 border-4 border-app-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-500">Processing image...</p>
          </div>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="mt-2 text-gray-500">Drag and drop an image here, or click to select</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Select Image
            </Button>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;