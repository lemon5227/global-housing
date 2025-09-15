'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getDriveImageUrl } from '@/lib/imageUtils';

interface PhotoCarouselProps {
  photos: string[];
  alt: string;
}

export default function PhotoCarousel({ photos, alt }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  }, [photos.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    console.log('打开大图模态框');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('关闭大图模态框');
    setIsModalOpen(false);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, nextImage, prevImage]);

  if (!photos || photos.length === 0) {
    return (
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 group">
        {failedImages.has(currentIndex) ? (
          // 显示图片加载失败的占位符
          <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            console.log('点击失败图片占位符，准备打开大图');
            openModal();
          }}>
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">图片加载失败</p>
            </div>
          </div>
        ) : (
          <img
            src={getDriveImageUrl(photos[currentIndex])}
            alt={`${alt} - 图片 ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log('图片被点击，准备打开大图');
              openModal();
            }}
            onError={(e) => {
              console.log('图片加载失败:', getDriveImageUrl(photos[currentIndex]));
              // 标记当前图片为失败
              setFailedImages(prev => new Set(prev).add(currentIndex));
              
              // 如果不是所有图片都失败，才尝试切换到下一张
              if (failedImages.size < photos.length - 1) {
                // 寻找下一个未失败的图片
                let nextIndex = currentIndex + 1;
                while (nextIndex < photos.length && failedImages.has(nextIndex)) {
                  nextIndex++;
                }
                if (nextIndex < photos.length) {
                  setCurrentIndex(nextIndex);
                }
              }
            }}
          />
        )}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-75"
              aria-label="上一张图片"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-75"
              aria-label="下一张图片"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                  aria-label={`查看图片 ${index + 1}`}
                />
              ))}
            </div>
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {photos.length > 1 ? `${currentIndex + 1} / ${photos.length}` : '1/1'}
            </div>
          </>
        )}
      </div>
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          <div 
            className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
              aria-label="关闭大图"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={getDriveImageUrl(photos[currentIndex])}
              alt={`${alt} - 图片 ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '90vh', maxWidth: '90vw' }}
              onError={() => {
                console.log('大图加载失败:', getDriveImageUrl(photos[currentIndex]));
                // 大图模式下不自动切换，避免闪烁
              }}
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-[10000]"
                  aria-label="上一张图片"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-[10000]"
                  aria-label="下一张图片"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-[10000]">
                  {currentIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
