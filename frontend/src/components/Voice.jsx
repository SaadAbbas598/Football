
import React, { useState, useRef, useEffect } from "react";
import { IoMicSharp } from "react-icons/io5"; // <-- mic icon

const VoiceRecorder = ({ onVoiceInput, isListening, setIsListening }) => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [onVoiceInput, setIsListening]);

  const toggleListening = () => {
    if (!isSupported) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-600 text-white"
      aria-label="Voice input"
    >
      <IoMicSharp className="w-5 h-5 text-white" />
    </button>
  );
};

export default VoiceRecorder;
