import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  DynamicList,
  IconSelector,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TrustIndicator = AdminData["cta"]["trustIndicators"][0];

const CTAAdmin = () => {
  const [data, setData] = useState<AdminData["cta"]>({
    title: "",
    description: "",
    buttons: { primary: { text: "", action: "" }, secondary: { text: "", action: "" } },
    trustIndicators: [],
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["cta"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.cta);
    setOriginalData(adminData.cta);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ cta: data });
      setOriginalData(data);
      alert("Call-to-Action section saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewTrustIndicator = (): TrustIndicator => ({
    icon: "CheckCircle",
    text: "",
  });

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
        <h1 className="text-3xl font-bold text-gray-900">Call-to-Action Section</h1>
        <p className="text-gray-600 mt-2">
          Manage the final call-to-action and conversion section
        </p>
      </div>

      <AdminSection
        title="Call-to-Action Configuration"
        description="Configure the main conversion section"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          <FormGroup label="Section Title" description="Main heading for the CTA section">
            <Input
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ready to Experience the Tastiest Gift A Snack Box?"
            />
          </FormGroup>

          <FormGroup label="Section Description" description="Description text below the title">
            <Textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Join thousands of satisfied customers. Choose your perfect size and order now from Walmart."
              rows={3}
            />
          </FormGroup>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Call-to-Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-800">Primary Button</h4>
                <FormGroup label="Button Text">
                  <Input
                    value={data.buttons.primary.text}
                    onChange={(e) => updateNestedField("buttons", "primary", { ...data.buttons.primary, text: e.target.value })}
                    placeholder="Order Now"
                  />
                </FormGroup>
                <FormGroup label="Button Action" description="JavaScript function or scroll target">
                  <Input
                    value={data.buttons.primary.action}
                    onChange={(e) => updateNestedField("buttons", "primary", { ...data.buttons.primary, action: e.target.value })}
                    placeholder="scrollToProducts"
                  />
                </FormGroup>
              </div>
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-800">Secondary Button</h4>
                <FormGroup label="Button Text">
                  <Input
                    value={data.buttons.secondary.text}
                    onChange={(e) => updateNestedField("buttons", "secondary", { ...data.buttons.secondary, text: e.target.value })}
                    placeholder="Read Reviews"
                  />
                </FormGroup>
                <FormGroup label="Button Action" description="JavaScript function or scroll target">
                  <Input
                    value={data.buttons.secondary.action}
                    onChange={(e) => updateNestedField("buttons", "secondary", { ...data.buttons.secondary, action: e.target.value })}
                    placeholder="scrollToTestimonials"
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <DynamicList
            title="Trust Indicators"
            items={data.trustIndicators}
            onItemsChange={(trustIndicators) => setData(prev => ({ ...prev, trustIndicators }))}
            createNewItem={createNewTrustIndicator}
            addButtonText="Add Trust Badge"
            renderItem={(indicator, index, onChange) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Icon">
                  <IconSelector
                    value={indicator.icon}
                    onChange={(icon) => onChange({ ...indicator, icon })}
                  />
                </FormGroup>
                <FormGroup label="Text">
                  <Input
                    value={indicator.text}
                    onChange={(e) => onChange({ ...indicator, text: e.target.value })}
                    placeholder="30+ Premium Snacks"
                  />
                </FormGroup>
              </div>
            )}
          />
        </div>
      </AdminSection>
    </div>
  );
};

export default CTAAdmin;
