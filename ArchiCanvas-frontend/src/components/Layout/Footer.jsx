import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    marketplace: [
      { name: 'Explore Art', href: '/explore' },
      { name: 'Artists', href: '#' },
      { name: 'Collections', href: '#' },
      { name: 'Auctions', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    community: [
      { name: 'Join Community', href: '/community' },
      { name: 'Live Streams', href: '#' },
      { name: 'Courses', href: '/learn' },
      { name: 'Events', href: '#' },
    ]
  }

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-serif font-bold text-gradient">ArchiCanvas</span>
            </Link>
            <p className="text-base-content/70 mb-6 max-w-md">
              Discover and collect unique artworks and architectural designs from talented artists worldwide. 
              Join our vibrant community of creators and collectors.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-base-content/70">
                <Mail className="w-4 h-4" />
                <span>srujanhm135@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-base-content/70">
                <Phone className="w-4 h-4" />
                <span>+91 8088167017</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-base-content/70">
                <MapPin className="w-4 h-4" />
                <span>karnataka,india</span>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-base-content/70 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Section */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Marketplace</h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-base-content/70 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-base-content/70 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-base-content/70 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-base-content/70">
              © {currentYear} ArchiCanvas. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-base-300 hover:bg-base-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
