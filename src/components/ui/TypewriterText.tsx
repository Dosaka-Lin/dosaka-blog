"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}

export default function TypewriterText({
  texts,
  className = "",
  speed = 80,
  deleteSpeed = 40,
  pause = 2000,
}: TypewriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-tohsaka-red ml-0.5 animate-pulse align-middle" />
    </span>
  );
}
