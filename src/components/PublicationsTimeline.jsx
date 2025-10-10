import React, { useState, useRef, useEffect } from 'react';

// --- Data for the timeline entries ---
const timelineData = [
  {
    id: 1,
    title: 'TEJAS VOL 1',
    description: 'We start by gaining a deep understanding of your business goals and challenges, laying the groundwork for a truly transformative digital solution.',
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1728923642/TejasVol1.avif',
  },
  {
    id: 2,
    title: 'TEJAS VOL 2',
    description: 'Our team of expert designers and developers collaborate to create a visually stunning and intuitive user experience that captivates your audience.',
    imageUrl: '		https://res.cloudinary.com/df9us90ur/image/upload/v1728923716/TejasVol2.avif',
  },
  {
    id: 3,
    title: 'TEJAS VOL 3',
    description: 'Leveraging the latest technologies, we build robust and scalable applications that perform flawlessly under any workload.',
    imageUrl: '	https://res.cloudinary.com/df9us90ur/image/upload/v1728923748/TejasVol3.1.avif',
  },
  {
    id: 4,
    title: 'TEJAS VOL 4',
    description: 'We conclude with rigorous testing and a strategic deployment plan, ensuring a seamless launch and continued success for your project.',
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1729399795/TejasVol4.1.jpg',
  },
  {
    id: 5,
    title: 'TEJAS VOL 5',
    description: 'We provide ongoing support and maintenance, ensuring your digital product continues to evolve and deliver value long after its initial launch.',
    imageUrl: 'https://res.cloudinary.com/df9us90ur/image/upload/v1748405489/TejasVolume42.jpg',
  }
];


// --- The Main Timeline Component ---
export default function PublicationsTimeline() {
  // --- State and Refs for Intro Animation ---
  const fullTitle = "PUBLICATIONS";
  const [title, setTitle] = useState("");

  // --- State and Refs for Timeline ---
  const [activeId, setActiveId] = useState(timelineData[0].id);
  const panelRefs = useRef([]);

  // Effect for Intro Typing Animation
  useEffect(() => {
    setTitle(""); // Reset title on mount
    const typingTimer = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setTitle(fullTitle.substring(0, i + 1));
        i++;
        if (i >= fullTitle.length) {
          clearInterval(intervalId);
        }
      }, 150);
      return () => clearInterval(intervalId);
    }, 500);

    return () => clearTimeout(typingTimer);
  }, []);


  // Effect for Timeline Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.dataset.id));
          }
        });
      },
      { 
        root: null, // Observe intersections relative to the viewport
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0 
      }
    );

    const currentRefs = panelRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full bg-black font-sans text-white">

      {/* --- Intro Section --- */}
      <header className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/50 via-blue-900/30 to-transparent blur-3xl"></div>
        <h1 className="text-5xl md:text-7xl font-serif tracking-[0.4em] md:tracking-[0.5em] text-white/90 uppercase text-center pl-4 relative z-10">
            {title}
        </h1>
      </header>
      
      {/* --- Boxed Timeline Section --- */}
      <section className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-7xl bg-[#0D0D0D] border border-white/10 rounded-3xl relative">
            <main className="relative z-10 w-full h-full mx-auto">
              <div className="relative pt-[50vh] pb-[50vh]">
                 <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-neutral-800 z-0"></div>
                 {timelineData.map((entry, index) => (
                      <div 
                          key={entry.id}
                          ref={el => (panelRefs.current[index] = el)}
                          data-id={entry.id}
                          className="h-screen flex items-center" // Set height to full viewport height
                      >
                          <div className="w-1/2 flex justify-end pr-12">
                               <div className={`
                                  relative group px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out
                                  backdrop-blur-sm cursor-default border
                                  ${activeId === entry.id 
                                      ? 'bg-gradient-to-br from-cyan-300 to-blue-600 text-black shadow-2xl shadow-blue-400/50 border-white/20' 
                                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-800'
                                  }
                              `}>
                                  {entry.title}
                              </div>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 z-10">
                              <div className="w-3 h-3 bg-white rounded-full border-2 border-[#0D0D0D]"></div>
                          </div>
                          <div className="w-1/2 flex justify-start pl-12">
                              <div className={`relative w-full max-w-sm p-4 border border-white/10 rounded-3xl bg-black/20 backdrop-blur-xl transition-all duration-500 ease-in-out
                                  ${activeId === entry.id ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}
                              `}>
                                  <img
                                      src={entry.imageUrl}
                                      alt={entry.title}
                                      className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-black/50"
                                  />
                                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                                      <h3 className="text-xl font-bold tracking-wider uppercase text-shadow">TEJAS</h3>
                                       <p className="text-xs text-white/60 tracking-widest uppercase">Department of AIML</p>
                                       <div className="absolute top-4 right-4 text-xs font-mono bg-white/10 px-2 py-1 rounded">
                                          VOL {entry.id}.0
                                       </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                 ))}
              </div>
            </main>
          </div>
      </section>
    </div>
  );
}

