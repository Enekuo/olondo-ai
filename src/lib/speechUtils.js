export const Language = {
        Spanish: 'es-ES',
        English: 'en-US',
        GoogleUSEnglish: 'Google US English', 
        Unknown: 'es-ES' 
    };

    export const detectLanguage = (text) => {
        if (!text || typeof text !== 'string') return Language.Unknown;
        const normalizedText = text.toLowerCase().trim();

        if (/[ñáéíóúü¡¿]/.test(normalizedText)) return Language.Spanish;
        if (/\b(th|sh|ch|ph|wh|kn|wr|ea|oo|ee|ai|ay|oi|oy|ou|ow)\w*\b/.test(normalizedText) && !/[ñáéíóúü¡¿]/.test(normalizedText)) return Language.English;
        
        const commonSpanishWords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'que', 'y', 'a', 'en', 'ser', 'se', 'no', 'haber', 'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo', 'todo', 'pero', 'mas', 'más', 'hacer', 'o', 'poder', 'decir', 'este', 'ir', 'otro', 'ese', 'si', 'sí', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando', 'muy', 'sin', 'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno', 'mismo', 'yo', 'también', 'hasta', 'año', 'dos', 'querer', 'entre', 'así', 'primero', 'desde', 'grande', 'eso', 'ni', 'nos', 'ejemplo', 'uno', 'bien', 'nuestro', 'nuevo', 'ahora'];
        const commonEnglishWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were'];
        
        let spanishScore = 0;
        let englishScore = 0;

        const words = normalizedText.replace(/[.,!?]/g, '').split(/\s+/);

        words.forEach(word => {
            if (commonSpanishWords.includes(word)) spanishScore++;
            if (commonEnglishWords.includes(word)) englishScore++;
        });
        
        if (spanishScore > englishScore) {
             if (/[ñáéíóúü¡¿]/.test(normalizedText) && spanishScore >= englishScore * 0.8) return Language.Spanish;
        }
        if (englishScore > spanishScore) {
            if (!/[ñáéíóúü¡¿]/.test(normalizedText) && englishScore >= spanishScore * 0.8) return Language.English;
        }


        if (spanishScore > englishScore) return Language.Spanish;
        if (englishScore > spanishScore) return Language.English;
        
        if (words.some(w => w.endsWith('ción') || w.endsWith('dad') || w.endsWith('mente') || w.endsWith('ando') || w.endsWith('iendo'))) return Language.Spanish;
        if (words.some(w => w.endsWith('ing') || w.endsWith('tion') || w.endsWith('ed') || w.endsWith('ly') || w.endsWith('ment'))) return Language.English;

        return Language.Unknown;
    };

    export const parseTextToList = (text) => {
      const lines = text.split(/\r?\n/);
      const pairs = lines
        .map(line => {
          const separatorRegex = /[\/\-\–—―‐]/; 
          const parts = line.split(separatorRegex);
          if (parts.length >= 2) {
            const word = parts[0].trim();
            const translation = parts.slice(1).join(line.match(separatorRegex)?.[0] || '-').trim();
            if (word && translation) {
              return { word, translation, langWord: Language.Spanish, langTranslation: Language.GoogleUSEnglish };
            }
          }
          return null;
        })
        .filter(pair => pair !== null);
      return pairs;
    };

    export const speakText = (text, lang = Language.Spanish, onEndCallback) => {
      if ('speechSynthesis' in window && text && text.trim() !== '') {
        
        const voices = speechSynthesis.getVoices();
        let selectedVoice;

        if (lang === Language.GoogleUSEnglish) {
            selectedVoice = voices.find(voice => voice.name === Language.GoogleUSEnglish);
            if (!selectedVoice) { 
                selectedVoice = voices.find(voice => voice.lang === 'en-US' && voice.localService);
            }
            if (!selectedVoice) { 
                selectedVoice = voices.find(voice => voice.lang === 'en-US');
            }
             if (!selectedVoice) { 
                selectedVoice = voices.find(voice => voice.lang.startsWith('en-'));
            }
        } else if (lang === Language.English) {
            selectedVoice = voices.find(voice => voice.lang === 'en-US' && voice.localService) || 
                            voices.find(voice => voice.lang === 'en-US') ||
                            voices.find(voice => voice.lang.startsWith('en-')) || 
                            voices.find(voice => voice.lang === 'en-GB');
        } else if (lang === Language.Spanish) { 
            selectedVoice = voices.find(voice => voice.lang === 'es-ES' && voice.localService) ||
                            voices.find(voice => voice.lang === 'es-ES') ||
                            voices.find(voice => voice.lang.startsWith('es-')) || 
                            voices.find(voice => voice.lang === 'es-MX');
        } else {
            selectedVoice = voices.find(voice => voice.lang === lang);
            if (!selectedVoice) {
                const langPrefix = lang.split('-')[0];
                selectedVoice = voices.find(voice => voice.lang.startsWith(langPrefix));
            }
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedVoice ? selectedVoice.lang : lang; 
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        utterance.pitch = 1;
        utterance.rate = (lang === Language.English || lang === Language.GoogleUSEnglish) ? 0.8 : 0.9; 
        utterance.volume = (lang === Language.English || lang === Language.GoogleUSEnglish) ? 0.7 : 1;


        let hasEnded = false; 
        utterance.onend = () => {
          if (!hasEnded) {
            hasEnded = true;
            if (onEndCallback) onEndCallback();
          }
        };
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          if (!hasEnded) { 
            hasEnded = true;
            if (onEndCallback) onEndCallback();
          }
        };
        
        speechSynthesis.speak(utterance);
      } else {
        if (onEndCallback) onEndCallback(); 
      }
    };