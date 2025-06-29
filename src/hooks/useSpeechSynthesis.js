import { useRef, useCallback, useEffect } from 'react';
    import { speakText as speakTextUtil } from '@/lib/speechUtils';

    export const useSpeechSynthesis = () => {
      const audioQueue = useRef([]);
      const isSpeakingRef = useRef(false);
      const currentSpeechTimeoutRef = useRef(null);

      const processAudioQueue = useCallback(() => {
        if (isSpeakingRef.current || audioQueue.current.length === 0) {
          return;
        }
        isSpeakingRef.current = true;
        const { text, lang, onEnd } = audioQueue.current.shift();
        
        if (currentSpeechTimeoutRef.current) clearTimeout(currentSpeechTimeoutRef.current);

        speakTextUtil(text, lang, () => {
          isSpeakingRef.current = false;
          if (onEnd) onEnd();
          processAudioQueue();
        });
      }, []);

      const addToQueue = useCallback((text, lang, onEnd) => {
        audioQueue.current.push({ text, lang, onEnd });
        processAudioQueue();
      }, [processAudioQueue]);

      const stopSpeech = useCallback(() => {
        if (currentSpeechTimeoutRef.current) clearTimeout(currentSpeechTimeoutRef.current);
        speechSynthesis.cancel();
        audioQueue.current = [];
        isSpeakingRef.current = false;
      }, []);

      useEffect(() => {
        return () => {
          stopSpeech();
        };
      }, [stopSpeech]);

      return { addToQueue, stopSpeech, isSpeaking: isSpeakingRef.current };
    };