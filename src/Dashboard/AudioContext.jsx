import React, { createContext, useState, useContext, useRef } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [bookName, setBookName] = useState('');

  const playAudio = (src, name) => {
    if (currentSrc !== src) {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentSrc(src);
      setBookName(name);
      setIsPlaying(true);
    } else if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        playAudio,
        bookName,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
