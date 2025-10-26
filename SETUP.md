# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Git

## 🎯 Quick Start (Recommended)

1. **Run the startup script:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

2. **Follow the prompts:**
   - The script will install dependencies
   - Create a sample `.env` file
   - Run database migrations
   - Ask if you want demo data (recommended for first time)
   - Start both servers

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🗄️ Database Setup

### Option 1: Local PostgreSQL
1. Install PostgreSQL
2. Create a database: `createdb invoice_generator`
3. Update `.env` file with your credentials

### Option 2: Cloud Database (Recommended)
1. Use services like:
   - [Supabase](https://supabase.com) (Free tier available)
   - [Railway](https://railway.app) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)
2. Copy the connection string to `.env`

### Environment Variables
Create `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_generator"
DIRECT_URL="postgresql://username:password@localhost:5432/invoice_generator"
PORT=3000
```

## 🎨 Features Overview

### 🏠 Home Page
- Beautiful landing page with feature overview
- Quick access to all functionality
- Professional design with animations

### 🏢 Company Management
- Add company details (name, email, phone, address)
- Upload company logo
- Add GST number
- View all companies in a modern table

### 👥 Customer Management
- Create customer profiles
- Link customers to companies
- Filter customers by company
- Store contact information

### 📦 Product Management
- Add products with pricing
- Link products to companies
- Manage product descriptions
- View product catalog

### 🧾 Invoice Management
- Create professional invoices
- Add multiple items with quantities
- Calculate taxes and discounts
- Generate PDF invoices
- Track invoice status

## 🎯 Demo Data

The application includes a demo data script that creates:
- 1 Sample company (Acme Corporation)
- 3 Sample customers
- 4 Sample products
- 2 Sample invoices

To add demo data manually:
```bash
cd backend
node ../demo-data.js
```

## 🔧 Manual Setup

If you prefer manual setup:

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎨 Customization

### Colors
The app uses Tailwind CSS. Main colors:
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Styling
- All input text is black for better readability
- Responsive design works on all devices
- Modern animations and transitions
- Professional color scheme

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `.env` file
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Port Already in Use**
   - Backend: Change PORT in `.env`
   - Frontend: Vite will suggest alternative port

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Migration Errors**
   - Reset database: `npx prisma migrate reset`
   - Run migrations: `npx prisma migrate dev`

### Getting Help
- Check console for error messages
- Verify all environment variables
- Ensure all dependencies are installed
- Check database connection

## 🚀 Production Deployment

### Backend
1. Set up production database
2. Update environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Deploy to your hosting service

### Frontend
1. Build: `npm run build`
2. Deploy `dist` folder to your hosting service

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎉 You're Ready!

Your invoice generator is now ready to use. Start by:
1. Adding your company information
2. Creating customers
3. Adding products
4. Creating your first invoice!

---

**Need help?** Check the main README.md for detailed documentation.
