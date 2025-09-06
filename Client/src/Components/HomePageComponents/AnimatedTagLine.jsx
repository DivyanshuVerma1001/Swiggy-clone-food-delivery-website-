import React, { useEffect, useState, useRef } from "react";

export default function TypingText({
  start = "Order Food ",
  phrases = ["Fresh","Fast","Flavourful"],
  end = " With Swiggy",
  typingSpeed = 100,
  deletingSpeed = 100,
  pauseAfterTyping = 1400
}) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    const currentPhrase = phrases[index % phrases.length];
    let timeout;

    if (!isDeleting) {
      if (display.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplay(current => current + currentPhrase.charAt(display.length));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(current => current.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex(i => (i + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display  , index, phrases, typingSpeed, deletingSpeed, pauseAfterTyping]);

  return (
    <>
    <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center max-w-[80%] container mx-auto ">
      {start}
      <span className="text-yellow-300">{display}</span>
      <span className="cursor-blink">|</span>
      {end}
    </h1>
    
            <style jsx>{`
                @keyframes blink {
                0%   { opacity: 1; }
                50%  { opacity: 0; }
                100% { opacity: 1; }
                }
                .cursor-blink {
                display: inline-block;
                animation: blink 1s step-start infinite;
                }
                `}</style>
  
  </>
  );
}
