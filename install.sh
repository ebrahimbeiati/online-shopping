#!/bin/bash

echo "🚀 Setting up Online Shopping - Next.js E-commerce Platform"
echo "=========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your Firebase configuration"
else
    echo "✅ .env.local already exists"
fi

# Build check
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! To start development:"
    echo "   npm run dev"
    echo ""
    echo "📝 Don't forget to:"
    echo "   1. Update .env.local with your Firebase credentials"
    echo "   2. Configure Firebase security rules"
    echo "   3. Set up your Firebase project"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
