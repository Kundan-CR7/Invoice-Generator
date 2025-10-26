import { useEffect, useState } from "react";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Save,
  CheckCircle,
  Upload,
  X
} from "lucide-react";
import { api } from "../components/services/api";

export default function Settings() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    logoUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      loadCompanyData(selectedCompany);
    }
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
      if (res.data.length > 0) {
        setSelectedCompany(res.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  const loadCompanyData = async (companyId) => {
    try {
      const res = await api.get(`/companies/${companyId}`);
      const company = res.data;
      setFormData({
        name: company.name || "",
        email: company.email || "",
        phone: company.phone || "",
        address: company.address || "",
        gstNumber: company.gstNumber || "",
        logoUrl: company.logoUrl || ""
      });
    } catch (err) {
      console.error("Failed to load company data:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put(`/companies/${selectedCompany}`, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      fetchCompanies(); // Refresh list
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file and get URL
      // For now, just show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedLogo(event.target.result);
        setFormData(prev => ({
          ...prev,
          logoUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const Button = ({ children, onClick, variant = "default", disabled = false }) => {
    const base = "px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    if (variant === "outline") {
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${base} border border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
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
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-300">Manage your company information and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Saved!</span>
            </div>
          )}
        </div>
      </div>

      {/* Company Selection */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Select Company</h2>
        <select
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Company Information */}
      {selectedCompany && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
                style={{ color: '#ffffff' }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="company@example.com"
                style={{ color: '#ffffff' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 234 567 8900"
                style={{ color: '#ffffff' }}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Street address"
                style={{ color: '#ffffff' }}
              />
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="GSTIN"
                style={{ color: '#ffffff' }}
              />
            </div>

            {/* Logo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
              <div className="flex items-center gap-4">
                {selectedLogo && (
                  <div className="relative">
                    <img src={selectedLogo} alt="Logo" className="w-20 h-20 rounded-lg object-cover" />
                    <button
                      onClick={() => {
                        setSelectedLogo(null);
                        setFormData(prev => ({ ...prev, logoUrl: "" }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Logo
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="w-4 h-4 mr-2 inline" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}

      {/* Additional Settings Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>
        <p className="text-gray-300 mb-4">Customize your invoice appearance</p>
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <p className="text-white font-medium">Dark Mode</p>
            <p className="text-gray-400 text-sm">Interface is in dark mode</p>
          </div>
          <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

