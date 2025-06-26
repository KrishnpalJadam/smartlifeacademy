import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,tr',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          'google_translate_element'
        );
      } else {
        // Retry after a short delay
        setTimeout(initGoogleTranslate, 100);
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    const addTranslateScript = () => {
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Add script if not already added
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      addTranslateScript();
    } else {
      initGoogleTranslate(); // already added
    }
  }, []);

  return (
    <div style={styles.container}>
      <div id="google_translate_element"></div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backgroundColor: '#fff',
    padding: '4px 8px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }
};

export default GoogleTranslate;
