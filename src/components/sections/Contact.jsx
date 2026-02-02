import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { IconMail, IconUser, IconMessage, IconSend, IconCheck, IconX } from '@tabler/icons-react';
import { contactContent } from '../../data/content';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';
import { MovingBorderButton } from '../ui/moving-border';
import { BackgroundBeams } from '../ui/background-beams';

const Contact = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name' });
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter a message' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Replace these with your EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const userId = 'YOUR_USER_ID';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        userId
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-50/30">
        <BackgroundBeams />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          variants={staggerContainerVariant}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500">Touch</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {contactContent.description}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-magenta to-cyan-500 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={staggerItemVariant}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
                    <IconUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-magenta transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
                    <IconMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-magenta transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-white/50">
                    <IconMessage className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-magenta transition-colors resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>
              </div>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <IconCheck className="w-5 h-5" />
                  ) : (
                    <IconX className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <MovingBorderButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                containerClassName="rounded-lg w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <IconSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </MovingBorderButton>
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-white/60 mb-4">Or reach out directly via email</p>
              <a
                href={`mailto:${contactContent.email}`}
                className="text-magenta hover:text-cyan-500 transition-colors font-medium inline-flex items-center gap-2"
              >
                <IconMail className="w-5 h-5" />
                {contactContent.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
