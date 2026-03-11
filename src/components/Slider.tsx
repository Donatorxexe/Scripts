import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  accentColor: string;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export default function Slider({
  label, value, min, max, step = 1, suffix = '', accentColor,
  onChange, formatValue,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  const pct = ((value - min) / (max - min)) * 100;

  const updateFromMouse = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + p * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChange(Math.max(min, Math.min(max, stepped)));
  }, [min, max, step, onChange]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateFromMouse(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updateFromMouse]);

  const displayValue = formatValue ? formatValue(value) : `${value}${suffix}`;

  return (
    <motion.div
      className="select-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-white/70 tracking-wide uppercase">{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xs font-bold tabular-nums px-2 py-0.5 rounded-md"
          style={{ color: accentColor, background: accentColor + '18' }}
        >
          {displayValue}
        </motion.span>
      </div>
      <div
        ref={trackRef}
        className="slider-track group"
        onMouseDown={(e) => {
          setDragging(true);
          updateFromMouse(e.clientX);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          updateFromMouse(e.touches[0].clientX);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="slider-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accentColor}60, ${accentColor})`,
            boxShadow: dragging ? `0 0 12px ${accentColor}50` : 'none',
            transition: dragging ? 'none' : 'width 0.15s ease-out',
          }}
        />
        <div
          className="slider-knob"
          style={{
            left: `${pct}%`,
            boxShadow: dragging || hovered
              ? `0 0 0 4px ${accentColor}30, 0 2px 8px rgba(0,0,0,0.3)`
              : `0 0 0 2px ${accentColor}40, 0 2px 4px rgba(0,0,0,0.2)`,
            transition: dragging ? 'box-shadow 0.2s' : 'left 0.15s ease-out, box-shadow 0.2s, transform 0.15s',
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
        />
      </div>
    </motion.div>
  );
}
