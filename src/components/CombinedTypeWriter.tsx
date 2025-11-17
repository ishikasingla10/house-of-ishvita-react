import { useEffect, useRef, useState } from 'react';

interface Props {
  first: string;
  second: string;
  firstClass?: string;
  secondClass?: string;
  firstDelay?: number;
  secondDelay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function CombinedTypeWriter({
  first,
  second,
  firstClass = '',
  secondClass = '',
  firstDelay = 100,
  secondDelay = 80,
  cursor = true,
  onComplete,
}: Props) {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [showSecond, setShowSecond] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const iRef = useRef(0);
  const tRef = useRef<number | null>(null);
  const blinkRef = useRef<number | null>(null);

  useEffect(() => {
    iRef.current = 0;
    setFirstText('');
    setSecondText('');
    setShowSecond(false);
    setShowCursor(true);

    const typeFirst = () => {
      if (iRef.current < first.length) {
        setFirstText((p) => p + first[iRef.current]);
        iRef.current += 1;
        tRef.current = window.setTimeout(typeFirst, firstDelay);
      } else {
        // start second
        iRef.current = 0;
        setShowSecond(true);
        tRef.current = window.setTimeout(typeSecond, secondDelay);
      }
    };

    const typeSecond = () => {
      if (iRef.current < second.length) {
        setSecondText((p) => p + second[iRef.current]);
        iRef.current += 1;
        tRef.current = window.setTimeout(typeSecond, secondDelay);
      } else {
        if (onComplete) onComplete();
        if (cursor) {
          blinkRef.current = window.setInterval(() => {
            setShowCursor((s) => !s);
          }, 530);
        }
      }
    };

    tRef.current = window.setTimeout(typeFirst, firstDelay);

    return () => {
      if (tRef.current) clearTimeout(tRef.current);
      if (blinkRef.current) clearInterval(blinkRef.current);
    };
  }, [first, second, firstDelay, secondDelay, onComplete, cursor]);

  return (
    <>
      <span className={firstClass}>{firstText}</span>
      {showSecond && (
        <span className={secondClass} style={{ marginLeft: '0.45rem' }}>
          {secondText}
        </span>
      )}
      {cursor && showCursor && <span className="ml-2">|</span>}
    </>
  );
}
