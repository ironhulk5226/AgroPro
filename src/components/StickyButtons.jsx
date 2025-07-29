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
      href: 'https://apkpure.com/agropro/com.example.agro_pro',
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
    <div className="fixed bottom-36 right-3 z-[9999] space-y-3">
      {buttons.map((btn, index) => (
        <a
          key={index}
          href={btn.href}
          target='_blank'
          className={`group relative h-14 w-14 hover:w-40 rounded-full flex items-center justify-start pl-4 text-white text-base font-medium shadow-md transition-all duration-300 ease-in-out overflow-hidden ${btn.bg}`}
        >
          {/* Icon */}
          <span className="absolute left-4 transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0 text-xl">
            {btn.icon}
          </span>

          {/* Text */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ml-8 whitespace-nowrap">
            {btn.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default StickyButtons;
