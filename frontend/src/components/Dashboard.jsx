import { useEffect, useState } from "react";
import { FileText, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../components/services/api";

/* -------------------------------------------------
   2. Simple currency formatter (no external lib)
   ------------------------------------------------- */
function formatCurrency(value) {
  return "₹" + value.toFixed(2);
}

/* -------------------------------------------------
   3. Re-usable Card (replaces DashboardCard)
   ------------------------------------------------- */
function DashboardCard({ title, value, icon: Icon, description }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-900 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-bold text-white mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------
   4. Re-usable Button (replaces ui/button)
   ------------------------------------------------- */
function Button({ children, onClick, variant = "default" }) {
  const base =
    "px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  if (variant === "outline") {
    return (
      <button
        onClick={onClick}
        className={`${base} border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500`}
      >
        {children}
      </button>
    );
  }

  // primary gradient
  return (
    <button
      onClick={onClick}
      className={`${base} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg focus:ring-blue-500`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------
   5. Dashboard component
   ------------------------------------------------- */
export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load real data from API
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/invoices");
      console.log("API response:", res.data);
      setInvoices(res.data || []);
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter invoices created today
  const todayInvoices = invoices.filter((inv) => {
    const invoiceDate = new Date(inv.createdAt);
    invoiceDate.setHours(0, 0, 0, 0);
    return invoiceDate.getTime() === today.getTime();
  });

  // Calculate statistics
  const totalInvoices = invoices.length;
  
  // Today's revenue (from invoices created today)
  const todayRevenue = todayInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + (inv.total || 0), 0);
  
  // All-time revenue
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + (inv.total || 0), 0);
  
  const pendingInvoices = invoices.filter(
    (inv) => inv.status === "pending"
  ).length;
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
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
            Dashboard
          </h1>
          <p className="text-gray-300">
            Welcome back! Here's your invoice overview.
          </p>
        </div>
        <Button onClick={() => navigate("/invoices/new")}>
          Create Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Invoices"
          value={totalInvoices}
          icon={FileText}
          description="All time invoices"
        />
        <DashboardCard
          title="Today's Revenue"
          value={formatCurrency(todayRevenue)}
          icon={DollarSign}
          description="Revenue for today"
        />
        <DashboardCard
          title="Pending"
          value={pendingInvoices}
          icon={Clock}
          description="Awaiting payment"
        />
        <DashboardCard
          title="Paid"
          value={paidInvoices}
          icon={CheckCircle}
          description="Completed invoices"
        />
      </div>

      {/* Get-Started Card */}
      <div className="rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 p-8 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">
          Get Started
        </h2>
        <p className="text-gray-300 mb-6">
          Create your first invoice and start managing your business finances
          with ease.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/invoices")}>
            Create First Invoice
          </Button>
          <Button variant="outline" onClick={() => navigate("/companies")}>
            Setup Company Info
          </Button>
        </div>
      </div>
    </div>
  );
}