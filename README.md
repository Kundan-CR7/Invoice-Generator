# 🧾 Invoice Generator

A modern, full-stack invoice management system built with React, Node.js, Express, and PostgreSQL. Create professional invoices, manage companies, customers, and products with a beautiful, responsive interface.

## ✨ Features

### 🏢 Company Management
- Add and manage company information
- Store company details (name, email, phone, address, GST number, logo)
- View all companies in a modern table layout

### 👥 Customer Management
- Create and manage customer profiles
- Link customers to specific companies
- Filter customers by company
- Store contact information and addresses

### 📦 Product Management
- Add products with pricing and descriptions
- Link products to companies
- Manage product catalog efficiently

### 🧾 Invoice Management
- Create professional invoices with multiple items
- Calculate taxes and discounts automatically
- Generate PDF invoices for download
- Track invoice status (Draft, Sent, Paid, Overdue)
- View all invoices with filtering options

### 🎨 Modern UI/UX
- Beautiful, responsive design with Tailwind CSS
- Intuitive navigation with tabbed interface
- Loading states and error handling
- Mobile-friendly design
- Professional color scheme and typography

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. **Set up the database**
   - Create a PostgreSQL database
   - Update the database connection string in `backend/.env`

3. **Run the application**
   ```bash
   # Make the startup script executable
   chmod +x start.sh
   
   # Start both backend and frontend
   ./start.sh
   ```

   Or start them manually:

   **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm start
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **PDFKit** - PDF generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
invoice-generator/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express server setup
│   ├── prisma/
│   │   ├── migrations/      # Database migrations
│   │   └── schema.prisma    # Database schema
│   └── assets/              # Static assets (fonts, logos)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   └── services/        # API service layer
│   └── public/              # Static files
└── start.sh                 # Startup script
```

## 🗄️ Database Schema

The application uses the following main entities:

- **Company** - Business information and settings
- **Customer** - Customer profiles linked to companies
- **Product** - Product catalog with pricing
- **Invoice** - Invoice records with items and calculations

## 🔧 API Endpoints

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/company/:companyId` - Get customers by company
- `POST /api/customers` - Create new customer

### Products
- `GET /api/products` - Get all products
- `GET /api/products/company/:companyId` - Get products by company
- `POST /api/products` - Create new product

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/company/:companyId` - Get invoices by company
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/pdf/:id` - Download invoice PDF

## 🎨 UI Components

### Modern Design Features
- **Responsive Layout** - Works on all device sizes
- **Card-based Design** - Clean, organized content sections
- **Interactive Tables** - Sortable, filterable data tables
- **Form Validation** - Real-time input validation
- **Loading States** - Smooth loading indicators
- **Status Badges** - Color-coded status indicators
- **Hover Effects** - Interactive element feedback

### Color Scheme
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Gray scale

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Input validation on both frontend and backend
- SQL injection prevention with Prisma ORM
- CORS configuration for API security
- Error handling without sensitive data exposure

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred hosting service

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify your database connection
3. Ensure all dependencies are installed
4. Check the API endpoints are accessible

## 🔮 Future Enhancements

- User authentication and authorization
- Invoice templates customization
- Email integration for sending invoices
- Advanced reporting and analytics
- Multi-currency support
- Invoice status workflow management
- Bulk operations for invoices
- Data export functionality

---

**Happy Invoicing! 🎉**
