import React from 'react';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconFileDownload } from '@tabler/icons-react';
import { SOCIAL_LINKS, SITE_CONFIG } from '../../utils/constants';
import { fadeInUp } from '../../utils/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: IconBrandGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: IconBrandLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: IconMail, href: SOCIAL_LINKS.email, label: 'Email' },
  ].filter(link => link.href); // Only show links that are configured

  return (
    <footer className="relative bg-dark-100 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex space-x-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="p-3 rounded-full bg-white/5 hover:bg-magenta/20 border border-white/10 hover:border-magenta transition-all duration-300 group"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-white group-hover:text-magenta transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Resume Download Button */}
          <motion.a
            href="/resume.pdf"
            download
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-cyan-500 hover:shadow-lg hover:shadow-magenta/50 transition-all duration-300 group"
          >
            <IconFileDownload className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Download Resume</span>
          </motion.a>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-sm"
          >
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
