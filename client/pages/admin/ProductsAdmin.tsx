import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
  DynamicList,
  RatingInput,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProductItem = AdminData["products"][0];

const ProductsAdmin = () => {
  const [data, setData] = useState<AdminData["products"]>([]);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["products"]>([]);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.products);
    setOriginalData(adminData.products);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ products: data });
      setOriginalData(data);
      alert("Products saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewProduct = (): ProductItem => ({
    id: Date.now(),
    name: "",
    shortName: "",
    description: "",
    size: "",
    price: "$0.00",
    rating: 5,
    reviewCount: 0,
    image: "",
    walmartLink: "",
    bulletPoints: [],
    tags: [],
    promotionalText: "",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Products Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage product information, images, and descriptions
        </p>
      </div>

      <AdminSection
        title="Products Configuration"
        description="Configure product listings and details"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <DynamicList
          title="Products"
          items={data}
          onItemsChange={setData}
          createNewItem={createNewProduct}
          addButtonText="Add Product"
          renderItem={(product, index, onChange) => (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormGroup label="Product Name">
                    <Textarea
                      value={product.name}
                      onChange={(e) =>
                        onChange({ ...product, name: e.target.value })
                      }
                      placeholder="Full product name"
                      rows={2}
                    />
                  </FormGroup>
                  <FormGroup label="Short Name">
                    <Input
                      value={product.shortName}
                      onChange={(e) =>
                        onChange({ ...product, shortName: e.target.value })
                      }
                      placeholder="Shortened name for cards"
                    />
                  </FormGroup>
                  <FormGroup label="Size">
                    <Input
                      value={product.size}
                      onChange={(e) =>
                        onChange({ ...product, size: e.target.value })
                      }
                      placeholder="e.g., 35 ct"
                    />
                  </FormGroup>
                </div>

                <div className="space-y-4">
                  <FormGroup label="Price">
                    <Input
                      value={product.price}
                      onChange={(e) =>
                        onChange({ ...product, price: e.target.value })
                      }
                      placeholder="$22.97"
                    />
                  </FormGroup>
                  <FormGroup label="Rating">
                    <RatingInput
                      value={product.rating}
                      onChange={(rating) => onChange({ ...product, rating })}
                    />
                  </FormGroup>
                  <FormGroup label="Review Count">
                    <Input
                      type="number"
                      value={product.reviewCount}
                      onChange={(e) =>
                        onChange({
                          ...product,
                          reviewCount: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="286"
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label="Description">
                <Textarea
                  value={product.description}
                  onChange={(e) =>
                    onChange({ ...product, description: e.target.value })
                  }
                  placeholder="Product description"
                  rows={3}
                />
              </FormGroup>

              <FormGroup
                label="Promotional Text"
                description="Optional promotional message displayed in product modal"
              >
                <Input
                  value={product.promotionalText || ""}
                  onChange={(e) =>
                    onChange({ ...product, promotionalText: e.target.value })
                  }
                  placeholder="Limited time offer with free shipping!"
                />
              </FormGroup>

              <FormGroup label="Walmart Link">
                <Input
                  value={product.walmartLink}
                  onChange={(e) =>
                    onChange({ ...product, walmartLink: e.target.value })
                  }
                  placeholder="https://www.walmart.com/ip/..."
                />
              </FormGroup>

              <ImageUpload
                label="Product Image"
                description="Product image (recommended: 800x800px)"
                value={product.image}
                onChange={(image) => onChange({ ...product, image })}
              />

              <FormGroup
                label="Tags (Badges)"
                description="Add badges like 'Popular', 'Best Value', 'Starter Pack', etc."
              >
                <Textarea
                  value={product.tags.join("\n")}
                  onChange={(e) =>
                    onChange({
                      ...product,
                      tags: e.target.value
                        .split("\n")
                        .filter((tag) => tag.trim()),
                    })
                  }
                  placeholder="Popular\nBest Value\nStarter Pack\nUltimate"
                  rows={3}
                />
              </FormGroup>

              <FormGroup label="Bullet Points">
                <Textarea
                  value={product.bulletPoints.join("\n")}
                  onChange={(e) =>
                    onChange({
                      ...product,
                      bulletPoints: e.target.value
                        .split("\n")
                        .filter((point) => point.trim()),
                    })
                  }
                  placeholder="Enter each bullet point on a new line"
                  rows={6}
                />
              </FormGroup>
            </div>
          )}
        />
      </AdminSection>
    </div>
  );
};

export default ProductsAdmin;
