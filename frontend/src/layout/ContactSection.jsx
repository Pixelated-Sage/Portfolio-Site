import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-gray-900 via-[#18192a] to-[#0b0d1a] text-white relative overflow-hidden">
      {/* Meteor shower for background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="meteor-shower"
            style={{
              '--delay': `${Math.random() * 10}s`,
              '--top': `${Math.random() * 100}%`,
              '--left': `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400"
        >
          🚀 Let's Connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg text-gray-300 mb-10"
        >
          Have a project, idea, or just want to say hi? Drop me a message!
        </motion.p>
        <form
          className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-md flex flex-col gap-6"
          onSubmit={e => { e.preventDefault(); alert("Message sent! (Demo)"); }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="bg-transparent border-b border-purple-500/30 focus:border-pink-400 outline-none py-2 px-4 text-white placeholder-gray-400 transition-all"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-transparent border-b border-purple-500/30 focus:border-pink-400 outline-none py-2 px-4 text-white placeholder-gray-400 transition-all"
            required
          />
          <textarea
            placeholder="Your Message"
            className="bg-transparent border-b border-purple-500/30 focus:border-pink-400 outline-none py-2 px-4 text-white placeholder-gray-400 transition-all resize-none"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;