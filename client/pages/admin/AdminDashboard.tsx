import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  FileText,
  Users,
  Package,
  Sparkles,
  Video,
  Search,
  MessageCircle,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAdminData, AdminData } from "@/lib/adminData";

const AdminDashboard = () => {
  const [data, setData] = useState<AdminData | null>(null);
  const [lastModified, setLastModified] = useState<string>("");

  useEffect(() => {
    const loadData = () => {
      const adminData = getAdminData();
      setData(adminData);

      // Check localStorage for last modified time
      const lastMod = localStorage.getItem("gift-a-snack-admin-data-modified");
      if (lastMod) {
        setLastModified(new Date(lastMod).toLocaleString());
      }
    };

    loadData();

    // Listen for data updates
    const handleDataUpdate = () => {
      loadData();
      localStorage.setItem(
        "gift-a-snack-admin-data-modified",
        Date.now().toString(),
      );
    };

    window.addEventListener("adminDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("adminDataUpdated", handleDataUpdate);
  }, []);

  const quickStats = [
    {
      label: "Products",
      value: data?.products?.length || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Testimonials",
      value: data?.testimonials?.length || 0,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Banner Images",
      value: data?.carousel?.images?.length || 0,
      icon: Image,
      color: "bg-purple-500",
    },
    {
      label: "TikTok Videos",
      value: data?.tiktok?.videos?.length || 0,
      icon: Video,
      color: "bg-pink-500",
    },
  ];

  const managementSections = [
    {
      title: "Hero Section",
      description: "Manage main banner, logo, title, and call-to-action",
      href: "/admin/hero",
      icon: Image,
      color: "bg-blue-500",
    },
    {
      title: "Banner Carousel",
      description: "Upload and manage rotating banner images",
      href: "/admin/carousel",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Features",
      description: "Edit feature cards and benefits section",
      href: "/admin/features",
      icon: Sparkles,
      color: "bg-yellow-500",
    },
    {
      title: "Products",
      description: "Manage product information, images, and descriptions",
      href: "/admin/products",
      icon: Package,
      color: "bg-green-500",
    },
    {
      title: "Popups",
      description: "Configure promotional popups for each product size",
      href: "/admin/popups",
      icon: MessageCircle,
      color: "bg-blue-500",
    },
    {
      title: "Testimonials",
      description: "Add and edit customer reviews and ratings",
      href: "/admin/testimonials",
      icon: Users,
      color: "bg-indigo-500",
    },
    {
      title: "TikTok Videos",
      description: "Manage social media video embeds",
      href: "/admin/tiktok",
      icon: Video,
      color: "bg-pink-500",
    },
    {
      title: "Call to Action",
      description: "Edit conversion sections and buttons",
      href: "/admin/cta",
      icon: MessageCircle,
      color: "bg-orange-500",
    },
    {
      title: "SEO Settings",
      description: "Manage meta tags, titles, and descriptions",
      href: "/admin/seo",
      icon: Search,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your Gift A Snack website content and settings
        </p>
        {lastModified && (
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last modified: {lastModified}</span>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Content Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} to={section.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-logo-green/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${section.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Preview Website</p>
                <p className="text-sm text-gray-600">View live changes</p>
              </div>
            </Link>

            <button
              onClick={() => {
                if (
                  confirm(
                    "This will reset all content to default values. Are you sure?",
                  )
                ) {
                  localStorage.removeItem("gift-a-snack-admin-data");
                  window.location.reload();
                }
              }}
              className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reset All Content</p>
                <p className="text-sm text-gray-600">Restore defaults</p>
              </div>
            </button>

            <button
              onClick={() => {
                const dataStr = JSON.stringify(getAdminData(), null, 2);
                const blob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "gift-a-snack-content.json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Export Content</p>
                <p className="text-sm text-gray-600">Download JSON backup</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Current SEO Info */}
      {data?.seo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Current SEO Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Meta Title</p>
                <p className="text-sm text-gray-600">{data.seo.metaTitle}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Meta Description
                </p>
                <p className="text-sm text-gray-600">
                  {data.seo.metaDescription}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Keywords</p>
                <p className="text-sm text-gray-600">{data.seo.metaKeywords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
