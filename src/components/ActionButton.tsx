import { useState, useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  label: string;
  icon: string;
  active: boolean;
  accentColor: string;
  hotkey?: string;
  danger?: boolean;
  onClick: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

let rippleId = 0;

export default function ActionButton({
  label, icon, active, accentColor, hotkey, danger, onClick,
}: ActionButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const id = ++rippleId;
    const r: Ripple = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color: danger ? '#ef4444' : accentColor,
    };
    setRipples(prev => [...prev, r]);
    setTimeout(() => {
      setRipples(prev => prev.filter(x => x.id !== id));
    }, 600);
    onClick();
  };

  const baseColor = danger ? '#ef4444' : accentColor;
  const bg = active
    ? `${baseColor}20`
    : danger
      ? 'rgba(60,15,15,0.5)'
      : 'rgba(20,20,28,0.6)';

  return (
    <motion.button
      ref={btnRef}
      className="ripple-container w-full rounded-xl px-4 py-3 flex items-center gap-3 border transition-all duration-200 cursor-pointer select-none"
      style={{
        background: bg,
        borderColor: active ? baseColor + '40' : danger ? '#ef444425' : 'rgba(255,255,255,0.04)',
        boxShadow: active
          ? `0 0 20px ${baseColor}15, inset 0 1px 0 ${baseColor}10`
          : hovered
            ? `0 4px 16px rgba(0,0,0,0.3)`
            : 'none',
      }}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="ripple"
          style={{
            left: r.x,
            top: r.y,
            width: 100,
            height: 100,
            marginLeft: -50,
            marginTop: -50,
            background: r.color,
          }}
        />
      ))}
      <span className="text-lg flex-shrink-0 relative z-10">{icon}</span>
      <span
        className="text-sm font-bold tracking-wide relative z-10 flex-1 text-left"
        style={{ color: active ? baseColor : danger ? '#ef4444' : '#e4e4e7' }}
      >
        {label}
      </span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full relative z-10 flex-shrink-0"
          style={{ background: baseColor, boxShadow: `0 0 8px ${baseColor}` }}
        />
      )}
      {hotkey && (
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded relative z-10 flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {hotkey}
        </span>
      )}
    </motion.button>
  );
}
