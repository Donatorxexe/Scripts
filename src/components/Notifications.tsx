import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  text: string;
  color: string;
  icon: string;
}

let notifyId = 0;
let addNotificationFn: ((n: Omit<Notification, 'id'>) => void) | null = null;

export function notify(text: string, color: string = '#00d4aa', icon: string = '⚡') {
  addNotificationFn?.({ text, color, icon });
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((n: Omit<Notification, 'id'>) => {
    const id = ++notifyId;
    setNotifications(prev => [...prev.slice(-4), { ...n, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(x => x.id !== id));
    }, 3500);
  }, []);

  useEffect(() => {
    addNotificationFn = addNotification;
    return () => { addNotificationFn = null; };
  }, [addNotification]);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map(n => (
          <motion.div
            key={n.id}
            initial={{ x: -300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -300, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="pointer-events-auto"
          >
            <div
              className="glass-panel rounded-2xl px-5 py-3 flex items-center gap-3 min-w-[260px] max-w-[340px] shadow-2xl"
              style={{
                borderColor: n.color + '30',
                boxShadow: `0 0 30px ${n.color}15, 0 8px 32px rgba(0,0,0,0.4)`,
              }}
            >
              <div
                className="w-2 h-8 rounded-full flex-shrink-0"
                style={{ background: n.color, boxShadow: `0 0 12px ${n.color}80` }}
              />
              <span className="text-lg flex-shrink-0">{n.icon}</span>
              <span className="text-sm font-medium text-white/90">{n.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
