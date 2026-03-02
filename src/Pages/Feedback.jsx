import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { FaStar, FaQuoteLeft, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const Feedback = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Hide loader after delay
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    location: '',
    rating: 0,
    message: '',
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const testimonialsPerPage = 3;

  // Load feedbacks from localStorage on component mount
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('agroProFeedbacks');
    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Satish Mangore',
      location: 'Farmer, Koge, Maharashtra',
      image: '/customers/customer_1.jpg',
      rating: 5,
      testimonial: 'AgroPro has completely transformed the way I approach farming. The crop recommendation system helped me identify the best crops for my land, and the results have been amazing. My yield has doubled this season!'
    },
    {
      id: 2,
      name: 'Maruti Patil',
      location: 'Farmer, Kolhapur, Maharashtra',
      image: '/customers/customer_2.jpg',
      rating: 4,
      testimonial: 'As a small farmer, I always struggled to make decisions about fertilizers. The fertilizer recommendation system is a game-changer. It provided me with accurate suggestions, and I saw a noticeable improvement in my crop quality.'
    },
    {
      id: 3,
      name: 'Ramesh Patil',
      location: 'Farmer, Fulewadi, Maharashtra',
      image: '/customers/customer_3.jpg',
      rating: 5,
      testimonial: 'The plant disease classifier saved my tomato crop! I uploaded a photo, and within seconds, I knew exactly what disease it was and how to treat it. AgroPro is a must-have for every farmer.'
    },
    {
      id: 4,
      name: 'Vithal Mangore',
      location: 'Farmer, Koge, Maharashtra',
      image: '/customers/customer_4.jpg',
      rating: 4,
      testimonial: 'The Agro-Chat feature is so helpful. I can ask questions in my local language, and I always get quick and reliable advice. It feels like having an expert by my side all the time.'
    },
    {
      id: 5,
      name: 'Nivas Chopade',
      location: 'Farmer, Majegaon, Maharashtra',
      image: '/customers/customer_5.jpg',
      rating: 5,
      testimonial: 'Farming used to feel overwhelming, but with AgroPro, I now have all the information I need at my fingertips. The multilingual support makes it so easy to use, even for someone like me who isn\'t fluent in English.'
    },
    {
      id: 6,
      name: 'Sumit Patil',
      location: 'Farmer, Punal, Maharashtra',
      image: '/customers/customer_6.jpg',
      rating: 5,
      testimonial: 'Thanks to AgroPro, I\'ve adopted smarter, more sustainable farming practices. The insights provided are not only improving my yield but also helping me conserve resources like water and fertilizers.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFeedbackForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.email || !feedbackForm.message || feedbackForm.rating === 0) {
      alert('Please fill in all required fields and provide a rating.');
      return;
    }

    const newFeedback = {
      ...feedbackForm,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      image: '/customers/default-customer.jpg' // Default profile image for user feedback
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('agroProFeedbacks', JSON.stringify(updatedFeedbacks));

    setFeedbackForm({
      name: '',
      email: '',
      location: '',
      rating: 0,
      message: '',
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  // Combine testimonials with feedback for carousel
  const allTestimonials = [...testimonials, ...feedbacks.map(feedback => ({
    ...feedback,
    testimonial: feedback.message,
    image: feedback.image || '/customers/default-customer.jpg'
  }))];

  const totalPages = Math.ceil(allTestimonials.length / testimonialsPerPage);
  const currentTestimonials = allTestimonials.slice(
    currentTestimonialPage * testimonialsPerPage,
    (currentTestimonialPage + 1) * testimonialsPerPage
  );

  const nextTestimonialPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialPage((prev) => (prev + 1) % totalPages);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const prevTestimonialPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialPage((prev) => (prev - 1 + totalPages) % totalPages);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {isPageLoading && <Loader />}
      <Header />
     

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
          Thank you for your feedback!
        </div>
      )}

      <div className="px-2 sm:px-4 lg:px-8 xl:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="text-green-600 dark:text-green-400 font-semibold text-lg uppercase tracking-wider">
                Our Customers
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                TESTIMONIALS
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Hear what our farmers have to say about their experience with AgroPro
              </p>
            </div>

            {/* Testimonial Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              {totalPages > 1 && (
                <>
                  <button
                    onClick={prevTestimonialPage}
                    disabled={isTransitioning}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonialPage}
                    disabled={isTransitioning}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Testimonial Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px] transition-all duration-300 ease-in-out transform ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                {currentTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id || `feedback-${testimonial.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative group"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(20, 183, 20, 0.3), 0 10px 10px -5px rgba(20, 183, 20, 0.04)'
                    }}
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaQuoteLeft className="w-4 h-4" />
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center mb-4 mt-2">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-200 dark:border-green-700 mr-4 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center" style={{display: 'none'}}>
                          <FaUser className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                        {testimonial.date && (
                          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                            {testimonial.date}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Green accent border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-xl"></div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialPage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonialPage
                          ? 'bg-green-600 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Feedback Form Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Share Your Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  We value your feedback and use it to improve our services
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Location Field */}
                <div className="space-y-2 md:col-span-1">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={feedbackForm.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Rating Field */}
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none transition-transform duration-150 hover:scale-110"
                      >
                        <FaStar
                          className={`w-8 h-8 ${
                            star <= feedbackForm.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={feedbackForm.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your experience with AgroPro..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                  >
                    <IoMdSend className="w-5 h-5 mr-2" />
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;