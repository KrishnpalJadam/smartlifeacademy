// import React, { useEffect, useState } from 'react';
// import { useAudio } from '../AudioContext';

// const GlobalAudioPlayer = () => {
//   const { audioRef, isPlaying, playAudio, bookName } = useAudio();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isVisible, setIsVisible] = useState(true); // State to toggle visibility

//   useEffect(() => {
//     if (!audioRef.current) return;

//     const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
//     const setAudioDuration = () => setDuration(audioRef.current?.duration || 0);

//     audioRef.current.addEventListener('timeupdate', updateTime);
//     audioRef.current.addEventListener('loadedmetadata', setAudioDuration);

//     return () => {
//       if (!audioRef.current) return;
//       audioRef.current.removeEventListener('timeupdate', updateTime);
//       audioRef.current.removeEventListener('loadedmetadata', setAudioDuration);
//     };
//   }, [audioRef.current]); // Ensuring the effect updates when the ref changes

//   if (!audioRef.current?.src || !isVisible) return null; // Hide player when closed or no audio

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00'; // Handle NaN case
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleForward = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
//     }
//   };

//   const handleRewind = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 shadow-xl" style={{ zIndex: "1050" }}>
//       <div className="flex justify-between items-center">
//         <span className="font-semibold text-center w-full">{bookName}</span>
//         {/* Close button */}
//         {/* <button onClick={() => setIsVisible(false)} className="text-white text-lg font-bold mr-2">✖</button> */}
//       </div>

//       <div className="flex items-center gap-4 justify-center mt-2">
//         <button onClick={handleRewind} className="bg-gray-500 text-white px-2 py-1 rounded">⏪ -10s</button>
//         <button
//           onClick={() => playAudio(audioRef.current.src, bookName)}
//           className="bg-amber-400 text-black px-3 py-2 rounded"
//         >
//           {isPlaying ? 'Pause ⏸️' : 'Play ▶️'}
//           <br />
//           <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
//         </button>
//         <button onClick={handleForward} className="bg-gray-500 text-white px-2 py-1 rounded">+10s ⏩</button>
//       </div>
//     </div>
//   );
// };

// export default GlobalAudioPlayer;












// import React, { useEffect, useState } from 'react';
// import { useAudio } from '../AudioContext';
// import axios from 'axios';
// import BASE_URL from '../../Config';

// const GlobalAudioPlayer = () => {
//   const { audioRef, isPlaying, playAudio, bookName } = useAudio();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [audioProgress, setAudioProgress] = useState(0); // To store fetched progress from the server
//   const [lastSentPercent, setLastSentPercent] = useState(0);

//   // Fetch user ID and Book ID from localStorage
//   const userId = JSON.parse(localStorage.getItem('userdata'))?.id || '';
//   const currentBookId = localStorage.getItem('currentBookId'); // Assuming currentBookId is stored in localStorage

//   useEffect(() => {
//     if (!audioRef.current) return;

//     const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
//     const setAudioDuration = () => setDuration(audioRef.current?.duration || 0);

//     audioRef.current.addEventListener('timeupdate', updateTime);
//     audioRef.current.addEventListener('loadedmetadata', setAudioDuration);

//     return () => {
//       if (!audioRef.current) return;
//       audioRef.current.removeEventListener('timeupdate', updateTime);
//       audioRef.current.removeEventListener('loadedmetadata', setAudioDuration);
//     };
//   }, [audioRef.current]);

//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00'; // Handle NaN case
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleForward = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
//     }
//   };

//   const handleRewind = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
//     }
//   };

//   const saveProgressToBackend = (currentTime, duration) => {
//     const percentComplete = ((currentTime / duration) * 100).toFixed(2);

