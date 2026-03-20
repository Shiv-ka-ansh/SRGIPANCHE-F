import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColor?: string;
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  confirmColor = '#CCFF00',
  loading = false
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-md bg-[#121212] border-4 border-[#333] p-8 overflow-hidden"
            style={{ boxShadow: `12px 12px 0px ${confirmColor}` }}
          >
            <div className="flex justify-between items-start mb-6">
              <div 
                className="w-12 h-12 flex items-center justify-center border-4"
                style={{ borderColor: confirmColor, color: confirmColor }}
              >
                <AlertTriangle size={24} />
              </div>
              <button onClick={onClose} className="text-[#888] hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <h3 className="font-anton text-2xl text-white uppercase tracking-wider mb-2">{title}</h3>
            <p className="font-space text-[#aaa] text-sm uppercase tracking-widest leading-relaxed mb-8">
              {message}
            </p>

            <div className="flex flex-col gap-3">
              <button
                disabled={loading}
                onClick={onConfirm}
                className="w-full font-anton text-xl uppercase tracking-widest py-4 border-4 transition-all disabled:opacity-50"
                style={{ 
                  backgroundColor: confirmColor, 
                  color: '#050505',
                  borderColor: '#050505'
                }}
              >
                {loading ? 'Processing...' : confirmLabel}
              </button>
              <button
                disabled={loading}
                onClick={onClose}
                className="w-full font-anton text-xl uppercase tracking-widest py-4 bg-transparent text-[#888] border-4 border-transparent hover:border-[#333] hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
