#!/bin/bash

# Invoice Generator Startup Script

echo "🚀 Starting Invoice Generator Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to start backend
start_backend() {
    echo "📦 Starting Backend Server..."
    cd backend
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing backend dependencies..."
        npm install
    fi
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        echo "⚠️  .env file not found. Creating a sample .env file..."
        cat > .env << EOF
DATABASE_URL="postgresql://username:password@localhost:5432/invoice_generator"
DIRECT_URL="postgresql://username:password@localhost:5432/invoice_generator"
PORT=3000
EOF
        echo "📝 Please update the .env file with your database credentials."
    fi
    
    echo "🔄 Running Prisma migrations..."
    npx prisma migrate dev --name init
    
    # Ask if user wants to create demo data
    echo ""
    read -p "🤔 Would you like to create demo data? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📊 Creating demo data..."
        node ../demo-data.js
    fi
    
    echo "🌐 Starting backend server on http://localhost:3000"
    npm start &
    BACKEND_PID=$!
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "📦 Starting Frontend Server..."
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing frontend dependencies..."
        npm install
    fi
    
    echo "🌐 Starting frontend server on http://localhost:5173"
    npm run dev &
    FRONTEND_PID=$!
    cd ..
}

# Start both servers
start_backend
sleep 3
start_frontend

echo ""
echo "✅ Invoice Generator is now running!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
