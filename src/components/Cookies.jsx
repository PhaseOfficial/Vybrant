import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-2 z-50">
      <p className="text-sm sm:text-base">
        We use cookies to improve your experience. By continuing, you accept our cookie policy.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
