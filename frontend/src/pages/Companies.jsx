import React, { useEffect, useState } from 'react'
import { api } from '../components/services/api'
import { Building2, Plus, Users, Calendar, MapPin, Phone, Mail } from "lucide-react";

const Companies = () => {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        logoUrl: '',
        gstNumber: ''
    })

    const fetchCompanies = async() => {
        try {
            setLoading(true)
            const res = await api.get('/companies')
            setCompanies(res.data)
        } catch (error) {
            console.error('Error fetching companies:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCompanies();
    },[])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addCompany = async() => {
        if(!formData.name) return alert("Company name is required")
        
        try {
            setLoading(true)
            await api.post('/companies', formData)
            setFormData({
                name: '',
                email: '',
                address: '',
                phone: '',
                logoUrl: '',
                gstNumber: ''
            })
            fetchCompanies();
        } catch (error) {
            console.error('Error creating company:', error)
            alert('Failed to create company')
        } finally {
            setLoading(false)
        }
    }

    // Re-usable Button component matching Dashboard style
    function Button({ children, onClick, variant = "default", disabled = false }) {
        const base = "px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

        if (variant === "outline") {
            return (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`${base} border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {children}
                </button>
            );
        }

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`${base} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {children}
            </button>
        );
    }

    // Company Card component
    function CompanyCard({ company }) {
        return (
            <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {company.logoUrl ? (
                            <img className="w-12 h-12 rounded-lg object-cover" src={company.logoUrl} alt={company.name} />
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                            <p className="text-sm text-gray-400">Company</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    {company.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span>{company.email}</span>
                        </div>
                    )}
                    {company.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Phone className="w-4 h-4" />
                            <span>{company.phone}</span>
                        </div>
                    )}
                    {company.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span className="line-clamp-2">{company.address}</span>
                        </div>
                    )}
                    {company.gstNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="font-medium">GST:</span>
                            <span>{company.gstNumber}</span>
                        </div>
                    )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>Created {new Date(company.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Companies
                    </h1>
                    <p className="text-gray-300">
                        Manage your company information and settings
                    </p>
                </div>
                <Button onClick={() => document.getElementById('add-company-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Company
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-900 rounded-lg">
                            <Building2 className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">
                        Total Companies
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {companies.length}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        All registered companies
                    </p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-900 rounded-lg">
                            <Users className="w-5 h-5 text-green-400" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">
                        Active Companies
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {companies.filter(c => c.email || c.phone).length}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        With contact info
                    </p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-900 rounded-lg">
                            <MapPin className="w-5 h-5 text-purple-400" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">
                        With Address
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {companies.filter(c => c.address).length}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Complete addresses
                    </p>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-orange-900 rounded-lg">
                            <Calendar className="w-5 h-5 text-orange-400" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">
                        This Month
                    </h3>
                    <p className="text-2xl font-bold text-white mt-1">
                        {companies.filter(c => {
                            const created = new Date(c.createdAt);
                            const now = new Date();
                            return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                        }).length}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        New companies
                    </p>
                </div>
            </div>

            {/* Add Company Form */}
            <div id="add-company-form" className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-6">Add New Company</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter company name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter email address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">GST Number</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter GST number"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter logo URL"
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleInputChange}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                            placeholder="Enter company address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            style={{ color: '#ffffff' }}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button onClick={addCompany} disabled={loading}>
                        {loading ? 'Adding...' : 'Add Company'}
                    </Button>
                </div>
            </div>

            {/* Companies Grid */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">All Companies</h2>
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="ml-3 text-gray-300">Loading companies...</p>
                    </div>
                ) : companies.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 text-lg">No companies found</p>
                        <p className="text-gray-400">Add your first company above to get started</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {companies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Companies