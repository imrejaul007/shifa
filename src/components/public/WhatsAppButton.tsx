'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  locale: 'en' | 'ar';
}

const content = {
  en: 'Chat in Arabic',
  ar: 'تحدث بالعربية',
};

export default function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const phoneNumber = '919876543210'; // Replace with actual number
  const message = locale === 'ar'
    ? 'مرحباً، أرغب في الاستفسار عن الخدمات الطبية'
    : 'Hello, I would like to inquire about medical services';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-8 z-50 flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all group ${
        locale === 'ar' ? 'left-8' : 'right-8'
      }`}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
      >
        <MessageCircle className="w-6 h-6" fill="currentColor" />
      </motion.div>
      <span className={`font-semibold hidden lg:inline ${locale === 'ar' ? 'font-arabic' : ''}`}>
        {content[locale]}
      </span>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
    </motion.a>
  );
}
