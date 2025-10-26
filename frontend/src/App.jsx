import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Companies from './pages/Companies'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import Settings from './pages/Settings'
import { InvoiceSidebar } from './components/InvoiceSidebar'
import Dashboard from './components/Dashboard'
import { Menu, X } from 'lucide-react'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    console.log('Sidebar toggle clicked, current state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className='min-h-screen bg-gray-900 flex'>
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden flex-shrink-0`}>
        <InvoiceSidebar />
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col bg-gray-900 min-w-0'>
        {/* Top Bar with Sidebar Toggle */}
        <div className='bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between'>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 z-10 relative'
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
          
          {/* Logo/Brand */}
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <span className='text-lg font-bold text-white'>InvoiceGen</span>
          </div>
        </div>

        {/* Page Content */}
        <main className='flex-1 overflow-auto bg-gray-900'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/companies' element={<Companies/>} />
            <Route path='/customers' element={<Customers/>} />
            <Route path='/invoices' element={<Invoices/>} />
            <Route path='/settings' element={<Settings/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App