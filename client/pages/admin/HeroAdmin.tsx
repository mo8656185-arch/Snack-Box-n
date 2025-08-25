import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
  DynamicList,
  IconSelector,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const HeroAdmin = () => {
  const [data, setData] = useState<AdminData["hero"]>({
    logo: "",
    badge: { text: "", icon: "" },
    title: { line1: "", line2: "" },
    description: { desktop: "", mobile: "" },
    buttons: { primary: { text: "", action: "" }, secondary: { text: "", action: "" } },
    trustIndicators: [],
    heroImage: "",
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["hero"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.hero);
    setOriginalData(adminData.hero);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ hero: data });
      setOriginalData(data);
      alert("Hero section saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const updateField = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (section: string, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-600 mt-2">
          Manage the main banner section including logo, titles, and call-to-action buttons
        </p>
      </div>

      <AdminSection
        title="Hero Section Content"
        description="Configure the main landing section of your website"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          {/* Logo */}
          <ImageUpload
            label="Logo"
            description="Upload your company logo (recommended: 300x150px)"
            value={data.logo}
            onChange={(url) => updateField("logo", url)}
          />

          {/* Badge */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Badge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Badge Text" description="Text shown in the promotional badge">
                <Input
                  value={data.badge.text}
                  onChange={(e) => updateNestedField("badge", "text", e.target.value)}
                  placeholder="e.g., Premium Quality Guaranteed"
                />
              </FormGroup>
              <FormGroup label="Badge Icon" description="Icon displayed with the badge">
                <IconSelector
                  value={data.badge.icon}
                  onChange={(icon) => updateNestedField("badge", "icon", icon)}
                />
              </FormGroup>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Main Title</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormGroup label="Title Line 1" description="First line of the main title">
                <Input
                  value={data.title.line1}
                  onChange={(e) => updateNestedField("title", "line1", e.target.value)}
                  placeholder="e.g., Premium Snack Boxes"
                />
              </FormGroup>
              <FormGroup label="Title Line 2" description="Second line of the main title">
                <Input
                  value={data.title.line2}
                  onChange={(e) => updateNestedField("title", "line2", e.target.value)}
                  placeholder="e.g., – Gift A Snack"
                />
              </FormGroup>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormGroup label="Desktop Description" description="Full description shown on desktop">
                <Textarea
                  value={data.description.desktop}
                  onChange={(e) => updateNestedField("description", "desktop", e.target.value)}
                  placeholder="Premium assortment of delicious snacks, beautifully packaged..."
                  rows={3}
                />
              </FormGroup>
              <FormGroup label="Mobile Description" description="Shorter description for mobile devices">
                <Textarea
                  value={data.description.mobile}
                  onChange={(e) => updateNestedField("description", "mobile", e.target.value)}
                  placeholder="Premium snack boxes perfect for gifts..."
                  rows={2}
                />
              </FormGroup>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Call-to-Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-800">Primary Button</h4>
                <FormGroup label="Button Text">
                  <Input
                    value={data.buttons.primary.text}
                    onChange={(e) => updateNestedField("buttons", "primary", { ...data.buttons.primary, text: e.target.value })}
                    placeholder="e.g., Shop Now"
                  />
                </FormGroup>
                <FormGroup label="Button Action" description="JavaScript function or scroll target">
                  <Input
                    value={data.buttons.primary.action}
                    onChange={(e) => updateNestedField("buttons", "primary", { ...data.buttons.primary, action: e.target.value })}
                    placeholder="e.g., scrollToProducts"
                  />
                </FormGroup>
              </div>
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-800">Secondary Button</h4>
                <FormGroup label="Button Text">
                  <Input
                    value={data.buttons.secondary.text}
                    onChange={(e) => updateNestedField("buttons", "secondary", { ...data.buttons.secondary, text: e.target.value })}
                    placeholder="e.g., Learn More"
                  />
                </FormGroup>
                <FormGroup label="Button Action" description="JavaScript function or scroll target">
                  <Input
                    value={data.buttons.secondary.action}
                    onChange={(e) => updateNestedField("buttons", "secondary", { ...data.buttons.secondary, action: e.target.value })}
                    placeholder="e.g., scrollToFeatures"
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div>
            <DynamicList
              title="Trust Indicators"
              items={data.trustIndicators}
              onItemsChange={(items) => updateField("trustIndicators", items)}
              createNewItem={() => ({ icon: "CheckCircle", text: "" })}
              addButtonText="Add Trust Badge"
              renderItem={(item, index, onChange) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Icon">
                    <IconSelector
                      value={item.icon}
                      onChange={(icon) => onChange({ ...item, icon })}
                    />
                  </FormGroup>
                  <FormGroup label="Text">
                    <Input
                      value={item.text}
                      onChange={(e) => onChange({ ...item, text: e.target.value })}
                      placeholder="e.g., 30+ Snack Varieties"
                    />
                  </FormGroup>
                </div>
              )}
            />
          </div>

          {/* Hero Image */}
          <ImageUpload
            label="Hero Image"
            description="Main hero image (recommended: 700x500px)"
            value={data.heroImage}
            onChange={(url) => updateField("heroImage", url)}
          />
        </div>
      </AdminSection>
    </div>
  );
};

export default HeroAdmin;
