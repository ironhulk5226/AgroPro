import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaTrophy, FaMedal, FaAward } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      image: '/achievements/news1.jpg',
      date: {
        day: '26',
        month: 'May',
        year: '2024'
      },
      title: 'AIR 3 in Overall Season',
      description: 'Team INDRA has secured ALL INDIA RANK 3 for overall season held in 2024.',
      icon: <FaTrophy className="w-6 h-6 text-yellow-500" />,
      category: 'Overall Performance'
    },
    {
      id: 2,
      image: '/achievements/news2.jpg',
      date: {
        day: '27',
        month: 'Dec',
        year: '2023'
      },
      title: 'AIR 1 in Phase -1 Design Presentation',
      description: 'Team INDRA has secured ALL INDIA RANK 1 for design Presentation held in December 2023.',
      icon: <FaMedal className="w-6 h-6 text-gold-500" />,
      category: 'Design Excellence'
    },
    {
      id: 3,
      image: '/achievements/news3.jpg',
      date: {
        day: '26',
        month: 'May',
        year: '2024'
      },
      title: 'AIR 1 - Best Design Award',
      description: 'Team INDRA has secured ALL INDIA RANK 1 in category of Best Design.',
      icon: <FaAward className="w-6 h-6 text-green-500" />,
      category: 'Design Award'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Header />

      <div className="px-2 sm:px-4 lg:px-8 xl:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
              <FaTrophy className="w-10 h-10 text-white" />
            </div>
            <span className="text-green-600 dark:text-green-400 font-semibold text-lg uppercase tracking-wider block mb-2">
              Our
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Achievements
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Celebrating our journey of innovation, recognition, and excellence in agricultural technology
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(20, 183, 20, 0.3)',
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Achievement Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/achievements/news1.jpg'; // Fallback image
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {achievement.category}
                  </div>

                  {/* Achievement Icon */}
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                    {achievement.icon}
                  </div>
                </div>

                {/* Date Section */}
                <div className="absolute top-40 right-6 bg-green-600 text-white text-center rounded-lg shadow-lg p-3 min-w-[70px] z-10">
                  <div className="text-xl font-bold leading-none">{achievement.date.day}</div>
                  <div className="text-sm font-medium">{achievement.date.month}</div>
                  <div className="text-xs opacity-90">{achievement.date.year}</div>
                </div>

                {/* Content Section */}
                <div className="p-6 pt-8">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                      <FaCalendarAlt className="w-4 h-4 mr-2" />
                      {achievement.date.month} {achievement.date.year}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {achievement.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-1 -right-1 w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-700"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Journey in Numbers
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Milestones that define our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Major Awards</p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMedal className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">AIR 1 Rankings</p>
              </div>

             
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Achievements;