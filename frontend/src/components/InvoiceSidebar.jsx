import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Plus, Settings, Building2, Users } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Companies", icon: Building2, url: "/companies" },
  { title: "Customers", icon: Users, url: "/customers" },
  { title: "Invoices", icon: FileText, url: "/invoices" },
  { title: "New Invoice", icon: Plus, url: "/invoices/new" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function InvoiceSidebar() {
  return (
    <aside className="w-full h-screen bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">InvoiceGen</h2>
            <p className="text-xs text-gray-400">Invoice</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pl-2">
          Menu
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gray-800 text-white shadow-sm"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}