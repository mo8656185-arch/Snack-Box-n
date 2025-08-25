import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData, generateId } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
  DynamicList,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CarouselImage = AdminData["carousel"]["images"][0];

const CarouselAdmin = () => {
  const [data, setData] = useState<AdminData["carousel"]>({
    title: "",
    description: "",
    images: [],
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["carousel"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.carousel);
    setOriginalData(adminData.carousel);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ carousel: data });
      setOriginalData(data);
      alert("Banner carousel saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewImage = (): CarouselImage => ({
    id: Date.now(),
    src: "",
    alt: "",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Banner Carousel</h1>
        <p className="text-gray-600 mt-2">
          Manage the auto-scrolling banner images section
        </p>
      </div>

      <AdminSection
        title="Carousel Configuration"
        description="Configure the banner carousel section and images"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          <FormGroup label="Section Title" description="Main heading for the carousel section">
            <Input
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Our Snack Box Variety Collection"
            />
          </FormGroup>

          <FormGroup label="Section Description" description="Description text below the title">
            <Textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Discover the perfect snack experience for every occasion and celebration"
              rows={3}
            />
          </FormGroup>

          <DynamicList
            title="Carousel Images"
            items={data.images}
            onItemsChange={(images) => setData(prev => ({ ...prev, images }))}
            createNewItem={createNewImage}
            addButtonText="Add Image"
            renderItem={(image, index, onChange) => (
              <div className="space-y-4">
                <ImageUpload
                  label={`Image ${index + 1}`}
                  description="Carousel image (recommended: 600x400px)"
                  value={image.src}
                  onChange={(src) => onChange({ ...image, src })}
                />
                <FormGroup label="Alt Text" description="Descriptive text for accessibility">
                  <Input
                    value={image.alt}
                    onChange={(e) => onChange({ ...image, alt: e.target.value })}
                    placeholder="Gift A Snack Premium Snack Box Collection..."
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

export default CarouselAdmin;
