import { useEffect, useState } from "react";
import { api } from "../components/services/api";
import { Users, Plus, Building2, Mail, Phone, MapPin, Calendar, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCompanyId, setFilterCompanyId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    fetchCompanies();
    fetchCustomers();
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCompanyId]);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCustomer = async () => {
    if (!formData.companyId) return alert("Please select a company");
    if (!formData.name) return alert("Name is required");

    try {
      setLoading(true);
      await api.post("/customers", formData);

      // Reset form
      setFormData({
        companyId: "",
        name: "",
        email: "",
        phone: "",
        address: ""
      });

      fetchCustomers();
    } catch (err) {
      console.error("Failed to add customer:", err);
      alert("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  // Filtered customers for display
  const filteredCustomers = filterCompanyId
    ? customers.filter((c) => c.companyId === filterCompanyId)
    : customers;

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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

  // Customer Card component
  function CustomerCard({ customer }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{customer.company?.name || 'No Company'}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {customer.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span className="line-clamp-2">{customer.address}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>Created {new Date(customer.createdAt).toLocaleDateString()}</span>
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your customer information and relationships
          </p>
        </div>
        <Button onClick={() => document.getElementById('add-customer-form')?.scrollIntoView({ behavior: 'smooth' })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Customers
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {customers.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            All registered customers
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            With Company
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {customers.filter(c => c.companyId).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Assigned to companies
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            With Email
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {customers.filter(c => c.email).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Email addresses
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            This Month
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {customers.filter(c => {
              const created = new Date(c.createdAt);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            New customers
          </p>
        </div>
      </div>

      {/* Add Customer Form */}
      <div id="add-customer-form" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Customer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:!text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              name="companyId"
              value={formData.companyId}
              onChange={handleInputChange}
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:!text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Enter customer name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ color: '#ffffff' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:!text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Enter email address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ color: '#ffffff' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:!text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{ color: '#ffffff' }}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:!text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Enter customer address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              style={{ color: '#ffffff' }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={addCustomer} disabled={loading}>
            {loading ? 'Adding...' : 'Add Customer'}
          </Button>
        </div>
      </div>

      {/* Company Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Company:</label>
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={filterCompanyId}
            onChange={(e) => setFilterCompanyId(e.target.value)}
          >
            <option value="">All Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {filterCompanyId && (
            <Button variant="outline" onClick={() => setFilterCompanyId("")}>
              Clear Filter
            </Button>
          )}
        </div>
      </div>

      {/* Customers Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          All Customers {filterCompanyId && `(${filteredCustomers.length})`}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-gray-600 dark:text-gray-400">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filterCompanyId 
                ? "No customers found for the selected company." 
                : "No customers found"
              }
            </p>
            <p className="text-gray-400 dark:text-gray-500">Add your first customer above to get started</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({filteredCustomers.length} total customers)
                  </span>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
