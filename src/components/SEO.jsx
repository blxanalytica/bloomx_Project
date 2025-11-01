
import { useEffect } from 'react';

export default function SEO({ 
  title = "BloomX Analytica - Trusted AI Infrastructure for Enterprise",
  description = "Building transparent, compliant, and human-aligned AI systems for European enterprise. GDPR compliant AI platform with sub-50ms inference.",
  keywords = "AI platform, enterprise AI, GDPR compliant AI, EU AI Act, responsible AI, AI infrastructure, machine learning, BloomX Analytica",
  ogImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690553b61c1c5d3e58212524/a5f5faba2_blx_logo.png",
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://bloomxanalytica.co.uk'
}) {
  useEffect(() => {
    // Force update document title
    document.title = title;

    const existingTitles = document.querySelectorAll('title');
    existingTitles.forEach(t => {
      if (t.textContent !== title) {
        t.remove();
      }
    });

    if (existingTitles.length === 0 || document.title !== title) {
      let titleTag = document.querySelector('title');
      if (!titleTag) {
        titleTag = document.createElement('title');
        document.head.insertBefore(titleTag, document.head.firstChild);
      }
      titleTag.textContent = title;
    }

    // Favicon
    const faviconUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690553b61c1c5d3e58212524/f5f2ece59_2.png";
    
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(icon => icon.remove());
    
    // Add new favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
    
    // Add apple touch icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = faviconUrl;
    document.head.appendChild(appleTouchIcon);
    
    // Add shortcut icon
    const shortcutIcon = document.createElement('link');
    shortcutIcon.rel = 'shortcut icon';
    shortcutIcon.href = faviconUrl;
    document.head.appendChild(shortcutIcon);

    // Update or create meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'BloomX Analytica' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'application-name', content: 'BloomX Analytica' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'BloomX Analytica' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@BloomXAnalytica' },
      
      // Additional SEO
      { name: 'theme-color', content: '#60a5fa' },
      { name: 'apple-mobile-web-app-title', content: 'BloomX Analytica' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data (JSON-LD)
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BloomX Analytica",
      "alternateName": "BloomX",
      "url": "https://bloomxanalytica.co.uk",
      "logo": ogImage,
      "description": description,
      "foundingDate": "2025-05",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "71-75 Shelton Street",
        "addressLocality": "London",
        "addressRegion": "Greater London",
        "postalCode": "WC2H 9JQ",
        "addressCountry": "GB"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contact@bloomxanalytica.co.uk",
        "availableLanguage": ["en"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/bloomx-analytica",
        "https://twitter.com/bloomxanalytica"
      ]
    };
    
    scriptTag.textContent = JSON.stringify(structuredData);

    // Force immediate title update
    setTimeout(() => {
      if (document.title !== title) {
        document.title = title;
      }
    }, 0);
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}