//     // Send API request only if progress crosses 50% or 90% and hasn't been sent before
//     if (percentComplete >= 80 && percentComplete < 90 && lastSentPercent < 80) {
//       // Send POST request when progress is 80% or more
//       axios.post(`${BASE_URL}/adioprogress`, {
//         user_id: userId,
//         book_id: currentBookId, // Using currentBookId as the Book ID
//         progress: percentComplete,
//       }).then(() => {
//         // After successful POST, fetch progress and store it in localStorage
//         fetchAudioProgress();
//       });
//       setLastSentPercent(percentComplete); // Update the last sent percentage
//     } else if (percentComplete >= 90 && lastSentPercent < 90) {
//       // Send POST request when progress reaches 90% or more
//       axios.post(`${BASE_URL}/adioprogress`, {
//         user_id: userId,
//         book_id: currentBookId, // Using currentBookId as the Book ID
//         progress: percentComplete,
//       }).then(() => {
//         // After successful POST, fetch progress and store it in localStorage
//         fetchAudioProgress();
//       });
//       setLastSentPercent(percentComplete); // Update the last sent percentage
//     }
//   };

//   // Function to fetch the audio progress from backend after posting progress
//   const fetchAudioProgress = () => {
//     axios.get(`${BASE_URL}/getAudioProgress`, {
//       params: { user_id: userId, book_id: currentBookId }
//     })
//       .then((response) => {
//         const audioData = {
//           bookId: currentBookId,
//           progress: response.data?.data?.progress || 0, // If progress is available, set it; else default to 0
//         };
//         if (response.data?.data?.status === 'complete') {
//           setAudioProgress(100); // 100% if completed
//           // Save the audioData object in localStorage
//           localStorage.setItem('audioProgress', JSON.stringify(audioData));
//         } else if (response.data?.data?.progress) {
//           setAudioProgress(response.data?.data?.progress); // Set the fetched progress
//           // Save the audioData object in localStorage
//           localStorage.setItem('audioProgress', JSON.stringify(audioData));
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching audio progress:", error);
//       });
//   };


//   useEffect(() => {
//     if (!audioRef.current) return;

//     const trackListeningTime = () => {
//       setInterval(() => {
//         saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
//       }, 10000); // Check progress every 10 seconds
//     };

//     const handlePlay = () => {
//       trackListeningTime();
//     };

//     const handlePause = () => {
//       saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
//     };

//     const handleEnded = () => {
//       saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
//     };

//     audioRef.current.addEventListener('play', handlePlay);
//     audioRef.current.addEventListener('pause', handlePause);
//     audioRef.current.addEventListener('ended', handleEnded);

//     return () => {
//       audioRef.current.removeEventListener('play', handlePlay);
//       audioRef.current.removeEventListener('pause', handlePause);
//       audioRef.current.removeEventListener('ended', handleEnded);
//     };
//   }, [audioRef.current]);

//   if (!audioRef.current?.src) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 shadow-xl" style={{ zIndex: '1050' }}>
//       <div className="flex justify-between items-center">
//         <span className="font-semibold text-center w-full">{bookName}</span>
//       </div>

//       <div className="flex items-center gap-4 justify-center mt-2">
//         <button onClick={handleRewind} className="bg-gray-500 text-white px-2 py-1 rounded">⏪ -10s</button>
//         <button
//           onClick={() => playAudio(audioRef.current.src, bookName)}
//           className="bg-amber-400 text-black px-3 py-2 rounded"
//         >
//           {isPlaying ? 'Pause ⏸️' : 'Play ▶️'}
//           <br />
//           <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
//         </button>
//         <button onClick={handleForward} className="bg-gray-500 text-white px-2 py-1 rounded">+10s ⏩</button>
//       </div>
//     </div>
//   );
// };

// export default GlobalAudioPlayer;














import React, { useEffect, useState } from 'react';
import { useAudio } from '../AudioContext';
import axios from 'axios';
import BASE_URL from '../../Config';

