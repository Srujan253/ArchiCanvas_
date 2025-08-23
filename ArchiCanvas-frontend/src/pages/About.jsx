import { motion } from 'framer-motion';
import { Users, Palette, Globe, Heart, Award, Eye } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Art",
      description: "We believe in the transformative power of art and its ability to inspire, heal, and connect people across cultures."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive ecosystem where artists and collectors can thrive together, sharing knowledge and experiences."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting artists and collectors worldwide, breaking down geographical barriers to celebrate creativity."
    },
    {
      icon: Award,
      title: "Quality & Authenticity",
      description: "Ensuring every artwork meets our high standards of quality and authenticity through rigorous verification processes."
    }
  ];

  const stats = [
    { number: "50K+", label: "Artworks", icon: Palette },
    { number: "500+", label: "Artists", icon: Users },
    { number: "100+", label: "Countries", icon: Globe },
    { number: "2M+", label: "Visitors", icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-base-content mb-6"
          >
            About <span className="text-gradient">ArchiCanvas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto mb-8"
          >
            We're on a mission to democratize art and architecture, connecting talented creators with passionate collectors worldwide.
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <Icon className="w-10 h-10 mx-auto mb-4 text-primary-500" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-50 dark:bg-primary-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                <p className="text-2xl font-bold">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
          >
            Join the ArchiCanvas Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Whether you're an artist looking to showcase your work or a collector seeking unique pieces, we'd love to have you join our growing community.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors">
              Become an Artist
            </a>
            <a href="/explore" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors">
              Start Exploring
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
