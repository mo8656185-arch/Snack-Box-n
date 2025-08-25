import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData } from "@/lib/adminData";
import { AdminSection, FormGroup } from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Eye } from "lucide-react";

const SEOAdmin = () => {
  const [data, setData] = useState<AdminData["seo"]>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["seo"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.seo);
    setOriginalData(adminData.seo);
  }, []);

  useEffect(() => {
    // Apply SEO changes to document head immediately
    if (data.metaTitle) {
      document.title = data.metaTitle;
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = data.metaDescription;

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = data.metaKeywords;
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ seo: data });
      setOriginalData(data);
      alert("SEO settings saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const updateField = (field: keyof AdminData["seo"], value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getTitleCharacterCount = () => data.metaTitle.length;
  const getDescriptionCharacterCount = () => data.metaDescription.length;
  const getKeywordsCount = () => data.metaKeywords.split(',').filter(k => k.trim().length > 0).length;

  const isTitleOptimal = () => {
    const count = getTitleCharacterCount();
    return count >= 30 && count <= 60;
  };

  const isDescriptionOptimal = () => {
    const count = getDescriptionCharacterCount();
    return count >= 120 && count <= 160;
  };

  const getGooglePreview = () => {
    const title = data.metaTitle || "Gift A Snack - Premium Snack Boxes";
    const description = data.metaDescription || "Premium assortment of delicious snacks, beautifully packaged. Perfect for gifts, office treats, and special occasions.";
    const url = "https://www.giftasnack.com";

    return { title, description, url };
  };

  const preview = getGooglePreview();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage meta tags, titles, and descriptions that appear in search engines
        </p>
      </div>

      {/* Google Search Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Google Search Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="space-y-1">
              <div className="text-blue-600 text-xl hover:underline cursor-pointer font-medium">
                {preview.title}
              </div>
              <div className="text-green-700 text-sm">
                {preview.url}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                {preview.description}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdminSection
        title="SEO Configuration"
        description="Configure meta tags and search engine optimization settings"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          {/* Meta Title */}
          <FormGroup 
            label="Meta Title" 
            description="The title that appears in search engine results and browser tabs"
            required
          >
            <div className="space-y-2">
              <Input
                value={data.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                placeholder="Gift A Snack - Premium Snack Boxes for Gifts & Care Packages"
                className="text-sm"
              />
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {isTitleOptimal() ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className={isTitleOptimal() ? "text-green-600" : "text-yellow-600"}>
                    {getTitleCharacterCount()} characters
                  </span>
                </div>
                <span className="text-gray-500">
                  Optimal: 30-60 characters
                </span>
              </div>
            </div>
          </FormGroup>

          {/* Meta Description */}
          <FormGroup 
            label="Meta Description" 
            description="The description that appears under your title in search results"
            required
          >
            <div className="space-y-2">
              <Textarea
                value={data.metaDescription}
                onChange={(e) => updateField("metaDescription", e.target.value)}
                placeholder="Premium assortment of delicious snacks, beautifully packaged. Perfect for gifts, office treats, and special occasions. Order now from Walmart."
                rows={4}
                className="text-sm"
              />
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {isDescriptionOptimal() ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className={isDescriptionOptimal() ? "text-green-600" : "text-yellow-600"}>
                    {getDescriptionCharacterCount()} characters
                  </span>
                </div>
                <span className="text-gray-500">
                  Optimal: 120-160 characters
                </span>
              </div>
            </div>
          </FormGroup>

          {/* Meta Keywords */}
          <FormGroup 
            label="Meta Keywords" 
            description="Comma-separated keywords related to your content (used by some search engines)"
          >
            <div className="space-y-2">
              <Textarea
                value={data.metaKeywords}
                onChange={(e) => updateField("metaKeywords", e.target.value)}
                placeholder="snack box, gift box, care package, premium snacks, variety pack, chips, cookies, candy, office snacks"
                rows={3}
                className="text-sm"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  {getKeywordsCount()} keywords
                </span>
                <span className="text-gray-500">
                  Recommended: 5-10 keywords
                </span>
              </div>
            </div>
          </FormGroup>

          {/* SEO Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 text-lg">SEO Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Include your main keyword in the title</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Write compelling descriptions that encourage clicks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Keep titles under 60 characters to avoid truncation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Use action words in descriptions like "discover", "get", "order"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Include location if relevant (e.g., "US shipping")</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current SEO Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Title Length</span>
                  <span className={isTitleOptimal() ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                    {isTitleOptimal() ? "Optimal" : "Needs Adjustment"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Description Length</span>
                  <span className={isDescriptionOptimal() ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                    {isDescriptionOptimal() ? "Optimal" : "Needs Adjustment"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Keywords</span>
                  <span className="text-blue-600 font-medium">
                    {getKeywordsCount()} added
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminSection>
    </div>
  );
};

export default SEOAdmin;
