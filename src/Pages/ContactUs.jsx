import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Hide loader after delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {isLoading && <Loader />}
      <Header />
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
              Have questions about our agricultural solutions? We'd love to hear from you. 
              Fill out the form below and our team will get back to you soon.
            </p>
          </div>

          {/* Google Form Section */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-full flex justify-center">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSclU9PW71MC-2X1ZRByCo5v0HpFW-90Vhiy8xm_zwZIcecm-Q/viewform?usp=publish-editor"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="rounded-lg shadow-lg sm:h-[700px]"
                  title="Contact Form"
                  style={{ minHeight: '500px' }}
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Visit Our Campus
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-2">
                Find us at Government College of Engineering, Karad
              </p>
            </div>

            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <div className="map-responsive rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.124196805417!2d74.18464267492001!3d17.30955578356443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1826400000001%3A0x34bdd98ca25093e3!2sGovernment%20College%20of%20Engineering%2C%20Karad!5e0!3m2!1sen!2sin!4v1726553777142!5m2!1sen!2sin" 
                  width="600" 
                  height="350" 
                  frameBorder="0" 
                  style={{ border: 0, width: '100%' }} 
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Government College of Engineering, Karad"
                  className="rounded-lg sm:h-[430px]"
                />
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="grid md:grid-cols-1 gap-8 mt-8 sm:mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <p className="flex items-start sm:items-center">
                  <span className="font-medium min-w-0 flex-shrink-0">📧 Email:</span>
                  <span className="ml-2 break-all sm:break-normal">tifan25teamindra@gmail.com</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium min-w-0 flex-shrink-0">📞 Phone:</span>
                  <span className="ml-2">+91 8108737426</span>
                </p>
                <p className="flex items-start sm:items-center">
                  <span className="font-medium min-w-0 flex-shrink-0">📍 Address:</span>
                  <span className="ml-2">GCE Karad, Maharashtra, India</span>
                </p>
              </div>
            </div>

            {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Office Hours
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs