import React from 'react';

const StickyButtons = () => {
  const buttons = [
    {
      href: 'https://drive.google.com/file/d/19YBkVVKo-BtICNP_DzPVzWSYZByrt0RZ/view?usp=drive_link',
      icon: '📄',
      label: 'View Manual',
      bg: 'bg-orange-500',
    },
    {
      href: 'https://drive.google.com/file/d/1pfCR7FWsFkM7NuqcKEIDzAZdAmeiRSqs/view?usp=sharing',
      icon: '⬇️',
      label: 'Download',
      bg: 'bg-blue-500',
    },
    {
      href: 'https://www.youtube.com/embed/MxAH505KqQE?si=dnJFgyBaXD6Fj0p-',
      icon: '❓',
      label: 'Help / Info',
      bg: 'bg-green-500',
    },
  ];

  return (
    <div className="fixed bottom-20 sm:bottom-24 md:bottom-36 right-2 sm:right-3 z-[100] space-y-2 sm:space-y-3">
      {buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.href}
          target='_blank'
          className={`group relative h-12 w-12 sm:h-14 sm:w-14 hover:w-32 sm:hover:w-40 rounded-full flex items-center justify-start pl-3 sm:pl-4 text-white text-sm sm:text-base font-medium shadow-md dark:shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${btn.bg} dark:opacity-90 dark:hover:opacity-100`}
        >
          {/* Icon */}
          <span className="absolute left-3 sm:left-4 transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0 text-lg sm:text-xl">
            {btn.icon}
          </span>

          {/* Text */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ml-6 sm:ml-8 whitespace-nowrap text-xs sm:text-sm">
            {btn.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default StickyButtons;
