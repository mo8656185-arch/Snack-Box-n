import { useState, useRef } from "react";
import { Upload, X, Save, RotateCcw, Star, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/adminData";

// Admin Form Section Container
interface AdminSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
  onReset: () => void;
  saving?: boolean;
}

export const AdminSection = ({
  title,
  description,
  children,
  onSave,
  onReset,
  saving = false,
}: AdminSectionProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-2 bg-logo-green hover:bg-green-600"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
};

// Form Group Component
interface FormGroupProps {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormGroup = ({
  label,
  description,
  required,
  children,
  className,
}: FormGroupProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      {children}
    </div>
  );
};

// Image Upload Component
interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  className?: string;
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  description,
  className,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const dataUrl = await uploadImage(file);
      onChange(dataUrl);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <FormGroup label={label} description={description} className={className}>
      <div className="space-y-3">
        {/* Current Image Preview */}
        {value && (
          <div className="relative inline-block">
            <img
              src={value}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer",
            dragActive
              ? "border-logo-green bg-green-50"
              : "border-gray-300 hover:border-logo-green hover:bg-gray-50",
            uploading && "opacity-50 pointer-events-none"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            {uploading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
        </div>

        {/* URL Input Alternative */}
        <div className="text-center text-xs text-gray-500">or</div>
        <Input
          placeholder="Enter image URL"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </FormGroup>
  );
};

// Rating Input Component
interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  className?: string;
}

export const RatingInput = ({ value, onChange, className }: RatingInputProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={cn(
              "w-5 h-5",
              rating <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">{value}/5</span>
    </div>
  );
};

// Dynamic List Component
interface DynamicListProps<T> {
  items: T[];
  onItemsChange: (items: T[]) => void;
  renderItem: (item: T, index: number, onChange: (item: T) => void, onRemove: () => void) => React.ReactNode;
  createNewItem: () => T;
  title: string;
  addButtonText?: string;
}

export function DynamicList<T>({
  items,
  onItemsChange,
  renderItem,
  createNewItem,
  title,
  addButtonText = "Add Item",
}: DynamicListProps<T>) {
  const addItem = () => {
    onItemsChange([...items, createNewItem()]);
  };

  const updateItem = (index: number, item: T) => {
    const newItems = [...items];
    newItems[index] = item;
    onItemsChange(newItems);
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button onClick={addItem} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {addButtonText}
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Item #{index + 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {renderItem(
              item,
              index,
              (updatedItem) => updateItem(index, updatedItem),
              () => removeItem(index)
            )}
          </Card>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No items added yet. Click "{addButtonText}" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Icon Selector Component
interface IconSelectorProps {
  value: string;
  onChange: (icon: string) => void;
  className?: string;
}

const availableIcons = [
  "CheckCircle",
  "Package",
  "Gift",
  "Users", 
  "Sparkles",
  "Zap",
  "ShoppingCart",
  "Truck",
  "Star",
  "Heart",
  "ThumbsUp",
  "Award",
  "Shield",
  "Clock",
  "MapPin",
  "Phone",
  "Mail",
  "Globe",
];

export const IconSelector = ({ value, onChange, className }: IconSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm">{value || "Select Icon"}</span>
        </span>
        <span className="text-xs text-gray-500">▼</span>
      </Button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {availableIcons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => {
                onChange(icon);
                setOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors",
                value === icon && "bg-logo-green/10 text-logo-green"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
