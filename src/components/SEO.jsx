import { useEffect } from 'react';

export default function SEO({ 
  title = "BloomX Analytica - Trusted AI Infrastructure for Enterprise",
  description = "Building transparent, compliant, and human-aligned AI systems for European enterprise. GDPR compliant AI platform with sub-50ms inference.",
  keywords = "AI platform, enterprise AI, GDPR compliant AI, EU AI Act, responsible AI, AI infrastructure, machine learning, BloomX Analytica",
  ogImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690553b61c1c5d3e58212524/a5f5faba2_blx_logo.png",
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://bloomxanalytica.co.uk'
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (selector, content) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
    updateMetaTag('meta[name="twitter:url"]', canonicalUrl);
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}