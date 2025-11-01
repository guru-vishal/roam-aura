# RoamAura - AI-Powered Travel Planner

A modern, responsive travel planning application built with React, TailwindCSS, and Node.js. Create personalized itineraries with AI-powered recommendations, beautiful animations, and an intuitive user interface.

## ✨ Features

- **🌍 Destination Discovery**: Explore curated destinations with detailed information
- **📅 Smart Itinerary Builder**: Create personalized travel plans with AI-powered recommendations
- **💰 Budget Planning**: Flexible budget ranges from ₹2,000 to ₹40,000+
- **📄 PDF Export**: Download your itineraries as beautifully formatted PDF documents
- **� PDF Export**: Download your itineraries as beautifully formatted PDF documents
- **🎨 Beautiful UI**: Modern design with TailwindCSS and smooth animations using Framer Motion
- **🌓 Dark Mode**: Seamless dark/light theme switching
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔐 User Authentication**: Secure JWT-based authentication
- **👤 User Profiles**: Track your travel plans and manage itineraries
- **🚀 Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations and transitions
- **React Router Dom 7.9.5** - Client-side routing
- **Lucide React 0.552.0** - Beautiful icon library
- **jsPDF 3.0.3** - PDF generation
- **jspdf-autotable 5.0.2** - Table formatting for PDFs
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Google Places API** - City autocomplete and location data
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Google Places API key (for city autocomplete)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-planner
   ```

2. **Install Backend Dependencies**
   ```bash
   cd travel-planner-backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../travel-planner-frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `travel-planner-backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/roamaura
   JWT_SECRET=your-super-secret-jwt-key-here
   GOOGLE_PLACES_API_KEY=your-google-places-api-key
   ```

5. **Start the Servers**

   **Backend** (in travel-planner-backend directory):
   ```bash
   npm start
   ```

   **Frontend** (in travel-planner-frontend directory):
   ```bash
   npm run dev
   ```

6. **Open the Application**
   - Frontend: http://localhost:5173/
   - Backend API: http://localhost:5000/

## 📱 Application Pages

### 🏠 Home Page
- Animated hero section with rotating travel icons
- Feature highlights with smooth animations
- Popular destinations showcase
- Smooth scroll to sections
- Call-to-action buttons

### 🔐 Authentication
- **Login**: Secure user authentication with JWT
- **Signup**: Create new account with form validation

### 📅 Itinerary Builder
- **Destination Selection**: Google Places API-powered city search
- **Date Selection**: Calendar with validation (prevents invalid date ranges)
- **Budget Selection**: Visual slider from ₹2,000 to ₹40,000+
- **Interest Selection**: Choose from 12+ travel interests
- **AI-Generated Itinerary**: Day-by-day travel plans with:
  - Weather information
  - Activity recommendations
  - Place details with timings
  - Travel tips
- **PDF Export**: Download itineraries with professional formatting
- **Save & Manage**: Store itineraries in your profile

### 👤 Profile Page
- User information display
- Overview of saved itineraries
- Quick access to itinerary management
- Navigate to itinerary builder

## 🎨 Design Features

### Animations
- **Page Transitions**: Smooth fade and slide animations
- **Hover Effects**: Interactive buttons and cards with scale transforms
- **Loading States**: Beautiful loading animations
- **Scroll Animations**: Elements animate as they come into view
- **Stagger Effects**: Sequential animations for lists and grids

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Enhanced**: Rich desktop experience with side-by-side layouts

### Dark Mode
- **Theme Toggle**: Smooth transition between light and dark themes
- **Context-based**: Theme preference saved and applied globally
- **Adaptive Colors**: All components adapt to theme changes

### Color Scheme
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple accents
- **Accent**: Yellow (#facc15) for highlights
- **Budget Gradient**: Green → Blue → Purple → Orange
- **Glass Effects**: Modern glassmorphism design

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Itineraries
- `GET /api/itineraries` - Get user itineraries (requires auth)
- `POST /api/itineraries` - Create new itinerary (requires auth)
- `GET /api/itineraries/:id` - Get single itinerary (requires auth)
- `PUT /api/itineraries/:id` - Update itinerary (requires auth)
- `DELETE /api/itineraries/:id` - Delete itinerary (requires auth)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

## 💡 Key Features Explained

### PDF Export
- Professional formatting with headers and footers
- Color-coded sections (blue headers, purple tips)
- Automatic page breaks for long itineraries
- Includes destination, dates, budget, travelers, and interests
- Day-by-day breakdown with weather and activities

### Budget Categories
- **Budget**: ₹2,000 - ₹5,999
- **Mid-range**: ₹6,000 - ₹15,999
- **Comfortable**: ₹16,000 - ₹24,999
- **Luxury**: ₹25,000+

### Interest Categories
Adventure, Beach, Culture, Food, History, Nature, Photography, Shopping, Nightlife, Relaxation, Wildlife, Sports

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd travel-planner-frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
cd travel-planner-backend
# Set environment variables in platform dashboard
# Deploy using git or platform CLI
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<secure-random-string>
GOOGLE_PLACES_API_KEY=<your-google-api-key>
FRONTEND_URL=<your-frontend-domain>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **TailwindCSS** for the amazing utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Lucide React** for the beautiful icons
- **Vite** for the fast development experience
- **jsPDF** for PDF generation capabilities
- **Google Places API** for location services

## 📞 Contact

- **Email**: vishal3012006@gmail.com
- **Phone**: +91 95972 93169
- **Location**: Coimbatore, India

## 🔗 Social Media

- **Facebook**: [RoamAura on Facebook](https://www.facebook.com/profile.php?id=61564244080127)
- **Instagram**: [@_vishalmuthu_](https://www.instagram.com/_vishalmuthu_/)
- **WhatsApp**: [Chat with us](https://wa.me/919597293169)

---

**Happy Traveling with RoamAura! 🌍✈️**