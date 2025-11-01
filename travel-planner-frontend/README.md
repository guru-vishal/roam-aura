# RoamAura - Travel Planning Frontend

Modern React application for planning personalized travel itineraries with AI-powered recommendations, beautiful animations, and PDF export capabilities.

## 🚀 Tech Stack

- **React 19.1.1** - Modern React with hooks
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router Dom 7.9.5** - Client-side routing
- **Lucide React 0.552.0** - Icon library
- **jsPDF 3.0.3** - PDF generation
- **jspdf-autotable 5.0.2** - Table formatting for PDFs

## ✨ Features

- 🌍 Interactive destination search with Google Places API
- 📅 Smart date validation and selection
- 💰 Visual budget slider (₹2,000 - ₹40,000+)
- 🎨 Interest-based itinerary customization
- 📄 Professional PDF export
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- 🔐 JWT-based authentication
- ✨ Beautiful animations with Framer Motion

## 🛠️ Development

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs on http://localhost:5173/

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── PrivateRoute.jsx
├── context/         # React context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/           # Custom React hooks
│   └── useToast.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── ItineraryBuilder.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Signup.jsx
├── App.jsx          # Main app component
├── main.jsx         # App entry point
└── index.css        # Global styles
```

## 🎨 Key Components

### ItineraryBuilder
Main feature for creating travel itineraries with:
- Multi-step form with validation
- Google Places autocomplete
- Budget and date selection
- Interest tags
- PDF export functionality
- Save to profile

### Theme System
Global dark/light theme with:
- Context-based state management
- Persistent user preference
- Smooth transitions
- Tailwind CSS integration

### Authentication
JWT-based auth system with:
- Protected routes
- Token refresh
- Context-based state
- Automatic redirects

## 🔧 Configuration

### Vite Config
The project uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) with Babel for Fast Refresh.

### Tailwind CSS
Custom configuration in `tailwind.config.js` for:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Dark mode support

### ESLint
Basic ESLint configuration for code quality and consistency.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_PLACES_API_KEY=your-api-key-here
```

## 🚀 Deployment

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### Vercel
```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ using React + Vite
