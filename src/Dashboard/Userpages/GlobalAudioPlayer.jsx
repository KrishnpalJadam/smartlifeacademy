import React, { useEffect, useState } from 'react';
import { useAudio } from '../AudioContext';

const GlobalAudioPlayer = () => {
  const { audioRef, isPlaying, playAudio, bookName } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility

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
  }, [audioRef.current]); // Ensuring the effect updates when the ref changes

  if (!audioRef.current?.src || !isVisible) return null; // Hide player when closed or no audio

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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-3 shadow-xl" style={{ zIndex: "1050" }}>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-center w-full">{bookName}</span>
        {/* Close button */}
        {/* <button onClick={() => setIsVisible(false)} className="text-white text-lg font-bold mr-2">✖</button> */}
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
