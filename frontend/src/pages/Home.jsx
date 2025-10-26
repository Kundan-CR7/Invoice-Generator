import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: "🏢",
      title: "Company Management",
      description: "Create and manage your company profiles with complete business information including logo, GST number, and contact details.",
      link: "/companies",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: "👥",
      title: "Customer Management",
      description: "Organize your customer database with detailed profiles, contact information, and company associations.",
      link: "/customers",
      color: "from-emerald-500 to-emerald-700"
    },
    {
      icon: "📦",
      title: "Product Catalog",
      description: "Maintain a comprehensive product catalog with pricing, descriptions, and company-specific inventory.",
      link: "/products",
      color: "from-violet-500 to-violet-700"
    },
    {
      icon: "🧾",
      title: "Invoice Creation",
      description: "Generate professional invoices with multiple items, tax calculations, discounts, and automatic numbering.",
      link: "/invoices",
      color: "from-amber-500 to-amber-700"
    },
    {
      icon: "📄",
      title: "PDF Generation",
      description: "Download beautifully formatted PDF invoices with your company branding and professional layout.",
      link: "/invoices",
      color: "from-rose-500 to-rose-700"
    },
    {
      icon: "📊",
      title: "Invoice Tracking",
      description: "Monitor invoice status, track payments, and manage your billing workflow efficiently.",
      link: "/invoices",
      color: "from-indigo-500 to-indigo-700"
    }
  ];

  const stats = [
    { label: "Companies", value: "Unlimited", icon: "🏢", color: "text-blue-600" },
    { label: "Customers", value: "Unlimited", icon: "👥", color: "text-emerald-600" },
    { label: "Products", value: "Unlimited", icon: "📦", color: "text-violet-600" },
    { label: "Invoices", value: "Unlimited", icon: "🧾", color: "text-amber-600" }
  ];

  const steps = [
    {
      number: "01",
      title: "Set Up Your Company",
      description: "Create your company profile with business details, logo, and contact information.",
      color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
      number: "02",
      title: "Add Customers & Products",
      description: "Build your customer database and product catalog to streamline invoice creation.",
      color: "bg-emerald-50 border-emerald-200 text-emerald-600"
    },
    {
      number: "03",
      title: "Create & Send Invoices",
      description: "Generate professional invoices and download them as PDFs for your clients.",
      color: "bg-violet-50 border-violet-200 text-violet-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IG</span>
              </div>
              <span className="text-xl font-bold text-slate-900">InvoiceGen</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/companies" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Companies
              </Link>
              <Link to="/customers" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Customers
              </Link>
              <Link to="/invoices" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Invoices
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/companies"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              <span className="text-blue-700 font-medium text-sm">Trusted by 10,000+ businesses worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
              Professional
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Invoicing Made Simple
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create beautiful, professional invoices in minutes. Streamline your billing process and get paid faster with our modern, intuitive platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/companies"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative">Start Free Trial</span>
              </Link>
              
              <Link
                to="/invoices"
                className="group bg-white hover:bg-slate-50 text-slate-900 px-10 py-5 rounded-xl text-lg font-semibold border-2 border-slate-300 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>🎬</span>
                <span>Watch Demo</span>
              </Link>
            </div>
            
            <div className="mt-16 flex items-center justify-center space-x-12 text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-200"
              >
                <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
              <span className="text-blue-700 font-medium text-sm">FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Manage Your Business
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools you need to create professional invoices and manage your business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 p-8 border border-slate-200 hover:border-slate-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-200 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-500"></div>
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                <Link
                  to={feature.link}
                  className={`inline-flex items-center text-lg font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent hover:opacity-80 transition-all duration-300 group/link`}
                >
                  <span>Explore feature</span>
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6">
              <span className="text-blue-700 font-medium text-sm">GET STARTED</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple Steps to
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Get Started
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-xl relative bg-white"
              >
                <div className={`w-20 h-20 rounded-2xl ${step.color} border-2 flex items-center justify-center text-2xl font-bold mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {step.number}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 text-lg leading-relaxed">
                  {step.description}
                </p>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-r-2 border-b-2 border-slate-200 rotate-45 rounded-sm group-hover:border-slate-300 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-700/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Invoicing Process?
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses that trust our platform for their invoicing needs. Start creating professional invoices in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/companies"
              className="group bg-white hover:bg-slate-100 text-slate-900 px-12 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-2xl flex items-center space-x-3"
            >
              <span>🚀</span>
              <span>Start Free Trial</span>
            </Link>
            
            <Link
              to="/contact"
              className="group bg-transparent hover:bg-white/10 text-white px-12 py-5 rounded-xl text-lg font-semibold border-2 border-white/30 hover:border-white transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>📞</span>
                <span>Book a Demo</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">IG</span>
                </div>
                <span className="text-2xl font-bold text-white">InvoiceGen</span>
              </div>
              <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
                Professional invoicing made simple. Create beautiful invoices, manage your business, and get paid faster.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-slate-300">📘</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-slate-300">🐦</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-slate-300">📸</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
              <div className="space-y-4">
                <Link to="/features" className="block text-slate-400 hover:text-white transition-colors">Features</Link>
                <Link to="/pricing" className="block text-slate-400 hover:text-white transition-colors">Pricing</Link>
                <Link to="/templates" className="block text-slate-400 hover:text-white transition-colors">Templates</Link>
                <Link to="/integrations" className="block text-slate-400 hover:text-white transition-colors">Integrations</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <div className="space-y-4">
                <Link to="/about" className="block text-slate-400 hover:text-white transition-colors">About</Link>
                <Link to="/blog" className="block text-slate-400 hover:text-white transition-colors">Blog</Link>
                <Link to="/careers" className="block text-slate-400 hover:text-white transition-colors">Careers</Link>
                <Link to="/contact" className="block text-slate-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm mb-4 md:mb-0">
              © 2024 InvoiceGen. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-500">
              <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-slate-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;