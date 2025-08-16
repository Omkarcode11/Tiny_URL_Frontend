# Tiny URL Frontend

A modern Next.js frontend application for the Tiny URL service, featuring user authentication, short URL creation, and detailed analytics.

## Features

- 🚀 **Modern Next.js 15** with App Router
- 🔐 **User Authentication** - Sign up, sign in, and secure sessions
- 🔗 **URL Shortening** - Create short, shareable links
- 📊 **Analytics Dashboard** - Track clicks and performance metrics
- 🎨 **Beautiful UI** - Built with Tailwind CSS and modern design principles
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔒 **Secure** - JWT-based authentication with proper middleware

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **HTTP Client**: Axios with interceptors

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (Tiny URL Backend)

## Getting Started

### 1. Clone and Install

```bash
cd tiny-url-frontend
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

**Note**: Make sure your backend is running on port 3000, or update the URL accordingly.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard routes
│   ├── login/            # Authentication pages
│   ├── signup/           # Sign up page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── metrics/          # Analytics components
│   ├── url/              # URL management components
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
│   ├── api.ts            # API client configuration
│   ├── auth.ts           # Authentication service
│   ├── url.ts            # URL service
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## API Integration

The frontend integrates with the Tiny URL Backend API:

- **Authentication**: `/api/v1/auth/signin`, `/api/v1/auth/signup`
- **URL Management**: `/api/v1/urls` (CRUD operations)
- **URL Redirection**: `/:shortUrl` (public redirect endpoint)

## Key Components

### Authentication
- `LoginForm` - User sign-in with email/password
- `SignupForm` - User registration with validation
- `authService` - Authentication logic and token management

### URL Management
- `CreateUrlForm` - Form to create new short URLs
- `UrlList` - Display and manage existing URLs
- `urlService` - API calls for URL operations

### Analytics
- `MetricsDashboard` - Charts and statistics visualization
- Click tracking and performance metrics
- Interactive charts using Recharts

### Dashboard
- `DashboardNav` - Top navigation with user info
- `DashboardSidebar` - Left sidebar navigation
- Responsive layout for all screen sizes

## Features in Detail

### 1. User Authentication
- Secure JWT-based authentication
- Protected routes with middleware
- Automatic token refresh handling
- Secure logout functionality

### 2. URL Shortening
- Input validation with Zod schemas
- Instant short URL generation
- Copy-to-clipboard functionality
- URL testing and management

### 3. Analytics & Metrics
- Real-time click tracking
- Performance visualization
- Bar charts and pie charts
- Recent activity monitoring

### 4. Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Consistent design system
- Accessibility considerations

## Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Server-side data fetching
- Optimistic updates

### Performance
- Next.js App Router optimizations
- Image optimization
- Code splitting
- Lazy loading where appropriate

## Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### Deployment Platforms

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## Backend Requirements

Make sure your Tiny URL Backend is running and includes:
- User authentication endpoints
- URL CRUD operations
- Click tracking functionality
- CORS enabled for frontend domain
- JWT token validation

---

Built with ❤️ using Next.js and modern web technologies.
