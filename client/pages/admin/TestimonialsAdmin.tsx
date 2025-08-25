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

type TestimonialItem = AdminData["testimonials"][0];

const TestimonialsAdmin = () => {
  const [data, setData] = useState<AdminData["testimonials"]>([]);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["testimonials"]>([]);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.testimonials);
    setOriginalData(adminData.testimonials);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ testimonials: data });
      setOriginalData(data);
      alert("Testimonials saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewTestimonial = (): TestimonialItem => ({
    text: "",
    name: "",
    rating: 5,
    avatar: "",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
        <p className="text-gray-600 mt-2">
          Manage customer reviews and testimonials
        </p>
      </div>

      <AdminSection
        title="Testimonials Configuration"
        description="Add and edit customer testimonials"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <DynamicList
          title="Customer Testimonials"
          items={data}
          onItemsChange={setData}
          createNewItem={createNewTestimonial}
          addButtonText="Add Testimonial"
          renderItem={(testimonial, index, onChange) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Customer Name">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => onChange({ ...testimonial, name: e.target.value })}
                    placeholder="e.g., Sarah M."
                  />
                </FormGroup>
                <FormGroup label="Rating">
                  <RatingInput
                    value={testimonial.rating}
                    onChange={(rating) => onChange({ ...testimonial, rating })}
                  />
                </FormGroup>
              </div>
              
              <FormGroup label="Testimonial Text">
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => onChange({ ...testimonial, text: e.target.value })}
                  placeholder="The best gift I've ever given my friend! Elegant packaging and the products are fresh and super tasty."
                  rows={4}
                />
              </FormGroup>

              <ImageUpload
                label="Customer Avatar"
                description="Customer photo (recommended: 150x150px)"
                value={testimonial.avatar}
                onChange={(avatar) => onChange({ ...testimonial, avatar })}
              />
            </div>
          )}
        />
      </AdminSection>
    </div>
  );
};

export default TestimonialsAdmin;
