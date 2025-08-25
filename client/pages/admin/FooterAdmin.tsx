import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  ImageUpload,
  DynamicList,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuickLink = AdminData["footer"]["quickLinks"][0];
type SocialMedia = AdminData["footer"]["socialMedia"][0];

const FooterAdmin = () => {
  const [data, setData] = useState<AdminData["footer"]>({
    logo: "",
    description: "",
    quickLinks: [],
    socialMedia: [],
    copyright: "",
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["footer"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.footer);
    setOriginalData(adminData.footer);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ footer: data });
      setOriginalData(data);
      alert("Footer settings saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewQuickLink = (): QuickLink => ({
    text: "",
    action: "",
  });

  const createNewSocialMedia = (): SocialMedia => ({
    platform: "",
    url: "",
    icon: "",
  });

  const socialPlatforms = [
    { value: "TikTok", icon: "tiktok" },
    { value: "Instagram", icon: "instagram" },
    { value: "Facebook", icon: "facebook" },
    { value: "YouTube", icon: "youtube" },
    { value: "Twitter", icon: "twitter" },
    { value: "LinkedIn", icon: "linkedin" },
  ];

  const actionOptions = [
    { value: "scrollToTop", label: "Scroll to Top" },
    { value: "scrollToProducts", label: "Scroll to Products" },
    { value: "scrollToTestimonials", label: "Scroll to Testimonials" },
    { value: "scrollToFeatures", label: "Scroll to Features" },
    { value: "scrollToTikTok", label: "Scroll to TikTok" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Footer Management</h1>
        <p className="text-gray-600 mt-2">
          Manage footer content, links, and social media
        </p>
      </div>

      <AdminSection
        title="Footer Configuration"
        description="Configure footer content and navigation"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          {/* Logo */}
          <ImageUpload
            label="Footer Logo"
            description="Logo for the footer (recommended: 240x120px, will be displayed in white)"
            value={data.logo}
            onChange={(logo) => setData(prev => ({ ...prev, logo }))}
          />

          {/* Description */}
          <FormGroup label="Description" description="Brief description shown below the logo">
            <Textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Premium snack boxes perfect for gifts and special occasions."
              rows={3}
            />
          </FormGroup>

          {/* Quick Links */}
          <DynamicList
            title="Quick Links"
            items={data.quickLinks}
            onItemsChange={(quickLinks) => setData(prev => ({ ...prev, quickLinks }))}
            createNewItem={createNewQuickLink}
            addButtonText="Add Quick Link"
            renderItem={(link, index, onChange) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Link Text">
                  <Input
                    value={link.text}
                    onChange={(e) => onChange({ ...link, text: e.target.value })}
                    placeholder="e.g., Home"
                  />
                </FormGroup>
                <FormGroup label="Action">
                  <select
                    value={link.action}
                    onChange={(e) => onChange({ ...link, action: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Action</option>
                    {actionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </div>
            )}
          />

          {/* Social Media */}
          <DynamicList
            title="Social Media Links"
            items={data.socialMedia}
            onItemsChange={(socialMedia) => setData(prev => ({ ...prev, socialMedia }))}
            createNewItem={createNewSocialMedia}
            addButtonText="Add Social Platform"
            renderItem={(social, index, onChange) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormGroup label="Platform">
                  <select
                    value={social.platform}
                    onChange={(e) => {
                      const selectedPlatform = socialPlatforms.find(p => p.value === e.target.value);
                      onChange({ 
                        ...social, 
                        platform: e.target.value,
                        icon: selectedPlatform?.icon || ""
                      });
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Platform</option>
                    {socialPlatforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.value}
                      </option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup label="URL">
                  <Input
                    value={social.url}
                    onChange={(e) => onChange({ ...social, url: e.target.value })}
                    placeholder="https://tiktok.com/@nut.cravings"
                  />
                </FormGroup>
                <FormGroup label="Icon (Auto)">
                  <Input
                    value={social.icon}
                    onChange={(e) => onChange({ ...social, icon: e.target.value })}
                    placeholder="Icon name (auto-filled)"
                    disabled
                  />
                </FormGroup>
              </div>
            )}
          />

          {/* Copyright */}
          <FormGroup label="Copyright Text" description="Copyright notice displayed at the bottom">
            <Input
              value={data.copyright}
              onChange={(e) => setData(prev => ({ ...prev, copyright: e.target.value }))}
              placeholder="© 2025 Gift A Snack. All rights reserved."
            />
          </FormGroup>

          {/* Preview Card */}
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Footer Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Logo and Description */}
                <div className="text-center md:text-left">
                  {data.logo && (
                    <img
                      src={data.logo}
                      alt="Footer Logo"
                      className="h-16 w-auto mx-auto md:mx-0 mb-2 filter brightness-0 invert"
                    />
                  )}
                  <p className="text-gray-300 text-sm">{data.description}</p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    {data.quickLinks.map((link, index) => (
                      <span key={index} className="text-gray-300 text-sm">
                        {link.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-right">
                  <div className="flex justify-center md:justify-end gap-2">
                    {data.socialMedia.map((social, index) => (
                      <div key={index} className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                        {social.platform.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 pt-3 text-center">
                <p className="text-gray-400 text-sm">{data.copyright}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminSection>
    </div>
  );
};

export default FooterAdmin;
