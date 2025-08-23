# ArchiCanvas - Art & Architecture Marketplace

A modern, responsive, and animated web application frontend for ArchiCanvas, a digital marketplace for art & architecture. Built with React, Vite, TailwindCSS, DaisyUI, and Framer Motion.

![ArchiCanvas](https://img.shields.io/badge/ArchiCanvas-Art%20Marketplace-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎨 Overview

ArchiCanvas is a creative blend of "Architecture" + "Canvas", representing a global marketplace for both art & architecture, where creativity meets technology. The platform connects talented artists and architects with passionate collectors worldwide.

## ✨ Features

### 🔐 Core Features
- **Role-based Authentication**: Admin, Seller, and Buyer roles with different permissions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Modern UI/UX**: Beautiful animations and transitions using Framer Motion

### 🏠 Home Page
- Hero section with animated art/architecture carousel
- Featured artworks grid with hover animations
- Statistics banner (artists, buyers, communities, artworks)
- Smooth scrolling and lazy-loaded sections

### 🛍️ Marketplace (Explore)
- Grid/List view toggle for products
- Advanced search and filtering (category, price, rating)
- Sorting options (price, rating, newest)
- Product cards with hover effects

### 🎭 Product Details
- Image gallery with navigation
- Watermarked images for protection
- AI-powered description rewriting (Gemini API integration)
- Reviews and rating system
- Social sharing and favorites

### 👤 User Profiles
- Editable profile information
- Activity tracking and statistics
- Role-based badges and permissions
- Settings and preferences

### 🔐 Authentication
- Login with role selection
- Seller registration with admin approval
- Demo credentials for testing
- Protected routes and role-based access

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **Vite 4.4.5** - Fast build tool and development server
- **React Router 6.8.1** - Client-side routing
- **Framer Motion 10.16.4** - Animation library for React

### Styling
- **TailwindCSS 3.3.3** - Utility-first CSS framework
- **DaisyUI 3.9.0** - Component library for TailwindCSS
- **Custom CSS** - Additional animations and utilities

### UI Components
- **Lucide React** - Beautiful icon library
- **Recharts 2.7.2** - Chart components for analytics
- **React Hook Form 7.45.4** - Form handling and validation
- **React Hot Toast 2.4.1** - Toast notifications

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ArchiCanvas1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Demo Credentials

For testing purposes, you can use these demo accounts:

### Buyer Account
- **Email**: `collector@archicanvas.com`
- **Password**: `password123`

### Seller Account
- **Email**: `artist@archicanvas.com`
- **Password**: `password123`

### Admin Account
- **Email**: `admin@archicanvas.com`
- **Password**: `password123`

## 📱 Pages & Routes

### Public Pages
- **Home** (`/`) - Landing page with hero section and featured artworks
- **Explore** (`/explore`) - Marketplace with search and filters
- **Product Detail** (`/product/:id`) - Individual artwork details
- **Community** (`/community`) - Community features (coming soon)
- **Learn** (`/learn`) - Learning platform (coming soon)
- **About** (`/about`) - Company information and team

### Protected Pages
- **Profile** (`/profile`) - User profile and settings
- **Seller Dashboard** (`/seller-dashboard`) - Artist analytics and management
- **Admin Dashboard** (`/admin-dashboard`) - Platform administration

### Authentication
- **Login** (`/login`) - User authentication with role selection
- **Register** (`/register`) - Seller registration

## 🎨 Design System

### Color Palette
- **Primary**: Blue (`#0ea5e9`) - Main brand color
- **Secondary**: Purple (`#d946ef`) - Accent color
- **Accent**: Yellow (`#f59e0b`) - Highlight color
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Playfair Display (serif) for elegant titles
- **Body**: Inter (sans-serif) for readable content

### Components
- **Buttons**: Primary, secondary, and outline variants with hover effects
- **Cards**: Hover animations and consistent spacing
- **Forms**: Clean inputs with proper validation states
- **Navigation**: Responsive navbar with mobile drawer

## 🔧 Configuration

### TailwindCSS
The project uses a custom TailwindCSS configuration with:
- Extended color palette
- Custom animations and keyframes
- DaisyUI plugin integration
- Responsive breakpoints

### Theme System
- Light and dark theme support
- CSS custom properties for dynamic theming
- Persistent theme selection

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   └── Layout/         # Layout and navigation
├── contexts/           # React contexts (Auth, Theme)
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   └── ...             # Other page components
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎭 Key Components

### Layout Components
- **Navbar**: Responsive navigation with user menu and theme toggle
- **Footer**: Company information and social links
- **Layout**: Main layout wrapper with navigation

### Authentication Components
- **ProtectedRoute**: Role-based route protection
- **Login/Register**: Authentication forms with validation

### UI Components
- **Product Cards**: Responsive artwork display with hover effects
- **Image Gallery**: Product image navigation with watermarks
- **Search & Filters**: Advanced marketplace filtering

## 🚀 Future Features

### Phase 2 (Coming Soon)
- **Community Features**: Reddit-like posts, discussions, and forums
- **Live Streaming**: WebRTC-based live art sessions
- **Learning Platform**: Video courses and skill assessments
- **Advanced Analytics**: Detailed seller and admin dashboards

### Phase 3 (Planned)
- **AI Integration**: Gemini API for content generation
- **WebRTC**: Real-time streaming and bidding
- **Blockchain**: NFT integration and digital ownership
- **Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful stock images
- **Lucide** for elegant icons
- **TailwindCSS** for the utility-first CSS framework
- **DaisyUI** for beautiful component library
- **Framer Motion** for smooth animations

## 📞 Support

For support and questions:
- **Email**: hello@archicanvas.com
- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

**Built with ❤️ by the ArchiCanvas Team**

*Where Art Meets Architecture*
