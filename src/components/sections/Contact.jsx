import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconSend, IconCheck, IconX, IconExternalLink } from '@tabler/icons-react';
import { contactContent } from '../../data/content';
import { SOCIAL_LINKS } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';
import { BackgroundBeams } from '../ui/background-beams';

const Contact = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      // EmailJS credentials
      const serviceId = 'service_pwvf6yb';
      const templateId = 'template_awq1a5q';
      const userId = 'NZWgsBSWhwRYNQY65';

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

  const channels = [
    { key: 'email', value: contactContent.email, href: `mailto:${contactContent.email}`, Icon: IconMail },
    { key: 'github', value: 'github.com/taenam1214', href: SOCIAL_LINKS.github, Icon: IconBrandGithub },
    { key: 'linkedin', value: 'in/taenamkim', href: SOCIAL_LINKS.linkedin, Icon: IconBrandLinkedin },
  ];

  const inputClass =
    'w-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/40 transition-colors';
  const labelClass = 'block font-mono text-xs uppercase tracking-[0.15em] text-cyan-500 mb-2';

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gray-100/50 dark:bg-dark-50/30">
        <BackgroundBeams />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          variants={staggerContainerVariant}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left — editorial CTA + channels */}
          <motion.div variants={staggerItemVariant}>
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-500 mb-3">
              {'// Contact'}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
              Let's build<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-cyan-500 to-azure">something.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-md mb-8">
              {contactContent.description}
            </p>

            {/* channels panel */}
            <div className="rounded-2xl border border-gray-900/15 dark:border-white/15 bg-white/60 dark:bg-dark-100/70 backdrop-blur-md overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-900/10 dark:border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-sm text-gray-500 dark:text-white/50">contact.channels</span>
              </div>
              <div className="p-5 sm:p-6 font-mono text-sm sm:text-base space-y-3">
                {channels.map(({ key, value, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[82px_1fr] gap-4 items-center hover:translate-x-1 transition-transform"
                  >
                    <span className="text-brand tracking-wide">{key}</span>
                    <span className="flex items-center gap-2 text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{value}</span>
                      <IconExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </span>
                  </a>
                ))}
                <div className="grid grid-cols-[82px_1fr] gap-4 items-center">
                  <span className="text-brand tracking-wide">based</span>
                  <span className="text-gray-900 dark:text-white">Pittsburgh, PA</span>
                </div>
                <div className="grid grid-cols-[82px_1fr] gap-4 items-center pt-1">
                  <span className="text-brand tracking-wide">status</span>
                  <span className="text-gray-900 dark:text-white flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_#15e6a0] mr-2.5" />
                    open to connect
                    <span className="inline-block w-[9px] h-[17px] bg-cyan-500 ml-1.5 align-middle animate-[blink_1.1s_steps(1)_infinite]" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — message form */}
          <motion.div variants={staggerItemVariant}>
            <div className="rounded-2xl border border-gray-900/15 dark:border-white/15 bg-white/60 dark:bg-dark-100/70 backdrop-blur-md overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-900/10 dark:border-white/10">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-sm text-gray-500 dark:text-white/50">new_message</span>
              </div>
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="your.email@example.com" required />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" className={`${inputClass} resize-none`} placeholder="Your message..." required />
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3.5 rounded-lg text-sm ${
                      status.type === 'success'
                        ? 'bg-brand/15 border border-brand/30 text-brand'
                        : 'bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? <IconCheck className="w-5 h-5" /> : <IconX className="w-5 h-5" />}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-7 py-3.5 rounded-full font-semibold text-sm text-dark bg-gradient-to-r from-brand to-azure hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(21,230,160,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <IconSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
