# RoamAura - AI-Powered Travel Planner

A modern, full-stack travel planning application built with React, TailwindCSS, Express.js, and MongoDB. Create personalized itineraries with real-time weather forecasts, Google Places integration, and an intuitive user interface featuring beautiful animations and responsive design.

## ✨ Features

### Core Functionality
- **🌍 Smart Itinerary Builder**: AI-powered travel planning with step-by-step wizard
- **🗺️ Google Places Integration**: Real-time place search and recommendations
- **🌤️ Weather Forecasting**: OpenWeather API integration for accurate weather predictions
- **📅 Flexible Date Selection**: Intuitive date picker with validation (1-7 day trips)
- **💰 Dynamic Budget Slider**: Visual slider from $50-$500 with real-time conversion
- **🎯 Interest-Based Planning**: 6 customizable interests (Culture, Food, Adventure, Relaxation, Nightlife, Shopping)
- **�️ Detailed Itinerary View**: Click any itinerary to see full day-by-day breakdown
- **📱 Responsive Design**: Seamless experience across all devices

### User Experience
- **🔐 Secure Authentication**: JWT-based login/signup with token management
- **👤 User Profile Management**: Edit profile with bio, interests, and account deletion
- **🗂️ Itinerary Management**: View, save, edit, and delete travel plans
- **🌓 Dark/Light Theme**: Persistent theme switching with smooth transitions
- **🎨 Beautiful UI**: Modern gradients, glassmorphism, and Framer Motion animations
- **🍞 Toast Notifications**: Real-time feedback for user actions (login, logout, save)
- **↑ Scroll to Top**: Automatic scroll on route changes for better navigation

### Technical Features
- **⚡ Fast Performance**: Built with Vite for lightning-fast builds
- **🎭 Smooth Animations**: Framer Motion for professional transitions
- **🎨 Custom Styling**: Tailwind CSS with custom scrollbar and slider designs
- **� Real-time Updates**: Automatic data refresh and state management
- **� Comprehensive Logging**: Backend console logs for debugging and monitoring
- **�️ Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and context
- **TailwindCSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 11.13.5** - Advanced animations and transitions
- **React Router Dom 7.9.5** - Client-side routing with protected routes
- **Axios 1.7.9** - HTTP client for API requests
- **Lucide React 0.552.0** - Beautiful icon library
- **Vite 6.0.11** - Next-generation frontend tooling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Fast, minimalist web framework
- **MongoDB 6.12.0** - NoSQL database for flexible data storage
- **Mongoose 8.9.5** - Elegant MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Secure authentication tokens
- **bcryptjs 2.4.3** - Password hashing and verification
- **Google Places API** - Location search and place details
- **OpenWeather API** - Weather forecasts and conditions
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.4.7** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Google Places API Key** (for place search)
- **OpenWeather API Key** (for weather forecasts)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/guru-vishal/roam-aura.git
   cd "Travel Planner"
   ```

2. **Backend Setup**
   ```bash
   cd travel-planner-backend
   npm install
   ```

   Create `.env` file in `travel-planner-backend`:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/roam-aura
   # OR use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roam-aura
   
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-key-here
   JWT_EXPIRES_IN=7d
   
   # API Keys
   GOOGLE_PLACES_API_KEY=your-google-places-api-key-here
   OPENWEATHER_API_KEY=your-openweather-api-key-here
   ```

3. **Frontend Setup**
   ```bash
   cd ../travel-planner-frontend
   npm install
   ```

   Create `.env` file in `travel-planner-frontend`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start Development Servers**

   **Backend** (Terminal 1):
   ```bash
   cd travel-planner-backend
   npm start
   ```
   Server runs on: http://localhost:5000

   **Frontend** (Terminal 2):
   ```bash
   cd travel-planner-frontend
   npm run dev
   ```
   Application runs on: http://localhost:5173

5. **Access the Application**
   - Open your browser and navigate to: http://localhost:5173
   - Create an account or login to start planning!

## 📁 Project Structure

```
Travel Planner/
├── travel-planner-backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── itineraryController.js # Itinerary CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Itinerary.js         # Itinerary schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── itineraryRoutes.js   # Itinerary endpoints
│   ├── utils/
│   │   ├── googleApi.js         # Google Places API integration
│   │   └── weatherApi.js        # OpenWeather API integration
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server setup
│   └── package.json
│
├── travel-planner-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images, icons
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation with theme toggle
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   ├── ScrollToTop.jsx  # Auto-scroll on navigation
│   │   │   └── Toast.jsx        # Notification component
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   └── ThemeContext.jsx # Theme management
│   │   ├── hooks/
│   │   │   └── useToast.jsx     # Toast notification hook
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Signup.jsx       # Signup page
│   │   │   ├── Profile.jsx      # User profile
│   │   │   └── ItineraryBuilder.jsx # Main itinerary builder
│   │   ├── services/
│   │   │   └── itineraryService.js # API service layer
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── package.json
│
└── README.md                    # Project documentation
```

