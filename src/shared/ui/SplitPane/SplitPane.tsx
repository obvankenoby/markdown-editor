import { type ReactNode, useEffect, useRef, useState } from 'react';
import './SplitPane.css';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

export function SplitPane({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
}: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState<number>(defaultSize);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const containerWidth = containerRect?.width;
        const mouseX = e.clientX - containerRect?.left;
        let newLeftWidth = (mouseX / containerWidth) * 100;
        newLeftWidth = Math.max(minSize, Math.min(maxSize, newLeftWidth));

        setLeftWidth(newLeftWidth);
      }
      return;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minSize, maxSize]);

  return (
    <div
      ref={containerRef}
      className={`split-pane ${isDragging ? 'split-pane--dragging' : ''}`}
    >
      <div className="split-pane__left" style={{ width: `${leftWidth}%` }}>
        {left}
      </div>
      <div className="split-pane__divider" onMouseDown={handleMouseDown}>
        <div className="split-pane__divider-handle" />
      </div>
      <div
        className="split-pane__right"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {right}
      </div>
    </div>
  );
}
