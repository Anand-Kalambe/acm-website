import React, { useState, useEffect } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const timelineData = [
  { 
    id: 1, 
    title: 'TEJAS VOL 1', 
    description: 'We start by gaining a deep understanding of your business goals and challenges, laying the groundwork for a truly transformative digital solution.', 
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923642/TejasVol1.avif',
    linkUrl: 'https://online.pubhtml5.com/hiwar/abef/' // Reference Link Added
  },
  { 
    id: 2, 
    title: 'TEJAS VOL 2', 
    description: 'Our team of expert designers and developers collaborate to create a visually stunning and intuitive user experience that captivates your audience.', 
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923716/TejasVol2.avif',
    linkUrl: 'https://pubhtml5.com/hiwar/uqpn/' // Reference Link Added
  },
  { 
    id: 3, 
    title: 'TEJAS VOL 3', 
    description: 'Leveraging the latest technologies, we build robust and scalable applications that perform flawlessly under any workload.', 
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923748/TejasVol3.1.avif',
    linkUrl: 'https://pubhtml5.com/hiwar/vfrp/' // Reference Link Added
  },
  { 
    id: 4, 
    title: 'TEJAS VOL 4', 
    description: 'We conclude with rigorous testing and a strategic deployment plan, ensuring a seamless launch and continued success for your project.', 
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1729399795/TejasVol4.1.jpg',
    linkUrl: 'https://online.pubhtml5.com/eqdgd/rjrs/' // Reference Link Added
  },
  { 
    id: 5, 
    title: 'TEJAS VOL 5', 
    description: 'We provide ongoing support and maintenance, ensuring your digital product continues to evolve and deliver value long after its initial launch.', 
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1748405489/TejasVolume42.jpg',
    linkUrl: 'https://online.pubhtml5.com/rylr/mdds/' // Reference Link Added
  },
];

export default function PublicationsTimeline() {
  const fullTitle = 'PUBLICATIONS';
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('');
    let i = 0;
    const intervalId = setInterval(() => {
      setTitle(fullTitle.substring(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(intervalId);
    }, 120);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <header className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute w-[150%] h-[150%] bg-blue-800 rounded-full right-[-85%] bottom-[-65%] opacity-60 blur-3xl" />
        <h1 className="w-full font-playfair font-bold text-center uppercase text-white z-10 px-4 text-[clamp(2.25rem,10vw,6rem)] tracking-[0.1em]">
          {title}
        </h1>
      </header>

      <section className="w-full min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="w-full h-screen max-w-7xl rounded-3xl bg-neutral-900/70 shadow-2xl backdrop-blur-md overflow-hidden relative border border-white/10">
          <ScrollStack>
            {timelineData.map((entry) => (
              <ScrollStackItem key={entry.id}>
                {/* Main flex container for content and timeline */}
                <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full px-6 md:px-12 lg:px-20">

                  {/* Left content (Label and Description) */}
                  <div className="flex flex-col items-center md:items-end justify-center md:w-2/5 w-full text-center md:text-right mb-8 md:mb-0 md:mr-10">
                    
                    {/* MODIFIED: Title Button to match the screenshot style */}
                    <a
                      href={entry.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-12 py-5 font-extrabold uppercase text-lg text-black bg-gradient-to-r from-blue-200/90 via-white/80 to-blue-500/90 border border-white/40 rounded-[50px] shadow-2xl shadow-blue-900/50 transition-all duration-300 mb-4 cursor-pointer hover:scale-[1.05]"
                    >
                      {entry.title}
                      {/* Inner border/glow effect is removed for clarity and a cleaner look matching the image */}
                    </a>
                    
                    {/* Description text */}
                    <p className="text-sm md:text-base text-white/70 max-w-sm">
                      {entry.description}
                    </p>
                  </div>

                  {/* Timeline Divider and Dot - centered and prominent */}
                  <div className="hidden md:flex flex-col items-center h-full justify-center mx-auto md:mx-0 w-8">
                    {/* Vertical Line */}
                    <div className="absolute top-0 h-full w-px bg-white/20 z-10"></div>
                    {/* Sticky Dot */}
                    <div className="sticky top-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-4 h-4 bg-white rounded-full border-2 border-black shadow-lg"></div>
                    </div>
                  </div>

                  {/* Right content (Image) */}
                  <div className="md:w-2/5 w-full mt-8 md:mt-0 md:ml-10">
                    
                    {/* Image wrapped in an <a> tag */}
                    <a
                      href={entry.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={entry.imageUrl}
                        alt={entry.title}
                        className="w-full h-[60vh] md:h-[70vh] object-cover rounded-2xl"
                      />
                    </a>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>
    </div>
  );
}
