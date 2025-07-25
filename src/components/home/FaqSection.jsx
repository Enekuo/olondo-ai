
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqContent = {
  es: {
    title: "Preguntas Frecuentes",
    subtitle: "Aquí respondemos las dudas más comunes de nuestros usuarios. Esta sección se actualiza constantemente para ayudarte mejor.",
    items: [
      {
        q: "🧠 ¿Qué es Olondo AI?",
        a: "Olondo AI es una plataforma de inteligencia artificial que te permite crear textos completos o generar resúmenes a partir de contenido que tú proporcionas: ideas base, texto copiado, enlaces web o archivos PDF.\nAdemás de generar contenido, el objetivo principal de Olondo AI es que puedas escucharlo en voz alta, ya sea con voz sintética integrada o con tu propia voz grabada."
      },
      {
        q: "✍ ¿Cómo funciona la herramienta de creación de texto?",
        a: "Solo tienes que:\n\nEscribir una idea base o subir un documento.\nElegir el tipo de texto que deseas generar (artículo, publicación, historia...).\nPulsar en \"Generar Texto\".\nLa IA se encargará del resto y te entregará un texto completo y coherente en segundos."
      },
      {
        q: "📝 ¿Y cómo funciona la herramienta de resumen?",
        a: "Pega el contenido que quieras resumir, o sube un archivo. Puedes elegir el nivel de detalle (breve, medio, extenso), y en pocos segundos recibirás un resumen claro, directo y listo para usar."
      },
      {
        q: "📂 ¿Qué tipos de contenido puedo usar?",
        a: "Puedes trabajar con:\n\nArchivos PDF\nDocumentos Word o TXT\nTexto copiado\nEnlaces web"
      },
      {
        q: "🌍 ¿En qué idiomas está disponible?",
        a: "Puedes generar textos o resúmenes en el idioma que tú elijas desde el menú superior. Actualmente se incluyen opciones como español, inglés, francés, italiano, portugués, alemán, entre otros."
      },
      {
        q: "🧾 ¿Puedo elegir el estilo del texto generado?",
        a: "Sí. Puedes seleccionar el tipo de contenido que quieres:\n\nArtículo informativo\nRedacción creativa\nPublicación para redes sociales\nHistoria narrativa\nTexto académico\nOtros…"
      },
      {
        q: "🔒 ¿Qué tan segura es mi información?",
        a: "La privacidad es clave. Todos los datos se cifran durante el proceso y se eliminan automáticamente después. Los planes Pro incluirán capas de seguridad adicionales para quienes lo necesiten."
      },
      {
        q: "📤 ¿Puedo descargar o compartir los resultados?",
        a: "Sí. Puedes:\n\nDescargar el contenido como .txt, .pdf o .docx\nCopiarlo directamente\nCompartirlo en redes sociales (próximamente)"
      },
      {
        q: "👤 ¿Sigo siendo dueño de lo que creo?",
        a: "Por supuesto. Todo lo que subas y todo lo que se genere te pertenece. No almacenamos ni usamos tu contenido."
      },
      {
        q: "💬 ¿Cómo puedo dar mi opinión o reportar un problema?",
        a: "Puedes contactarnos escribiendo a:\n📩 olondoweb@gmail.com"
      }
    ]
  },
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Here we answer the most common questions from our users. This section is constantly updated to better help you.",
    items: [
      {
        q: "🧠 What is Olondo AI?",
        a: "Olondo AI is an artificial intelligence platform that allows you to create full-length texts or generate summaries based on content you provide: base ideas, copied text, web links, or PDF files.\nIn addition to generating content, the main goal of Olondo AI is that you can listen to it aloud, either with integrated synthetic voice or with your own recorded voice."
      },
      {
        q: "✍ How does the text creation tool work?",
        a: "Just follow these steps:\n\nWrite a base idea or upload a document.\nChoose the type of text you want to generate (article, post, story...).\nClick on \"Generate Text\".\nThe AI will do the rest and deliver a complete and coherent text in seconds."
      },
      {
        q: "📝 And how does the summarization tool work?",
        a: "Paste the content you want to summarize, or upload a file. You can choose the summary length (short, medium, or detailed), and in just a few seconds, you'll get a clear, direct, and ready-to-use summary."
      },
      {
        q: "📂 What types of content can I use?",
        a: "You can work with:\n\nPDF files\nWord or TXT documents\nCopied text\nWeb links"
      },
      {
        q: "🌍 What languages are available?",
        a: "You can generate texts or summaries in the language of your choice from the top menu. Current options include Spanish, English, French, Italian, Portuguese, German, and more."
      },
      {
        q: "🧾 Can I choose the style of the generated text?",
        a: "Yes. You can select the type of content you want:\n\nInformative article\nCreative writing\nSocial media post\nNarrative story\nAcademic text\nOthers..."
      },
      {
        q: "🔒 How secure is my information?",
        a: "Privacy is key. All data is encrypted during the process and automatically deleted afterward. Pro plans will include additional layers of security for those who need them."
      },
      {
        q: "📤 Can I download or share the results?",
        a: "Yes. You can:\n\nDownload the content as .txt, .pdf, or .docx\nCopy it directly\nShare it on social media (coming soon)"
      },
      {
        q: "👤 Do I keep ownership of what I create?",
        a: "Absolutely. Everything you upload and everything generated belongs to you. We don't store or use your content."
      },
      {
        q: "💬 How can I give feedback or report a problem?",
        a: "You can contact us by writing to:\n📩 olondoweb@gmail.com"
      }
    ]
  },
  it: {
    title: "Domande Frequenti",
    subtitle: "Qui rispondiamo alle domande più comuni dei nostri utenti. Questa sezione viene aggiornata costantemente per aiutarti al meglio.",
    items: [
      {
        q: "🧠 Cos'è Olondo AI?",
        a: "Olondo AI è una piattaforma di intelligenza artificiale che ti permette di creare testi completi o generare riassunti a partire da contenuti forniti da te: idee base, testo copiato, link web o file PDF. Oltre a generare contenuti, l'obiettivo principale di Olondo AI è quello di farti ascoltare il testo ad alta voce, tramite voce sintetica integrata o anche con la tua voce registrata."
      },
      {
        q: "✍ Come funziona lo strumento di creazione testi?",
        a: "Segui questi passaggi:\n\nScrivi un'idea base o carica un documento.\nScegli il tipo di testo che vuoi generare (articolo, post, storia…).\nClicca su \"Genera Testo\".\nL'intelligenza artificiale farà il resto e ti fornirà un testo completo e coerente in pochi secondi."
      },
      {
        q: "📝 E come funziona lo strumento di riassunto?",
        a: "Incolla il contenuto che vuoi riassumere o carica un file. Puoi scegliere il livello di dettaglio (breve, medio, dettagliato), e in pochi secondi otterrai un riassunto chiaro, diretto e pronto all'uso."
      },
      {
        q: "📂 Che tipo di contenuti posso usare?",
        a: "Puoi lavorare con:\n\nFile PDF\nDocumenti Word o TXT\nTesto copiato\nLink a siti web"
      },
      {
        q: "🌍 In quali lingue è disponibile?",
        a: "Puoi generare testi o riassunti nella lingua che preferisci, selezionandola dal menu in alto. Le opzioni attuali includono spagnolo, inglese, francese, italiano, portoghese, tedesco e altre."
      },
      {
        q: "🧾 Posso scegliere lo stile del testo generato?",
        a: "Sì. Puoi selezionare il tipo di contenuto che desideri:\n\nArticolo informativo\nScrittura creativa\nPost per social media\nStoria narrativa\nTesto accademico\nAltro…"
      },
      {
        q: "🔒 I miei dati sono al sicuro?",
        a: "La privacy è fondamentale. Tutti i dati vengono crittografati durante il processo e cancellati automaticamente subito dopo. I piani Pro includeranno ulteriori misure di sicurezza."
      },
      {
        q: "📤 Posso scaricare o condividere i risultati?",
        a: "Sì. Puoi:\n\nScaricare il contenuto in formato .txt, .pdf o .docx\nCopiarlo direttamente\nCondividerlo sui social media (presto disponibile)"
      },
      {
        q: "👤 Conservo i diritti su ciò che creo?",
        a: "Assolutamente sì. Tutto ciò che carichi e tutto ciò che viene generato ti appartiene. Non conserviamo né utilizziamo i tuoi contenuti."
      },
      {
        q: "💬 Come posso inviare un feedback o segnalare un problema?",
        a: "Puoi contattarci scrivendo a:\n📩 olondoweb@gmail.com"
      }
    ]
  },
  fr: {
    title: "Questions Fréquentes",
    subtitle: "Nous répondons ici aux questions les plus fréquentes de nos utilisateurs. Cette section est constamment mise à jour pour mieux vous aider.",
    items: [
      {
        q: "🧠 Qu'est-ce qu'Olondo AI ?",
        a: "Olondo AI est une plateforme d'intelligence artificielle qui vous permet de créer des textes complets ou de générer des résumés à partir de contenu que vous fournissez : idées de base, texte copié, liens web ou fichiers PDF. En plus de générer du contenu, l'objectif principal d'Olondo AI est que vous puissiez l'écouter à voix haute, soit avec une voix synthétique intégrée, soit avec votre propre voix enregistrée."
      },
      {
        q: "✍ Comment fonctionne l'outil de création de texte ?",
        a: "Il vous suffit de :\n\nÉcrire une idée de base ou téléverser un document\nChoisir le type de texte à générer (article, publication, histoire…)\nCliquer sur \"Générer le texte\".\nL'IA se charge du reste et vous livre un texte complet et cohérent en quelques secondes."
      },
      {
        q: "📝 Et comment fonctionne l'outil de résumé ?",
        a: "Collez le contenu que vous souhaitez résumer ou téléversez un fichier. Vous pouvez choisir le niveau de détail (court, moyen, détaillé), et vous recevrez un résumé clair, direct et prêt à l'emploi en quelques secondes."
      },
      {
        q: "📂 Quels types de contenu puis-je utiliser ?",
        a: "Vous pouvez travailler avec:\n\nFichiers PDF\nDocuments Word ou TXT\nTexte copié\nLiens web"
      },
      {
        q: "🌍 Quelles langues sont disponibles ?",
        a: "Vous pouvez générer des textes ou des résumés dans la langue de votre choix depuis le menu supérieur. Les options actuelles incluent l'espagnol, l'anglais, le français, l'italien, le portugais, l'allemand, etc."
      },
      {
        q: "🧾 Puis-je choisir le style du texte généré ?",
        a: "Oui. Vous pouvez sélectionner le type de contenu souhaité :\n\nArticle informatif\nÉcriture créative\nPublication pour les réseaux sociaux\nHistoire narrative\nTexte académique\nAutres…"
      },
      {
        q: "🔒 Mes données sont-elles en sécurité ?",
        a: "La confidentialité est essentielle. Toutes les données sont cryptées pendant le traitement et supprimées automatiquement après. Les plans Pro incluent des mesures de sécurité supplémentaires."
      },
      {
        q: "📤 Puis-je télécharger ou partager les résultats ?",
        a: "Oui. Vous pouvez :\n\nTélécharger le contenu en .txt, .pdf ou .docx\nLe copier directement\nLe partager sur les réseaux sociaux (bientôt disponible)"
      },
      {
        q: "👤 Est-ce que je conserve les droits sur mon contenu ?",
        a: "Absolument. Tout ce que vous téléversez et tout ce qui est généré vous appartient. Nous ne stockons ni n'utilisons votre contenu."
      },
      {
        q: "💬 Comment puis-je donner mon avis ou signaler un problème ?",
        a: "Vous pouvez nous contacter par e-mail à :\n📩 olondoweb@gmail.com"
      }
    ]
  },
  pt: {
    title: "Perguntas Frequentes",
    subtitle: "Aqui respondemos às perguntas mais comuns dos nossos utilizadores. Esta secção é atualizada constantemente para ajudar melhor.",
    items: [
      {
        q: "🧠 O que é o Olondo AI?",
        a: "O Olondo AI é uma plataforma de inteligência artificial que permite criar textos completos ou gerar resumos a partir de conteúdo fornecido por ti: ideias base, texto copiado, links web ou ficheiros PDF.\n\nAlém de gerar conteúdo, o principal objetivo do Olondo AI é que possas ouvi-lo em voz alta, seja com voz sintética integrada ou com a tua própria voz gravada."
      },
      {
        q: "✍ Como funciona a ferramenta de criação de texto?",
        a: "Basta seguir estes passos:\n\nEscreve uma ideia base ou carrega um documento.\n\nEscolhe o tipo de texto que queres gerar (artigo, publicação, história...).\n\nClica em \"Gerar Texto\".\n\nA IA fará o resto e entregará um texto completo e coerente em segundos."
      },
      {
        q: "📝 E como funciona a ferramenta de resumo?",
        a: "Cola o conteúdo que queres resumir ou carrega um ficheiro.\nPodes escolher o comprimento do resumo (curto, médio ou detalhado) e, em poucos segundos, obterás um resumo claro, direto e pronto para usar."
      },
      {
        q: "📂 Que tipos de conteúdo posso usar?",
        a: "Podes trabalhar com:\n\nFicheiros PDF\n\nDocumentos Word ou TXT\n\nTexto copiado\n\nLinks web"
      },
      {
        q: "🌍 Que idiomas estão disponíveis?",
        a: "Podes gerar textos ou resumos no idioma da tua escolha a partir do menu superior.\nAs opções atuais incluem Espanhol, Inglês, Francês, Italiano, Português, Alemão e mais."
      },
      {
        q: "🧾 Posso escolher o estilo do texto gerado?",
        a: "Sim. Podes selecionar o tipo de conteúdo que desejas:\n\nArtigo informativo\n\nEscrita criativa\n\nPublicação para redes sociais\n\nHistória narrativa\n\nTexto académico\n\nOutros..."
      },
      {
        q: "🔒 Quão segura está a minha informação?",
        a: "A privacidade é essencial. Todos os dados são encriptados durante o processo e eliminados automaticamente depois.\nOs planos Pro incluirão camadas adicionais de segurança para quem precisar."
      },
      {
        q: "📤 Posso descarregar ou partilhar os resultados?",
        a: "Sim. Podes:\n\nDescarregar o conteúdo como .txt, .pdf ou .docx\n\nCopiá-lo diretamente\n\nPartilhá-lo nas redes sociais (em breve)"
      },
      {
        q: "👤 Fico com a propriedade do que crio?",
        a: "Completamente. Tudo o que carregas e tudo o que é gerado pertence-te.\nNão armazenamos nem utilizamos o teu conteúdo."
      },
      {
        q: "💬 Como posso enviar feedback ou reportar um problema?",
        a: "Podes contactar-nos escrevendo para:\n📩 olondoweb@gmail.com"
      }
    ]
  },
  de: {
    title: "Häufig gestellte Fragen",
    subtitle: "Hier beantworten wir die häufigsten Fragen unserer Nutzer. Dieser Bereich wird regelmäßig aktualisiert, um dir besser helfen zu können.",
    items: [
      {
        q: "🧠 Was ist Olondo AI?",
        a: "Olondo AI ist eine Plattform für künstliche Intelligenz, mit der du vollständige Texte erstellen oder Zusammenfassungen aus deinem bereitgestellten Inhalt generieren kannst: Grundideen, kopierter Text, Weblinks oder PDF-Dateien.\n\nNeben der Inhaltserstellung ist das Hauptziel von Olondo AI, dass du dir den Text laut anhören kannst – entweder mit einer integrierten synthetischen Stimme oder mit deiner eigenen aufgenommenen Stimme."
      },
      {
        q: "✍ Wie funktioniert das Textgenerierungstool?",
        a: "Einfach folgende Schritte ausführen:\n\nSchreibe eine Grundidee oder lade ein Dokument hoch.\n\nWähle die Art des gewünschten Textes (Artikel, Beitrag, Geschichte...).\n\nKlicke auf \"Text generieren\".\n\nDie KI erledigt den Rest und liefert dir in wenigen Sekunden einen vollständigen und kohärenten Text."
      },
      {
        q: "📝 Und wie funktioniert das Zusammenfassungstool?",
        a: "Füge den Inhalt ein, den du zusammenfassen möchtest, oder lade eine Datei hoch.\nDu kannst die Länge der Zusammenfassung wählen (kurz, mittel oder ausführlich), und in wenigen Sekunden erhältst du eine klare, direkte und einsatzbereite Zusammenfassung."
      },
      {
        q: "📂 Welche Arten von Inhalten kann ich verwenden?",
        a: "Du kannst arbeiten mit:\n\nPDF-Dateien\n\nWord- oder TXT-Dokumenten\n\nKopiertem Text\n\nWeblinks"
      },
      {
        q: "🌍 Welche Sprachen sind verfügbar?",
        a: "Du kannst Texte oder Zusammenfassungen in der Sprache deiner Wahl über das obere Menü generieren.\nDerzeit verfügbare Sprachen: Spanisch, Englisch, Französisch, Italienisch, Portugiesisch, Deutsch und weitere."
      },
      {
        q: "🧾 Kann ich den Stil des generierten Textes wählen?",
        a: "Ja. Du kannst den gewünschten Inhaltstyp auswählen:\n\nInformationsartikel\n\nKreatives Schreiben\n\nSocial-Media-Beitrag\n\nErzählgeschichte\n\nWissenschaftlicher Text\n\nAndere..."
      },
      {
        q: "🔒 Wie sicher sind meine Informationen?",
        a: "Datenschutz steht an erster Stelle. Alle Daten werden während des Prozesses verschlüsselt und danach automatisch gelöscht.\nPro-Pläne bieten zusätzliche Sicherheitsebenen für Nutzer mit höheren Anforderungen."
      },
      {
        q: "📤 Kann ich die Ergebnisse herunterladen oder teilen?",
        a: "Ja. Du kannst:\n\nDen Inhalt als .txt, .pdf oder .docx herunterladen\n\nIhn direkt kopieren\n\nIhn in sozialen Netzwerken teilen (demnächst verfügbar)"
      },
      {
        q: "👤 Behalte ich das Eigentum an dem, was ich erstelle?",
        a: "Auf jeden Fall. Alles, was du hochlädst oder generierst, gehört dir.\nWir speichern oder verwenden deinen Inhalt nicht."
      },
      {
        q: "💬 Wie kann ich Feedback geben oder ein Problem melden?",
        a: "Du kannst uns schreiben an:\n📩 olondoweb@gmail.com"
      }
    ]
  }
};


const FaqSection = () => {
  const { language } = useLanguage();
  const content = faqContent[language] || faqContent.en;

  const renderAnswer = (answerText) => {
    const email = "olondoweb@gmail.com";
    return answerText.split('\n').map((line, index) => {
      if (line.trim() === '') return null;
      if (line.includes(email)) {
        const parts = line.split(email);
        return (
          <p key={index} className="text-slate-600 dark:text-slate-300">
            {parts[0]}
            <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
            {parts[1]}
          </p>
        );
      }
      return <p key={index} className="text-slate-600 dark:text-slate-300">{line}</p>;
    }).filter(Boolean);
  };

  return (
    <section className="w-full py-32 bg-[#eef4ff] dark:bg-sky-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {content.items.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-base">
                    {renderAnswer(item.a)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;