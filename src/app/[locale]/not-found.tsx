'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8"
          >
            <h1 className="text-9xl sm:text-[12rem] font-display font-bold text-primary/10">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-24 h-24 sm:w-32 sm:h-32 text-accent animate-bounce" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/en"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-full hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>

            <Link
              href="/en/treatments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105"
            >
              <Search className="w-5 h-5" />
              Browse Treatments
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-muted"
          >
            <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { href: '/en/about', label: 'About Us' },
                { href: '/en/hospitals', label: 'Hospitals' },
                { href: '/en/doctors', label: 'Doctors' },
                { href: '/en/services', label: 'Services' },
                { href: '/en/faq', label: 'FAQ' },
                { href: '/en/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-accent hover:bg-accent/10 rounded-full transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <p className="text-sm text-muted-foreground">
              Need help?{' '}
              <Link href="/en/contact" className="text-accent hover:underline font-semibold">
                Contact our support team
              </Link>{' '}
              or call us at{' '}
              <a href="tel:+919876543210" className="text-accent hover:underline font-semibold">
                +91 987 654 3210
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
