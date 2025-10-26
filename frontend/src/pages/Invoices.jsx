import { useEffect, useState } from "react";
import { api } from "../components/services/api";
import { FileText, Plus, Package, Download, DollarSign, Calendar, Building2, Users, ShoppingCart, Search, X } from "lucide-react";

export default function Invoices() {
  const [companies, setCompanies] = useState([]);
  const [customers, setCustomers] = useState([]);     //Customers by ComapnyID
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);     //Product lists
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const [productForm, setProductForm] = useState({
    companyId: "",
    name: "",
    price: "",
    description: ""
  });

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

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (selectedCompany) fetchCustomers(selectedCompany);
    else setCustomers([]);
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    try {
    const res = await api.get("/companies");
    setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchCustomers = async (companyId) => {
    try {
      const res = await api.get(`/customers/company/${companyId}`);
    setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
    const res = await api.get("/products");
    setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setSelectedItems([
      ...selectedItems,
      { productId: "", qty: 1, price: 0, name: "" },
    ]);
  };

  const updateItem = (index, field, value) => {
    const items = [...selectedItems];
    items[index][field] = value;

    // If productId changes, update name & price
    if (field === "productId") {
      const product = products.find((p) => p.id === value);
      if (product) {
        items[index].name = product.name;
        items[index].price = product.price;
      }
    }
    setSelectedItems(items);
  };

  const removeItem = (index) => {
    const items = [...selectedItems];
    items.splice(index, 1);
    setSelectedItems(items);
  };

  const createInvoice = async () => {
    if (!selectedCompany || !selectedCustomer || selectedItems.length === 0) {
      return alert("Company, Customer and at least one product are required");
    }

    const payload = {
      companyId: selectedCompany,
      customerId: selectedCustomer,
      items: selectedItems.map((i) => ({
        name: i.name,
        price: parseFloat(i.price),
        qty: parseInt(i.qty),
      })),
      taxRate: parseFloat(taxRate),
      discount: parseFloat(discount),
      dueDate,
    };

    try {
      setLoading(true);
      const res = await api.post("/invoices", payload);
      alert(`Invoice ${res.data.invoice.number} created successfully`);
      // Reset form
      setSelectedItems([]);
      setSelectedCompany("");
      setSelectedCustomer("");
      setTaxRate(0);
      setDiscount(0);
      setDueDate("");
      fetchInvoices();
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    if (!productForm.companyId || !productForm.name || !productForm.price) {
      return alert("Company, name, and price are required");
    }

    try {
      setLoading(true);
      await api.post("/products", productForm);
      setProductForm({
        companyId: "",
        name: "",
        price: "",
        description: ""
      });
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (invoiceId) => {
    try {
      const response = await api.get(`/invoices/pdf/${invoiceId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  const calculateTotal = () => {
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount - discount;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Invoice Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create invoices, manage products, and track your business
          </p>
        </div>
        <Button onClick={() => setActiveTab("create")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Invoices
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {invoices.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            All invoices created
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Products
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {products.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Available products
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ₹{invoices.reduce((sum, inv) => sum + (inv.total || 0), 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            From all invoices
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
            {invoices.filter(inv => {
              const created = new Date(inv.issueDate);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            New invoices
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex px-6">
            <button
              onClick={() => setActiveTab("create")}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "create"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <FileText className="w-4 h-4 mr-2 inline" />
              Create Invoice
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Package className="w-4 h-4 mr-2 inline" />
              Manage Products
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "invoices"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2 inline" />
              View Invoices
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Create Invoice Tab */}
          {activeTab === "create" && (
            <div className="space-y-6">
              <h2 className="text-xl text-center text-white font-bold font-serif">Create New Invoice</h2>
              
              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company *</label>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer *</label>
                    <select
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                      disabled={!selectedCompany}
                    >
                      <option value="">Select Customer</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label>
                    <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                    placeholder="0"
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount (₹)</label>
                    <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                    placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                    <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                    />
                  </div>
                </div>

              <div>
                <div className="flex justify-center items-center mb-4 space-x-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>Invoice Items</h3>
                  <Button onClick={addItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {selectedItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product</label>
                    <select
                    value={item.productId}
                    onChange={(e) => updateItem(index, "productId", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                    >
                      <option value="">Select Product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateItem(index, "qty", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total</label>
                    <div className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={() => removeItem(index)}>
                    Remove
                  </Button>
                </div>
              </div>
              ))}

                {selectedItems.length > 0 && (
                  <div className="mt-6 p-6 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-gray-700">
                    <div className="flex justify-center items-center text-xl font-bold text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                      <span>Total: ₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={createInvoice}
                  disabled={loading || !selectedCompany || !selectedCustomer || selectedItems.length === 0}
                >
                  {loading ? 'Creating...' : 'Create Invoice'}
                </Button>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <h2 className="text-xl text-center font-bold text-gray-900 font-serif dark:text-white" style={{ color: '#ffffff' }}>Manage Products</h2>
              
              {/* Add Product Form */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-4">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company *</label>
                    <select
                      value={productForm.companyId}
                      onChange={(e) => setProductForm(prev => ({...prev, companyId: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name *</label>
                    <input
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({...prev, price: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <input
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" style={{ color: '#ffffff' }}
                      placeholder="Enter description"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button onClick={addProduct} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                  </Button>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="text-lg text-center font-medium text-gray-900 dark:text-white mb-4">All Products</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            {product.company?.name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            ₹{product.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {product.description || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="space-y-6">
              <h2 className="text-xl text-center font-bold text-gray-900 font-serif dark:text-white" style={{ color: '#ffffff' }}>All Invoices</h2>
              
              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices by number, company, customer, or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ color: '#ffffff' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="ml-3 text-gray-600 dark:text-gray-400">Loading invoices...</p>
                </div>
              ) : invoices.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No invoices found</p>
                  <p className="text-gray-400 dark:text-gray-500">Create your first invoice above to get started</p>
                </div>
              ) : (
                <>
                  {/* Filter invoices based on search query */}
                  {(() => {
                    const filteredInvoices = searchQuery
                      ? invoices.filter((invoice) => {
                          const query = searchQuery.toLowerCase();
                          return (
                            invoice.number.toLowerCase().includes(query) ||
                            invoice.company?.name?.toLowerCase().includes(query) ||
                            invoice.customer?.name?.toLowerCase().includes(query) ||
                            invoice.status.toLowerCase().includes(query) ||
                            invoice.customer?.email?.toLowerCase().includes(query)
                          );
                        })
                      : invoices;

                    return (
                      <div className="overflow-x-auto">
                        {filteredInvoices.length === 0 ? (
                          <div className="text-center py-12">
                            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">No invoices found matching "{searchQuery}"</p>
                            <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                          </div>
                        ) : (
                          <>
                            <div className="mb-4 text-sm text-gray-400">
                              Showing {filteredInvoices.length} of {invoices.length} invoices
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice #</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            {invoice.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            {invoice.company?.name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" style={{ color: '#ffffff' }}>
                            {invoice.customer?.name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              invoice.status === 'PAID' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="outline" onClick={() => downloadPDF(invoice.id)}>
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
