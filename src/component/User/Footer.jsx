import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Footer = () => {
  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  const togglePrivacy = () => {
    setPrivacyAccepted(!privacyAccepted);
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          {/* Privacy Choices */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-white">Your Privacy Choices</span>
              <button 
                onClick={togglePrivacy}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 transition-colors px-2 py-1 rounded"
              >
                {privacyAccepted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">|</span>
              <a 
                href="/privacy-policy" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="/terms-conditions" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                Terms and Conditions
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © 2025 adidas America, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
