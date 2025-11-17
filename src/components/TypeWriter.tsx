import { useEffect, useState, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export default function TypeWriter({ 
  text, 
  delay = 80, 
  className = '', 
  onComplete,
  cursor = true 
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const index = useRef(0);
  const timeoutRef = useRef<number>();
  const cursorTimeoutRef = useRef<number>();

  useEffect(() => {
    // Reset when text prop changes
    index.current = 0;
    setDisplayText('');
    setShowCursor(true);

    const type = () => {
      if (index.current < text.length) {
        setDisplayText(prev => prev + text[index.current]);
        index.current += 1;
        timeoutRef.current = window.setTimeout(type, delay);
      } else {
        if (onComplete) onComplete();
        if (cursor) {
          // Blink cursor after typing complete
          cursorTimeoutRef.current = window.setInterval(() => {
            setShowCursor(prev => !prev);
          }, 530); // Standard cursor blink rate
        }
      }
    };

    timeoutRef.current = window.setTimeout(type, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(cursorTimeoutRef.current);
    };
  }, [text, delay, onComplete, cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && showCursor && <span className="opacity-100">|</span>}
    </span>
  );
}