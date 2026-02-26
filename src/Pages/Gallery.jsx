import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaExpand } from 'react-icons/fa';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  // Gallery images data - trying different path approaches
  const galleryImages = [
    { src: './gallery/1.jpg', alt: 'AgroPro Gallery Image 1' },
    { src: './gallery/2.jpg', alt: 'AgroPro Gallery Image 2' },
    { src: './gallery/3.jpg', alt: 'AgroPro Gallery Image 3' },
    { src: './gallery/4.jpg', alt: 'AgroPro Gallery Image 4' },
    { src: './gallery/5.jpg', alt: 'AgroPro Gallery Image 5' },
    { src: './gallery/6.jpg', alt: 'AgroPro Gallery Image 6' },
    { src: './gallery/7.jpg', alt: 'AgroPro Gallery Image 7' },
    { src: './gallery/8.jpg', alt: 'AgroPro Gallery Image 8' },
    { src: './gallery/8.jpeg', alt: 'AgroPro Gallery Image 8 JPEG' },
    { src: './gallery/9.jpg', alt: 'AgroPro Gallery Image 9' },
    { src: './gallery/9.jpeg', alt: 'AgroPro Gallery Image 9 JPEG' },
    { src: './gallery/10.jpg', alt: 'AgroPro Gallery Image 10' },
    { src: './gallery/11.jpg', alt: 'AgroPro Gallery Image 11' },
    { src: './gallery/11.jpeg', alt: 'AgroPro Gallery Image 11 JPEG' },
    { src: './gallery/12.jpg', alt: 'AgroPro Gallery Image 12' },
    { src: './gallery/12.jpeg', alt: 'AgroPro Gallery Image 12 JPEG' },
    { src: './gallery/13.jpg', alt: 'AgroPro Gallery Image 13' },
    { src: './gallery/13.jpeg', alt: 'AgroPro Gallery Image 13 JPEG' },
    { src: './gallery/14.jpg', alt: 'AgroPro Gallery Image 14' },
    { src: './gallery/14.jpeg', alt: 'AgroPro Gallery Image 14 JPEG' },
    { src: './gallery/15.jpg', alt: 'AgroPro Gallery Image 15' },
    { src: './gallery/15.jpeg', alt: 'AgroPro Gallery Image 15 JPEG' },
    { src: './gallery/16.jpg', alt: 'AgroPro Gallery Image 16' }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % galleryImages.length
      : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
  };

  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      // Hide loader when 80% of images are loaded or after minimum 2 seconds
      if (newCount >= Math.ceil(galleryImages.length * 0.8)) {
        setTimeout(() => setIsLoading(false), 500);
      }
      return newCount;
    });
  };

  const handleImageError = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount >= Math.ceil(galleryImages.length * 0.8)) {
        setTimeout(() => setIsLoading(false), 500);
      }
      return newCount;
    });
  };

  // Hide loader after maximum 5 seconds regardless of image loading
  useEffect(() => {
    const maxLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(maxLoadTime);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Loader */}
      {isLoading && <Loader />}
      
      <Header />

      <div className="px-2 sm:px-4 lg:px-8 xl:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Gallery Header */}
          <div className="text-center mb-16 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
              <FaImages className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our collection of moments, achievements, and innovations in agricultural technology
            </p>
          </div>

          {/* Gallery Container */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8 shadow-lg">
            
            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-200 dark:bg-gray-700"
                  onClick={() => openLightbox(image, index)}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      console.log('Failed to load image:', image.src);
                      handleImageError();
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={(e) => {
                      console.log('Successfully loaded:', image.src);
                      handleImageLoad();
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'none';
                      }
                    }}
                  />
                  
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300" style={{display: 'none'}}>
                    <div className="text-center">
                      <FaImages className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Image {index + 1}</p>
                      <p className="text-xs opacity-75">Gallery Photo</p>
                    </div>
                  </div>

                  {/* Hover expand icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-green-600 text-white p-2 rounded-full">
                      <FaExpand className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Image number badge */}
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>

                  {/* Green accent border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>

            {/* Gallery Stats */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-green-600 dark:text-green-400">{galleryImages.length}</span> images in gallery
                {!isLoading && (
                  <span className="ml-2 text-sm">• <span className="text-green-600 dark:text-green-400">{loadedImages}</span> loaded</span>
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Click on any image to view in full screen
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-2xl">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 bg-opacity-80 dark:bg-opacity-90 text-white dark:text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;