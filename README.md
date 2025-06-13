# E-Commerce Platform

A full-stack e-commerce platform built with Laravel (Backend) and React/Vue.js (Frontend).

## Project Structure

```
ecommerce/
├── backend/                 # Laravel Backend
│   ├── app/                # Application code
│   ├── bootstrap/          # Framework bootstrap files
│   ├── config/            # Configuration files
│   ├── database/          # Database migrations and seeds
│   ├── public/            # Public assets
│   ├── resources/         # Views, raw assets
│   ├── routes/            # API routes
│   ├── storage/           # Application storage
│   ├── tests/             # Automated tests
│   ├── vendor/            # Composer dependencies
│   ├── .env.example       # Environment configuration example
│   ├── artisan            # Laravel CLI
│   └── composer.json      # PHP dependencies
│
├── frontend/              # React/Vue.js Frontend
│   ├── public/           # Static files
│   ├── src/              # Source code
│   ├── package.json      # Node.js dependencies
│   └── vite.config.js    # Vite configuration
│
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Copy .env.example to .env:
   ```bash
   cp .env.example .env
   ```
4. Generate application key:
   ```bash
   php artisan key:generate
   ```
5. Configure database in .env file
6. Run migrations:
   ```bash
   php artisan migrate
   ```
7. Start the server:
   ```bash
   php artisan serve
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## AWS Deployment

### Backend Deployment
1. Set up an EC2 instance
2. Install required software:
   - PHP 8.1+
   - Composer
   - MySQL/PostgreSQL
   - Nginx/Apache
3. Deploy using AWS Elastic Beanstalk or manual deployment

### Frontend Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy to AWS S3 or CloudFront

## Environment Variables

### Backend (.env)
```
APP_NAME=Ecommerce
APP_ENV=production
APP_KEY=your-key
APP_DEBUG=false
APP_URL=your-domain

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_DEFAULT_REGION=your-region
AWS_BUCKET=your-bucket
```

### Frontend (.env)
```
VITE_API_URL=your-backend-url
VITE_APP_NAME=Ecommerce
``` 