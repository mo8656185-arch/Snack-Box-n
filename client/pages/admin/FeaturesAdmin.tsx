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

type FeatureItem = AdminData["features"]["items"][0];

const FeaturesAdmin = () => {
  const [data, setData] = useState<AdminData["features"]>({
    title: "",
    description: "",
    items: [],
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["features"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.features);
    setOriginalData(adminData.features);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ features: data });
      setOriginalData(data);
      alert("Features section saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewFeature = (): FeatureItem => ({
    title: "",
    description: "",
    icon: "Package",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Features Section</h1>
        <p className="text-gray-600 mt-2">
          Manage the features and benefits section
        </p>
      </div>

      <AdminSection
        title="Features Configuration"
        description="Configure the features and benefits section"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          <FormGroup label="Section Title" description="Main heading for the features section">
            <Input
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Why Choose Gift A Snack Box?"
            />
          </FormGroup>

          <FormGroup label="Section Description" description="Description text below the title">
            <Textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Discover what makes our snack boxes the perfect choice for every occasion and celebration"
              rows={3}
            />
          </FormGroup>

          <DynamicList
            title="Feature Items"
            items={data.items}
            onItemsChange={(items) => setData(prev => ({ ...prev, items }))}
            createNewItem={createNewFeature}
            addButtonText="Add Feature"
            renderItem={(feature, index, onChange) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormGroup label="Icon">
                  <IconSelector
                    value={feature.icon}
                    onChange={(icon) => onChange({ ...feature, icon })}
                  />
                </FormGroup>
                <FormGroup label="Title">
                  <Input
                    value={feature.title}
                    onChange={(e) => onChange({ ...feature, title: e.target.value })}
                    placeholder="e.g., Huge Variety"
                  />
                </FormGroup>
                <FormGroup label="Description">
                  <Input
                    value={feature.description}
                    onChange={(e) => onChange({ ...feature, description: e.target.value })}
                    placeholder="e.g., Over 30 types of snacks"
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

export default FeaturesAdmin;
