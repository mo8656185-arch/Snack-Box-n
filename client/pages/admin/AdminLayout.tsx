import { useState, ReactNode } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Settings,
  Image,
  FileText,
  Users,
  Package,
  Sparkles,
  Video,
  Search,
  MessageCircle,
  Menu,
  X,
  Save,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      path: "/admin",
      icon: Settings,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin/hero",
      icon: Image,
      label: "Hero Section",
    },
    {
      path: "/admin/carousel",
      icon: Package,
      label: "Banner Carousel",
    },
    {
      path: "/admin/features",
      icon: Sparkles,
      label: "Features",
    },
    {
      path: "/admin/products",
      icon: Package,
      label: "Products",
    },
    {
      path: "/admin/testimonials",
      icon: Users,
      label: "Testimonials",
    },
    {
      path: "/admin/tiktok",
      icon: Video,
      label: "TikTok Videos",
    },
    {
      path: "/admin/cta",
      icon: MessageCircle,
      label: "Call to Action",
    },
    {
      path: "/admin/seo",
      icon: Search,
      label: "SEO Settings",
    },
    {
      path: "/admin/popups",
      icon: MessageCircle,
      label: "Popups",
    },
    {
      path: "/admin/footer",
      icon: FileText,
      label: "Footer",
    },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-logo-green to-green-500 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Gift A Snack</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      active
                        ? "bg-logo-green text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>← Back to Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 lg:flex-none">
              <h2 className="text-2xl font-bold text-gray-900">
                Content Management
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                Preview Site
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
