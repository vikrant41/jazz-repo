import React, { useState, useEffect, useRef } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Heart, Music, Gift, Sparkles, Play, Pause, Lightbulb, PartyPopper, Flame, Wind } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { toast } from '@/components/ui/use-toast';
    import { Toaster } from '@/components/ui/toaster';
    
    function App() {
      const [currentQuote, setCurrentQuote] = useState(0);
      const [showSurprise, setShowSurprise] = useState(false);
      const [isPlaying, setIsPlaying] = useState(false);
      const [lightsOn, setLightsOn] = useState(false);
      const [decorated, setDecorated] = useState(false);
      const [candleLit, setCandleLit] = useState(false);
      const [candleBlown, setCandleBlown] = useState(false);
      const audioRef = useRef(null);
    
      const quotes = [
        "You are not just the person I love. You are the reason I believe in love.",
        "With you, everything feels right. With you, I've found my forever.",
        "You've become the warmth in my world, the rhythm in my silence, and the peace in my chaos.",
        "I love you beyond words, beyond time, beyond this life.",
        "Today, I just want to make you smile — even a fraction of how much you've made me smile."
      ];
    
      const surpriseMessages = [
        "Jazz, you light up every room you enter! ✨",
        "Your laugh is my favorite sound in the universe! 🎵",
        "Every day with you feels like a celebration! 🎉",
        "You make ordinary moments extraordinary! 💫",
        "My heart skips a beat every time I see you! 💕"
      ];
    
      useEffect(() => {
        audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/02/14/audio_20b459a1a9.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
    
        const handleFirstInteraction = () => {
          if (audioRef.current.paused && isPlaying) {
            audioRef.current.play().catch(e => console.error("Audio play failed on interaction:", e));
          }
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        };
    
        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);
    
        return () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        };
      }, [isPlaying]);
    
      const toggleMusic = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          toast({
            title: "🎵 Music Paused",
            description: "The romantic vibes are on hold!",
          });
        } else {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            toast({
              title: "🎵 Music Playing",
              description: "Romantic melodies filling the air for Jazz! 💕",
            });
          }).catch(error => {
            console.error("Audio play failed:", error);
            setIsPlaying(false);
            toast({
              title: "Audio Error",
              description: "Click anywhere on the page first, then try playing music!",
              variant: "destructive",
            });
          });
        }
      };
    
      const nextQuote = () => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        toast({
          title: "💖 New Love Quote",
          description: "Another piece of Vikrant's heart for Jazz!",
        });
      };
    
      const showSurpriseGift = () => {
        setShowSurprise(true);
        const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        toast({
          title: "🎁 Special Surprise!",
          description: randomMessage,
          duration: 6000,
        });
      };
    
      const FloatingHearts = () => (
        <div className="floating-hearts">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="heart text-2xl">❤️</div>
          ))}
        </div>
      );
    
      const MusicNotes = () => (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="music-note text-xl" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%`, animationDelay: `${i * 0.5}s` }}>🎵</div>
          ))}
        </div>
      );
    
      const SparklesEffect = () => (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="sparkle text-lg" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>✨</div>
          ))}
        </div>
      );
    
      const Confetti = () => (
        <AnimatePresence>
          {decorated && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -100, rotate: 0 }}
                  animate={{ opacity: [1, 1, 0], y: '100vh', rotate: Math.random() * 720 }}
                  transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 1, ease: "linear" }}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * -50}%`,
                    fontSize: `${Math.random() * 1.5 + 0.5}rem`,
                    color: ['#ff6b9d', '#f8b500', '#a259ff', '#ffffff'][Math.floor(Math.random() * 4)]
                  }}
                >
                  ●
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      );
    
      return (
        <>
          <Helmet>
            <title>Happy Birthday Jazz! 💖 | A Love Letter from Vikrant</title>
            <meta name="description" content="A special birthday celebration page for Jazz, filled with love, music, and heartfelt messages from Vikrant." />
          </Helmet>
          
          <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${lightsOn ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600' : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'}`}>
            <FloatingHearts />
            <MusicNotes />
            <SparklesEffect />
            <Confetti />
            
            <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl mx-auto text-center space-y-8"
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h1 className="text-6xl md:text-8xl font-bold dancing-script gradient-text">
                    Happy Birthday Jazz! 🎉
                  </h1>
                  <div className="flex justify-center items-center space-x-4">
                    <Heart className="text-pink-400 w-8 h-8 animate-pulse" />
                    <p className="text-2xl md:text-3xl playfair text-pink-200">
                      A Love Letter from Vikrant
                    </p>
                    <Heart className="text-pink-400 w-8 h-8 animate-pulse" />
                  </div>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={toggleMusic}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 love-glow rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                    {isPlaying ? 'Pause Music' : 'Play Romantic Music'}
                    <Music className="w-6 h-6 ml-2" />
                  </Button>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="romantic-card rounded-3xl p-8 md:p-12 love-glow"
                >
                  <h2 className="text-4xl md:text-5xl playfair text-pink-300 mb-8">
                    A Letter to Jazz
                  </h2>
                  
                  <div className="space-y-6 text-lg md:text-xl leading-relaxed text-pink-100">
                    <p className="playfair text-2xl text-pink-200">My dearest Jazz,</p>
                    <p>Happy Birthday, my love.</p>
                    <p>Today isn't just about celebrating the day you were born — it's about celebrating every single moment that brought you into my life.</p>
                    <p>From the first time I heard your voice, to every smile, every glance, every laugh — you've become the warmth in my world, the rhythm in my silence, and the peace in my chaos.</p>
                    
                    <motion.div
                      key={currentQuote}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 my-8 border border-pink-300/30"
                    >
                      <p className="text-xl md:text-2xl playfair text-pink-200 italic">
                        "{quotes[currentQuote]}"
                      </p>
                    </motion.div>
                    
                    <p>I love you beyond words, beyond time, beyond this life.</p>
                    <p>And today, I just want to make you smile — even a fraction of how much you've made me smile.</p>
                    <p className="text-2xl playfair text-pink-200 mt-8">Happy Birthday, Jazz.</p>
                    <p className="text-xl">You are my heart, my soul, my everything.</p>
                    <p className="playfair text-2xl text-pink-300 mt-6">
                      Forever yours,<br />
                      Vikrant 💖
                    </p>
                  </div>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                  <Button
                    onClick={nextQuote}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 love-glow rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Heart className="w-6 h-6 mr-2" />
                    Next Love Quote
                    <Sparkles className="w-6 h-6 ml-2" />
                  </Button>
                  
                  <Button
                    onClick={showSurpriseGift}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 love-glow rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Gift className="w-6 h-6 mr-2" />
                    Special Surprise
                    <Heart className="w-6 h-6 ml-2" />
                  </Button>
                </motion.div>
    
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="romantic-card rounded-3xl p-8 love-glow mt-8 space-y-6"
                >
                  <h3 className="text-3xl playfair gradient-text">Let's Celebrate!</h3>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button onClick={() => { setLightsOn(true); toast({ title: "💡 Lights On!", description: "Let there be light for the star of the show!" }); }} disabled={lightsOn} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                      <Lightbulb className="w-5 h-5 mr-2" /> Turn on the Lights
                    </Button>
                    <AnimatePresence>
                      {lightsOn && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                          <Button onClick={() => { setDecorated(true); toast({ title: "🎉 Decorated!", description: "The party is getting started!" }); }} disabled={decorated} className="bg-pink-500 hover:bg-pink-600">
                            <PartyPopper className="w-5 h-5 mr-2" /> Decorate
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {decorated && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                          <Button onClick={() => { setCandleLit(true); toast({ title: "🔥 Candle Lit!", description: "Make a wish, my love!" }); }} disabled={candleLit} className="bg-orange-500 hover:bg-orange-600">
                            <Flame className="w-5 h-5 mr-2" /> Light the Candle
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {candleLit && !candleBlown && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                          <Button onClick={() => { setCandleBlown(true); toast({ title: "💨 Poof!", description: "Hope all your wishes come true, Jazz! ❤️" }); }} disabled={candleBlown} className="bg-blue-500 hover:bg-blue-600">
                            <Wind className="w-5 h-5 mr-2" /> Blow the Candle
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
    
                <AnimatePresence>
                  {showSurprise && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 50 }}
                      transition={{ duration: 0.6 }}
                      className="romantic-card rounded-3xl p-8 love-glow mt-8"
                    >
                      <div className="text-center space-y-4">
                        <div className="text-6xl">🎁</div>
                        <h3 className="text-3xl playfair gradient-text">Special Message for Jazz!</h3>
                        <p className="text-xl text-pink-200">
                          Jazz, you are the melody that makes my heart sing! Every moment with you is a gift, 
                          and I'm so grateful to celebrate another year of your beautiful existence. 
                          You bring magic to everything you touch! ✨💕
                        </p>
                        <div className="flex justify-center space-x-2 text-3xl">
                          🌟💖🎵🌹✨
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
    
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="flex justify-center mt-12"
                >
                  <div className="relative">
                    <img class="rounded-3xl love-glow w-full max-w-md mx-auto shadow-2xl" alt="Beautiful birthday celebration with candles and flowers" src="https://images.unsplash.com/photo-1620513846464-f26068cbf76e" />
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎂</div>
                    <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">🌹</div>
                    <AnimatePresence>
                      {candleLit && !candleBlown && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>🔥</motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {candleBlown && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, y: -20 }} transition={{ duration: 0.5 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <p className="text-4xl font-bold dancing-script gradient-text">Wish Come True!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <Toaster />
          </div>
        </>
      );
    }
    
    export default App;
