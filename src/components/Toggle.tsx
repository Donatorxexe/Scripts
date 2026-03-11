import { motion } from 'framer-motion';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  accentColor: string;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ label, description, checked, accentColor, onChange }: ToggleProps) {
  return (
    <motion.div
      className="flex items-center justify-between py-2 cursor-pointer group"
      onClick={() => onChange(!checked)}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/85 group-hover:text-white transition-colors">
          {label}
        </span>
        {description && (
          <span className="text-[11px] text-white/40 mt-0.5">{description}</span>
        )}
      </div>
      <div
        className="toggle-track flex-shrink-0"
        style={{
          background: checked ? accentColor : 'rgba(40,40,50,0.8)',
          boxShadow: checked ? `0 0 16px ${accentColor}40` : 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        <motion.div
          className="toggle-knob"
          animate={{
            left: checked ? 22 : 2,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            boxShadow: checked ? `0 0 8px ${accentColor}60` : '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </motion.div>
  );
}
