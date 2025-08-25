import { useState, useEffect } from "react";
import { getAdminData, saveAdminData, AdminData, generateId } from "@/lib/adminData";
import {
  AdminSection,
  FormGroup,
  DynamicList,
} from "@/components/admin/AdminComponents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TikTokVideo = AdminData["tiktok"]["videos"][0];

const TikTokAdmin = () => {
  const [data, setData] = useState<AdminData["tiktok"]>({
    title: "",
    description: "",
    followText: "",
    followLink: "",
    videos: [],
  });
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<AdminData["tiktok"]>(data);

  useEffect(() => {
    const adminData = getAdminData();
    setData(adminData.tiktok);
    setOriginalData(adminData.tiktok);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAdminData({ tiktok: data });
      setOriginalData(data);
      alert("TikTok section saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setData(originalData);
  };

  const createNewVideo = (): TikTokVideo => ({
    id: generateId(),
    title: "",
    embedCode: "",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TikTok Videos</h1>
        <p className="text-gray-600 mt-2">
          Manage TikTok video embeds and social media section
        </p>
      </div>

      <AdminSection
        title="TikTok Configuration"
        description="Configure the TikTok videos section"
        onSave={handleSave}
        onReset={handleReset}
        saving={saving}
      >
        <div className="space-y-8">
          <FormGroup label="Section Title" description="Main heading for the TikTok section">
            <Input
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Watch Gift A Snack on TikTok"
            />
          </FormGroup>

          <FormGroup label="Section Description" description="Description text below the title">
            <Textarea
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="See our snack boxes in action and get inspired for your next order"
              rows={3}
            />
          </FormGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Follow Button Text" description="Text for the follow button">
              <Input
                value={data.followText}
                onChange={(e) => setData(prev => ({ ...prev, followText: e.target.value }))}
                placeholder="Follow us on TikTok"
              />
            </FormGroup>

            <FormGroup label="TikTok Profile Link" description="Link to your TikTok profile">
              <Input
                value={data.followLink}
                onChange={(e) => setData(prev => ({ ...prev, followLink: e.target.value }))}
                placeholder="https://tiktok.com/@nut.cravings"
              />
            </FormGroup>
          </div>

          <DynamicList
            title="TikTok Videos"
            items={data.videos}
            onItemsChange={(videos) => setData(prev => ({ ...prev, videos }))}
            createNewItem={createNewVideo}
            addButtonText="Add Video"
            renderItem={(video, index, onChange) => (
              <div className="space-y-4">
                <FormGroup label="Video Title" description="Internal title for this video">
                  <Input
                    value={video.title}
                    onChange={(e) => onChange({ ...video, title: e.target.value })}
                    placeholder="Gift A Snack - Assorted Healthy Treats"
                  />
                </FormGroup>

                <FormGroup label="Video ID" description="TikTok video ID (from the URL)">
                  <Input
                    value={video.id}
                    onChange={(e) => onChange({ ...video, id: e.target.value })}
                    placeholder="7522097145223187725"
                  />
                </FormGroup>

                <FormGroup label="Embed Code" description="Full TikTok embed code (optional - for advanced users)">
                  <Textarea
                    value={video.embedCode}
                    onChange={(e) => onChange({ ...video, embedCode: e.target.value })}
                    placeholder="<blockquote class='tiktok-embed'..."
                    rows={4}
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

export default TikTokAdmin;
