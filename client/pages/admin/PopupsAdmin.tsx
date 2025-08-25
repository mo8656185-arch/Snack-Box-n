import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Package2, ShoppingCart, ExternalLink } from "lucide-react";

type PopupData = AdminData["popups"][35];

const PopupsAdmin = () => {
  // Initialize with null to show loading state, then load actual data
  const [data, setData] = useState<AdminData["popups"] | null>(null);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["popups"] | null>(null);
  const [products, setProducts] = useState<AdminData["products"]>([]);
  const [previewPopup, setPreviewPopup] = useState<{
    popup: PopupData;
    size: string;
  } | null>(null);

  useEffect(() => {
    const adminData = getAdminData();
    // Load existing popup data or use defaults
    setData(adminData.popups);
    setOriginalData(adminData.popups);
    setProducts(adminData.products);
  }, []);

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      saveAdminData({ popups: data });
      setOriginalData(data);
      alert("Popups saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalData) {
      setData(originalData);
    }
  };

  const updatePopup = (
    size: keyof AdminData["popups"],
    updates: Partial<PopupData>,
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [size]: { ...prev[size], ...updates },
      };
    });
  };

  const getProductForSize = (size: string) => {
    return products.find((product) => product.size === `${size} ct`);
  };

  const PopupPreviewModal = ({
    popup,
    size,
    onClose,
  }: {
    popup: PopupData;
    size: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          {popup?.image && (
            <div className="mb-4">
              <img
                src={popup.image}
                alt="Popup"
                className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2"
              />
            </div>
          )}

          {popup?.title && (
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {popup.title}
            </h3>
          )}

          {popup?.description && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {popup.description}
            </p>
          )}

          {popup?.promotionalText && (
            <div className="bg-gradient-to-r from-logo-green/10 to-green-400/10 border border-logo-green/20 rounded-lg p-3 mb-4">
              <p className="text-logo-green font-semibold text-sm">
                🎉 {popup.promotionalText}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {popup?.orderNowLink && (
              <Button
                className="flex-1 bg-logo-green hover:bg-green-600 text-white font-bold"
                onClick={() => {
                  window.open(popup.orderNowLink, "_blank");
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            )}

            <Button
              variant="outline"
              className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => {
                // This would open the full product modal in the real implementation
                alert(`Would open full details for ${size} count product`);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              {popup?.viewDetailsButtonText || "View Full Details"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const productSizes = [
    {
      size: 35,
      label: "35 Count",
      color: "bg-blue-500",
      description: "Starter Pack",
    },
    {
      size: 42,
      label: "42 Count",
      color: "bg-green-500",
      description: "Popular Choice",
    },
    {
      size: 52,
      label: "52 Count",
      color: "bg-purple-500",
      description: "Best Value",
    },
    {
      size: 105,
      label: "105 Count",
      color: "bg-orange-500",
      description: "Ultimate Pack",
    },
  ];

  // Show loading state while data loads
  if (!data || !originalData) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Popups Management</h1>
          <p className="text-gray-600 mt-2">Loading popup data...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-logo-green"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Popups Management</h1>
        <p className="text-gray-600 mt-2">
          Manage promotional popups for each product size. These popups appear
          when customers click on product cards.
        </p>
      </div>

      {/* Preview Modal */}
      {previewPopup && (
        <PopupPreviewModal
          popup={previewPopup.popup}
          size={previewPopup.size}
          onClose={() => setPreviewPopup(null)}
        />
      )}

      <AdminSection
        title="Product Size Popups"
        description="Configure popups that appear when customers click on each product card. Each popup should entice customers to make a purchase and provide a way to view full product details."
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {productSizes.map(({ size, label, color, description }) => {
              const product = getProductForSize(size.toString());
              const popup = data[size as keyof AdminData["popups"]];
              const isConfigured =
                popup?.title && popup?.description && popup?.orderNowLink;

              return (
                <Card key={size} className="text-center">
                  <CardContent className="p-4">
                    <div
                      className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                      <Package2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-600 mb-2">{description}</p>
                    <Badge
                      variant={isConfigured ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {isConfigured ? "Configured" : "Needs Setup"}
                    </Badge>
                    {product && (
                      <p className="text-xs text-gray-500 mt-1">
                        ${product.price}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Individual Popup Configurations */}
          {productSizes.map(({ size, label, color, description }) => {
            const popup = data[size as keyof AdminData["popups"]];
            const product = getProductForSize(size.toString());

            return (
              <Card
                key={size}
                className="border-l-4"
                style={{
                  borderLeftColor:
                    color.replace("bg-", "").replace("-500", "") === "blue"
                      ? "#3b82f6"
                      : color.replace("bg-", "").replace("-500", "") === "green"
                        ? "#10b981"
                        : color.replace("bg-", "").replace("-500", "") ===
                            "purple"
                          ? "#8b5cf6"
                          : "#f97316",
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}
                        >
                          <Package2 className="w-4 h-4 text-white" />
                        </div>
                        {label} Popup Configuration
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">
                        {description} •{" "}
                        {product ? `$${product.price}` : "Product not found"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPreviewPopup({ popup, size: size.toString() })
                      }
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <FormGroup
                          label="Popup Title"
                          description="Compelling headline for this product size"
                        >
                          <Input
                            value={popup.title}
                            onChange={(e) =>
                              updatePopup(size as keyof AdminData["popups"], {
                                title: e.target.value,
                              })
                            }
                            placeholder={`e.g., ${description} - Perfect for...`}
                          />
                        </FormGroup>

                        <FormGroup
                          label="Description"
                          description="Detailed description that highlights the benefits of this size"
                        >
                          <Textarea
                            value={popup.description}
                            onChange={(e) =>
                              updatePopup(size as keyof AdminData["popups"], {
                                description: e.target.value,
                              })
                            }
                            placeholder={`Perfect ${description.toLowerCase()} with ${size} assorted snacks. Great for...`}
                            rows={4}
                          />
                        </FormGroup>

                        <FormGroup
                          label="Promotional Text"
                          description="Special offer or highlight for this product"
                        >
                          <Input
                            value={popup.promotionalText}
                            onChange={(e) =>
                              updatePopup(size as keyof AdminData["popups"], {
                                promotionalText: e.target.value,
                              })
                            }
                            placeholder="Limited time offer with free shipping!"
                          />
                        </FormGroup>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <FormGroup
                          label="Order Now Link"
                          description="Direct purchase link for this product"
                        >
                          <Input
                            value={popup.orderNowLink}
                            onChange={(e) =>
                              updatePopup(size as keyof AdminData["popups"], {
                                orderNowLink: e.target.value,
                              })
                            }
                            placeholder="https://www.walmart.com/ip/..."
                          />
                          {popup.orderNowLink && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(popup.orderNowLink, "_blank")
                              }
                              className="mt-2 text-xs"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Test Link
                            </Button>
                          )}
                        </FormGroup>

                        <FormGroup
                          label="View Details Button Text"
                          description="Text for the 'View Full Details' button"
                        >
                          <Input
                            value={popup.viewDetailsButtonText}
                            onChange={(e) =>
                              updatePopup(size as keyof AdminData["popups"], {
                                viewDetailsButtonText: e.target.value,
                              })
                            }
                            placeholder="View Full Details"
                          />
                        </FormGroup>

                        {/* Pre-fill from product data */}
                        {product && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Quick Fill from Product Data:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updatePopup(
                                    size as keyof AdminData["popups"],
                                    {
                                      title: product.shortName,
                                      orderNowLink: product.walmartLink,
                                      promotionalText:
                                        product.promotionalText || "",
                                    },
                                  )
                                }
                                className="text-xs"
                              >
                                Fill from Product
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <ImageUpload
                      label="Popup Image"
                      description="Product image for the popup (will use product image if not provided)"
                      value={popup.image}
                      onChange={(url) =>
                        updatePopup(size as keyof AdminData["popups"], {
                          image: url,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Usage Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 text-lg flex items-center gap-2">
                <Package2 className="w-5 h-5" />
                How Product Popups Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
                <div>
                  <h4 className="font-semibold mb-2">User Flow:</h4>
                  <ol className="space-y-1 list-decimal list-inside">
                    <li>Customer clicks on a product card</li>
                    <li>Popup appears with size-specific messaging</li>
                    <li>Customer can "Order Now" (goes to purchase)</li>
                    <li>Or "View Full Details" (opens product modal)</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices:</h4>
                  <ul className="space-y-1">
                    <li>• Highlight unique benefits of each size</li>
                    <li>• Use compelling promotional text</li>
                    <li>• Include time-sensitive offers when possible</li>
                    <li>• Test all purchase links regularly</li>
                    <li>• Keep descriptions concise but persuasive</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminSection>
    </div>
  );
};

export default PopupsAdmin;