## 📱 Application Features

### 🏠 Home Page
- **Hero Section**: Animated welcome with rotating travel icons (Plane, MapPin, Camera, Compass)
- **Feature Highlights**: Interactive cards showcasing key features
- **Smooth Navigation**: Scroll-to-top on page changes
- **Call-to-Action**: Direct links to start planning

### 🔐 Authentication System
- **Signup Page**:
  - Name, email, password fields with validation
  - Real-time toast notifications for success/errors
  - Automatic redirect to home on successful signup
  - Theme-aware design with gradients

- **Login Page**:
  - Email and password authentication
  - "Remember me" functionality via JWT tokens
  - Toast notifications for login status
  - Automatic redirect after successful login

- **Logout**:
  - Confirmation modal to prevent accidental logouts
  - Toast notification on successful logout
  - Clears authentication state and redirects to home

### 📅 Itinerary Builder (Main Feature)

#### Step 1: Basic Information
- **Destination**: Google Places autocomplete for city selection
- **Dates**: Start and end date pickers with validation
  - Prevents past dates
  - Validates date range (1-7 days maximum)
- **Travelers**: Number input for group size
- **Budget**: Visual slider ($50-$500) with dynamic gradient
  - Budget: $50-$99 (Green)
  - Mid-range: $100-$199 (Blue)
  - Luxury: $200+ (Purple-Orange)

#### Step 2: Interest Selection
- 6 interactive interest cards with icons:
  - 🏛️ Culture & History
  - 🍽️ Food & Dining
  - 🗺️ Adventure
  - 🛏️ Relaxation
  - ⭐ Nightlife
  - 🛍️ Shopping
- Visual feedback with gradient backgrounds when selected
- Multiple selection support

#### Step 3: Generated Itinerary
- **Loading State**: Animated spinner with loading message
- **Weather Integration**: Real-time weather for each day
  - Weather icons (Sun, Cloud, Rain, Snow)
  - Temperature display in Celsius
- **Daily Breakdown**:
  - Day-by-day itinerary cards
  - Places with names, addresses, and ratings
  - Time of day suggestions (morning/afternoon/evening)
  - Google Places integration for accurate data
- **Action Buttons**:
  - "Create Another": Start new itinerary with gradient styling
  - "View All Itineraries": Access saved itineraries with List icon

### 🗂️ My Itineraries View
- **Grid Layout**: Responsive 2-column grid of itinerary cards
- **Card Information**:
  - Destination and dates
  - Traveler count and trip duration
  - Interest tags with gradient backgrounds
  - Share and Delete icons
- **Click to View**: Click any card to see full details in modal
- **Empty State**: Friendly message when no itineraries exist

### 👁️ Itinerary Details Modal
- **Full-screen Modal**: Beautiful overlay with detailed view
- **Trip Summary**:
  - Traveler count, duration, and budget cards
  - Interest tags with gradients
- **Complete Daily Itinerary**:
  - Each day with weather information
  - All places with ratings and addresses
  - Time of day indicators
  - Staggered animations for smooth reveal
- **Close Button**: Easy modal dismissal

### 👤 Profile Page
- **User Information Display**:
  - Profile picture placeholder
  - Name and email
  - Bio and interests (when added)
- **Edit Profile Modal**:
  - Update name, bio, and travel interests
  - Loading states during save
  - Real-time updates
- **Account Management**:
  - Delete account functionality
  - Confirmation modal with warning
  - Complete data removal
- **Stats Cards**: Placeholder for future features
  - Countries visited, trips planned
  - Favorite places, photos shared

### 🎨 Design Features

#### Theme System
- **Dark Mode**:
  - Deep gradients (slate-900, purple-900)
  - Gray-800 cards with blue/purple accents
  - High contrast text (white/gray-300)
  
- **Light Mode**:
  - Soft gradients (blue-50, purple-50, pink-50)
  - White/blue-50 cards
  - Dark gray-900 text for readability

- **Persistence**: Theme saved to localStorage
- **Smooth Transitions**: 300ms color transitions

#### Animations (Framer Motion)
- **Page Transitions**: Fade in with 0.3s duration
- **Hover Effects**: Scale to 1.05 on buttons and cards
- **Tap Effects**: Scale to 0.95 on click
- **Stagger Children**: Sequential animations for lists
- **Loading Spinners**: Rotating animations
- **Toast Notifications**: Slide in from bottom-right

