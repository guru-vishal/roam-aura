/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-600 dark:bg-green-500/20 backdrop-blur-xl border-green-700 dark:border-green-500/30',
      text: 'text-white dark:text-green-400',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-600 dark:bg-red-500/20 backdrop-blur-xl border-red-700 dark:border-red-500/30',
      text: 'text-white dark:text-red-400',
      icon: XCircle,
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed bottom-4 right-4 z-[10000] max-w-md w-full sm:w-auto ${style.bg} border-2 rounded-2xl shadow-2xl overflow-hidden`}
    >
      <div className="flex items-center gap-3 p-4">
        <Icon className={`w-6 h-6 ${style.text} flex-shrink-0`} />
        <p className={`font-medium ${style.text} flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Progress bar */}
      {duration && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`h-1 ${type === 'success' ? 'bg-green-800 dark:bg-green-500' : 'bg-red-800 dark:bg-red-500'}`}
        />
      )}
    </motion.div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </AnimatePresence>
  );
};

export { Toast, ToastContainer };
export default Toast;
