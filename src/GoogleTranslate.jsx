import React, { useEffect, useState } from 'react';

const GoogleTranslate = () => {
  const [showTranslate, setShowTranslate] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded) {
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = () => setScriptLoaded(true); // Script loaded ho gaya
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        setScriptLoaded(true);
      };
    }
  }, []);

  useEffect(() => {
    if (showTranslate && scriptLoaded && window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de,ru,zh-CN,tr',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    }
  }, [showTranslate, scriptLoaded]);

  return (
    <div style={styles.wrapper}>
      <button onClick={() => setShowTranslate(!showTranslate)} style={styles.button}>
        🌐 Select Language
      </button>
      {showTranslate && <div id="google_translate_element" style={styles.dropdown}></div>}
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '9999',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: '2px solid white',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },
  dropdown: {
    marginTop: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }
};

export default GoogleTranslate;
