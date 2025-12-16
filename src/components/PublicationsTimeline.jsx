import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack'; 

const timelineData = [
  { id: 'vol1', title: 'TEJAS VOL 1', imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923642/TejasVol1.avif', linkUrl: 'https://online.pubhtml5.com/hiwar/abef/' },
  { id: 'vol2', title: 'TEJAS VOL 2', imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923716/TejasVol2.avif', linkUrl: 'https://pubhtml5.com/hiwar/uqpn/' },
  { id: 'vol3', title: 'TEJAS VOL 3', imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923748/TejasVol3.1.avif', linkUrl: 'https://pubhtml5.com/hiwar/vfrp/' },
  { id: 'vol4', title: 'TEJAS VOL 4', imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1729399795/TejasVol4.1.jpg', linkUrl: 'https://online.pubhtml5.com/eqdgd/rjrs/' },
  { id: 'vol5', title: 'TEJAS VOL 5', imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1748405489/TejasVolume42.jpg', linkUrl: 'https://online.pubhtml5.com/rylr/mdds/' },
];

export default function PublicationsTimeline() {
  const fullTitle = 'PUBLICATIONS';
  const [title, setTitle] = useState('');
  const [viewCounts, setViewCounts] = useState({});

  // 1. Fetch counts from YOUR backend proxy
  useEffect(() => {
    timelineData.forEach(item => {
      fetch(`/api/count?id=${item.id}`)
        .then(res => res.json())
        .then(data => {
            setViewCounts(prev => ({ ...prev, [item.id]: data.count || 0 }));
        })
        .catch(err => console.error("Error fetching count:", err));
    });

    // Typewriter effect
    setTitle('');
    let i = 0;
    const intervalId = setInterval(() => {
      setTitle(fullTitle.substring(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(intervalId);
    }, 120);
    return () => clearInterval(intervalId);
  }, []);

  // 2. Increment via YOUR backend proxy
  const handleMagazineClick = (id) => {
    // Optimistic Update
    setViewCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Call internal API with type='increment'
    fetch(`/api/count?id=${id}&type=increment`)
      .catch(err => console.error("Error updating view count:", err));
  };

  return (
    <div className="w-full min-h-screen text-white bg-black">
      <header className="w-full h-screen flex items-center justify-center relative overflow-hidden animated-circle-bg">
        <h1 className="w-full font-playfair font-bold text-center uppercase text-white z-10 px-4 text-[clamp(2.25rem,10vw,6rem)] tracking-[0.1em]">
          {title}
        </h1>
      </header>

      <section className="w-full min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="w-full h-screen max-w-7xl rounded-3xl bg-neutral-900/70 shadow-2xl backdrop-blur-md overflow-hidden relative border border-white/10">
          <ScrollStack>
            {timelineData.map((entry) => (
              <ScrollStackItem key={entry.id}>
                <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full px-6 md:px-12 lg:px-20">
                  <div className="flex flex-col items-center md:items-start justify-center md:w-2/5 w-full text-center md:text-left mb-8 md:mb-0 md:mr-10">
                    <a
                      href={entry.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleMagazineClick(entry.id)}
                      className="relative px-12 py-5 font-extrabold uppercase text-lg text-black bg-gradient-to-r from-blue-200/90 via-white/80 to-blue-500/90 border border-white/40 rounded-[50px] shadow-2xl shadow-blue-900/50 transition-all duration-300 mb-4 cursor-pointer hover:scale-[1.05]"
                    >
                      {entry.title}
                    </a>
                    
                    <div className="flex items-center space-x-2 mb-4 text-blue-300/80 bg-white/5 px-3 py-1 rounded-full">
                      <Eye size={20} />
                      <span className="font-mono text-sm tracking-widest">
                        {viewCounts[entry.id] || 0} VIEWS
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-white/70 max-w-sm">
                      {entry.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:flex flex-col items-center h-full justify-center mx-auto md:mx-0 w-8">
                    <div className="absolute top-0 h-full w-px bg-white/20 z-10"></div>
                    <div className="sticky top-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-4 h-4 bg-white rounded-full border-2 border-black shadow-lg"></div>
                    </div>
                  </div>

                  <div className="md:w-2/5 w-full mt-8 md:mt-0 md:ml-10">
                    <a
                      href={entry.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleMagazineClick(entry.id)}
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