const GlobalAudioPlayer = () => {
  const { audioRef, isPlaying, playAudio, bookName } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0); // To store fetched progress from the server
  const [lastSentPercent, setLastSentPercent] = useState(0);

  // Fetch user ID and Book ID from localStorage
  const userId = JSON.parse(localStorage.getItem('userdata'))?.id || '';
  const currentBookId = localStorage.getItem('currentBookId'); // Assuming currentBookId is stored in localStorage

  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
    const setAudioDuration = () => setDuration(audioRef.current?.duration || 0);

    audioRef.current.addEventListener('timeupdate', updateTime);
    audioRef.current.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener('timeupdate', updateTime);
      audioRef.current.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, [audioRef.current]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'; // Handle NaN case
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const saveProgressToBackend = (currentTime, duration) => {
    const percentComplete = ((currentTime / duration) * 100).toFixed(2);

    // Send API request only if progress crosses 50% or 90% and hasn't been sent before
    if (percentComplete >= 80 && percentComplete < 90 && lastSentPercent < 80) {
      // Send POST request when progress is 80% or more
      axios.post(`${BASE_URL}/adioprogress`, {
        user_id: userId,
        book_id: currentBookId, // Using currentBookId as the Book ID
        progress: percentComplete,
      }).then(() => {
        // After successful POST, fetch progress and store it in localStorage
        fetchAudioProgress();
      });
      setLastSentPercent(percentComplete); // Update the last sent percentage
    } else if (percentComplete >= 90 && lastSentPercent < 90) {
      // Send POST request when progress reaches 90% or more
      axios.post(`${BASE_URL}/adioprogress`, {
        user_id: userId,
        book_id: currentBookId, // Using currentBookId as the Book ID
        progress: percentComplete,
      }).then(() => {
        // After successful POST, fetch progress and store it in localStorage
        fetchAudioProgress();
      });
      setLastSentPercent(percentComplete); // Update the last sent percentage
    }
  };

  // Function to fetch the audio progress from backend after posting progress
  const fetchAudioProgress = () => {
    axios.get(`${BASE_URL}/getAudioProgress`, {
      params: { user_id: userId, book_id: currentBookId }
    })
      .then((response) => {
        const audioData = {
          bookId: currentBookId,
          progress: response.data?.data?.progress || 0, // If progress is available, set it; else default to 0
        };
        if (response.data?.data?.status === 'complete') {
          setAudioProgress(100); // 100% if completed
          // Save the audioData object in localStorage
          localStorage.setItem('audioProgress', JSON.stringify(audioData));
        } else if (response.data?.data?.progress) {
          setAudioProgress(response.data?.data?.progress); // Set the fetched progress
          // Save the audioData object in localStorage
          localStorage.setItem('audioProgress', JSON.stringify(audioData));
        }
      })
      .catch((error) => {
        console.error("Error fetching audio progress:", error);
      });
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const trackListeningTime = () => {
      const intervalId = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
        }
      }, 10000); // Check progress every 10 seconds

      return intervalId; // Return the interval ID to clear later
    };

    const handlePlay = () => {
      trackListeningTime();
    };

    const handlePause = () => {
      saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
    };

    const handleEnded = () => {
      saveProgressToBackend(audioRef.current.currentTime, audioRef.current.duration);
      // Prevent further API calls once the audio ends
      clearInterval(trackListeningTime());
    };

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current.removeEventListener('play', handlePlay);
      audioRef.current.removeEventListener('pause', handlePause);
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, [audioRef.current]);

  if (!audioRef.current?.src) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 shadow-xl" style={{ zIndex: '1050' }}>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-center w-full">{bookName}</span>
      </div>

      <div className="flex items-center gap-4 justify-center mt-2">
        <button onClick={handleRewind} className="bg-gray-500 text-white px-2 py-1 rounded">⏪ -10s</button>
        <button
          onClick={() => playAudio(audioRef.current.src, bookName)}
          className="bg-amber-400 text-black px-3 py-2 rounded"
        >
          {isPlaying ? 'Pause ⏸️' : 'Play ▶️'}
          <br />
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </button>
        <button onClick={handleForward} className="bg-gray-500 text-white px-2 py-1 rounded">+10s ⏩</button>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;

