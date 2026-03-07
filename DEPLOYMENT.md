# MEL Laundry - Deployment Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- MongoDB database (local or cloud)

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your actual values:
   - `PRODUCTION_API_URL`: Your production API URL
   - `ALLOWED_ORIGIN`: Your production domain
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure secret key
   - `RESEND_API_KEY`: Your Resend API key for emails

## Installation

```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Development

```bash
# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend
```

## Production Build

```bash
# Full production build with checks
npm run build:production

# Build only
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

### Docker Deployment

1. Build image:
   ```bash
   docker build -t mel-laundry .
   ```

2. Run container:
   ```bash
   docker run -p 3000:3000 --env-file .env.local mel-laundry
   ```

### Traditional Server

1. Build the application:
   ```bash
   npm run build:production
   ```

2. Start production server:
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PRODUCTION_API_URL` | Production API endpoint | Yes |
| `ALLOWED_ORIGIN` | CORS allowed origin | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `RESEND_API_KEY` | Resend email API key | Yes |
| `NEXT_PUBLIC_API_URL` | Public API URL | Yes |
| `NODE_ENV` | Environment mode | Yes |

## Troubleshooting

### Build Errors
- Run `npm run type-check` to check TypeScript errors
- Run `npm run lint` to check ESLint errors
- Ensure all environment variables are set

### Runtime Errors
- Check MongoDB connection
- Verify JWT secret is set
- Ensure all API endpoints are accessible

### Performance Issues
- Use `npm run analyze` to check bundle size
- Optimize images and assets
- Enable caching headers

## Monitoring

- Use Vercel Analytics for performance monitoring
- Check error logs in deployment platform
- Monitor API response times

## Security

- Keep dependencies updated
- Use HTTPS in production
- Set proper CORS origins
- Validate all user inputs
- Use environment variables for secrets
