import { useState, useEffect } from 'react';
import { getAdminData, AdminData } from '@/lib/adminData';

export const useAdminData = () => {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const adminData = getAdminData();
        setData(adminData);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Listen for data updates from admin panel
    const handleDataUpdate = (event: CustomEvent) => {
      setData(event.detail);
    };

    window.addEventListener('adminDataUpdated', handleDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('adminDataUpdated', handleDataUpdate as EventListener);
    };
  }, []);

  return { data, loading };
};

// Hook specifically for SEO data to update document head
export const useSEOData = () => {
  const { data } = useAdminData();

  useEffect(() => {
    if (!data?.seo) return;

    // Update document title
    if (data.seo.metaTitle) {
      document.title = data.seo.metaTitle;
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = data.seo.metaDescription;

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = data.seo.metaKeywords;

    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = data.seo.metaTitle;

    let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = data.seo.metaDescription;

  }, [data?.seo]);

  return data?.seo;
};