#### Custom Styling
- **Scrollbar**: Custom webkit scrollbar (8px wide, rounded)
- **Range Slider**: 
  - Custom thumb with gradient
  - Hover scale effect (1.2x)
  - Track with gradient fill
- **Gradients**: 
  - Blue to purple for primary actions
  - Purple to pink for secondary actions
  - Multi-color for budget visualization
- **Glassmorphism**: Backdrop blur effects on cards

## 🔧 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user account | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get current user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |
| DELETE | `/account` | Delete user account | Yes |

### Itineraries (`/api/itinerary`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Generate new itinerary | Yes |
| GET | `/` | Get user's itineraries | Yes |
| GET | `/:id` | Get specific itinerary | Yes |
| PUT | `/:id` | Update itinerary | Yes |
| DELETE | `/:id` | Delete itinerary | Yes |
| GET | `/share/:shareId` | Get shared itinerary | No |

### Request/Response Examples

#### POST `/api/auth/register`
```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/itinerary`
```json
// Request
{
  "destination": "Paris",
  "startDate": "2025-06-01",
  "endDate": "2025-06-03",
  "travelers": 2,
  "budget": "mid-range",
  "interests": ["culture", "food", "adventure"]
}

// Response
{
  "success": true,
  "itinerary": {
    "_id": "507f1f77bcf86cd799439011",
    "destination": "Paris",
    "startDate": "2025-06-01T00:00:00.000Z",
    "endDate": "2025-06-03T00:00:00.000Z",
    "travelers": 2,
    "budget": "mid-range",
    "interests": ["culture", "food", "adventure"],
    "days": [
      {
        "day": 1,
        "date": "2025-06-01",
        "weather": {
          "temp": 22,
          "condition": "sunny",
          "description": "Clear sky"
        },
        "places": [
          {
            "name": "Eiffel Tower",
            "address": "Champ de Mars, Paris",
            "rating": 4.7,
            "timeOfDay": "morning",
            "place_id": "ChIJLU7jZClu5kcR4PcOOO6p3I0"
          }
        ]
      }
    ],
    "createdAt": "2025-11-02T00:00:00.000Z"
  }
}
```

## 🔒 Authentication Flow

1. **Registration/Login**: User provides credentials
2. **JWT Generation**: Server creates JWT token with 7-day expiration
3. **Token Storage**: Frontend stores token in localStorage
4. **Request Authorization**: Token sent in Authorization header: `Bearer <token>`
5. **Middleware Verification**: Server validates token on protected routes
6. **User Context**: Decoded user ID attached to request object

## 🌐 External API Integration

### Google Places API
- **Text Search**: Find places based on destination and interests
- **Place Details**: Get detailed information about places
- **Autocomplete**: City/destination search suggestions
- **Rate Limiting**: Implemented to prevent quota exhaustion

### OpenWeather API
- **Weather Forecast**: 5-day weather predictions
- **Current Weather**: Real-time weather data
- **Data Points**: Temperature, conditions, descriptions
- **Caching**: Weather data cached for performance

## 💡 Key Features Implementation

### Budget Slider
```javascript
// Converts slider value ($50-$500) to backend categories
const budgetCategory = 
  formData.budget < 100 ? 'budget' : 
  formData.budget >= 200 ? 'luxury' : 
  'mid-range';
```

### Interest Selection
- Visual selection with gradient backgrounds
- Multiple interests support
- Icon-based representation
- Theme-aware colors

### Weather-Based Recommendations
- Indoor activities suggested for bad weather
- Outdoor activities for good weather
- Real-time weather data integration

### Responsive Grid System
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-3 columns based on context

## 🎯 User Experience Enhancements

### Toast Notifications
- **Position**: Bottom-right corner
- **Types**: Success, Error, Info, Warning
- **Duration**: 3 seconds auto-dismiss
- **Animations**: Slide in from bottom with fade
- **Design**: Acrylic background with backdrop blur

### Loading States
- Skeleton screens for data loading
- Spinner animations during API calls
- Progress indicators for multi-step processes
- Disabled states during operations

### Error Handling
- User-friendly error messages
- Graceful fallbacks for API failures
- Form validation with inline errors
- Network error detection

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators on interactive elements

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Build Configuration
```bash
cd travel-planner-frontend
npm run build
# Output: dist/ folder
```

#### Environment Variables
```env
VITE_API_URL=https://your-backend-domain.com/api
```

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Backend Deployment (Render/Railway/Heroku)

#### Build Command
```bash
npm install
```

#### Start Command
```bash
npm start
```

#### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roam-aura
JWT_SECRET=your-production-secret-key-change-this
JWT_EXPIRES_IN=7d
GOOGLE_PLACES_API_KEY=your-google-api-key
OPENWEATHER_API_KEY=your-openweather-api-key
FRONTEND_URL=https://your-frontend-domain.com
```

#### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Create database user with credentials

### Production Checklist
- [ ] Set secure JWT_SECRET (random, long string)
- [ ] Configure CORS with specific frontend URL
- [ ] Set up MongoDB Atlas with proper security
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set up environment variables on hosting platforms
- [ ] Test authentication flow in production
- [ ] Verify API rate limits for external services
- [ ] Set up monitoring and logging
- [ ] Configure database backups
- [ ] Test responsive design on multiple devices

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with valid/invalid data
- [ ] Login with correct/incorrect credentials
- [ ] Theme switching (light/dark) and persistence
- [ ] Itinerary creation with all steps
- [ ] Budget slider functionality
- [ ] Interest selection (single and multiple)
- [ ] Date validation (past dates, invalid ranges)
- [ ] View saved itineraries
- [ ] Click itinerary to view details
- [ ] Delete itinerary
- [ ] Edit profile
- [ ] Delete account
- [ ] Logout functionality
- [ ] Toast notifications for all actions
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Navigation between pages

## 📊 Performance Optimization

### Implemented Optimizations
- **Code Splitting**: React Router lazy loading
- **Image Optimization**: Optimized assets
- **Minification**: Vite production build minification
- **Caching**: API response caching
- **Debouncing**: Input field debouncing for API calls
- **Lazy Loading**: Components loaded on demand
- **Tree Shaking**: Unused code elimination

### Future Improvements
- Service Worker for offline support
- Image lazy loading for itinerary cards
- Virtual scrolling for large lists
- Redis caching for API responses
- CDN integration for static assets

## 🐛 Known Issues & Limitations

### Current Limitations
- Maximum trip duration: 7 days
- Weather forecast limited to 5 days (API limitation)
- Google Places API rate limiting (free tier)
- No real-time collaboration features
- No payment integration for bookings

### Future Enhancements
- [ ] PDF export functionality
- [ ] Social sharing features
- [ ] Real-time collaboration on itineraries
- [ ] Integration with booking platforms
- [ ] Photo uploads for places
- [ ] Travel blog integration
- [ ] Budget tracking with actual expenses
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Offline mode
- [ ] Map integration with routes

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Commit with clear messages
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
5. Push to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Update documentation for new features
- Test your changes thoroughly
- Keep PRs focused on a single feature/fix

### Code Style
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Node.js best practices
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: Add comments for complex logic

## 📝 License

This project is licensed under the MIT License.

### MIT License
```
Copyright (c) 2025 Guru Vishal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

### Technologies & Libraries
- **[React](https://react.dev/)** - UI library for building interactive interfaces
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Express.js](https://expressjs.com/)** - Fast, minimalist web framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for flexibility
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon set
- **[Google Places API](https://developers.google.com/maps/documentation/places)** - Location data services
- **[OpenWeather API](https://openweathermap.org/api)** - Weather forecasting

### Inspiration
- Modern travel planning apps
- Material Design principles
- Glassmorphism design trends
- User-centric design philosophy

### Special Thanks
- The React and Node.js communities
- Open-source contributors
- Beta testers and early users

## 📞 Contact & Support

### Developer
**Guru Vishal**
- 📧 Email: [vishal3012006@gmail.com](mailto:vishal3012006@gmail.com)
- 📱 Phone: +91 95972 93169
- 📍 Location: Coimbatore, Tamil Nadu, India

### Social Media
- 🔵 **Facebook**: [RoamAura](https://www.facebook.com/profile.php?id=61564244080127)
- 📸 **Instagram**: [@_vishalmuthu_](https://www.instagram.com/_vishalmuthu_/)
- 💬 **WhatsApp**: [Chat with us](https://wa.me/919597293169)

### Repository
- 🐙 **GitHub**: [roam-aura](https://github.com/guru-vishal/roam-aura)

### Support
For bug reports, feature requests, or general questions:
1. Open an issue on GitHub
2. Contact via email
3. Message on social media

## 🌟 Show Your Support

If you found this project helpful or interesting:
- ⭐ Star the repository on GitHub
- 🍴 Fork and contribute
- 📢 Share with others
- 💬 Provide feedback

## 📈 Project Stats

- **Version**: 1.0.0
- **Status**: Active Development
- **Last Updated**: November 2025
- **License**: MIT
- **Language**: JavaScript/JSX
- **Framework**: React + Express
- **Database**: MongoDB

---

<div align="center">

### 🌍 Happy Traveling with RoamAura! ✈️

*Plan smarter. Travel better. Experience more.*

**Made with ❤️ by Guru Vishal**

</div>