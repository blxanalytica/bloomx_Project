
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";
import Logo, { LogoCompact } from "@/components/Logo";
import Sitemap from "@/components/Sitemap";

const navigationItems = [
  { title: "Home", url: "/" },
  { title: "Platform", url: createPageUrl("Platform") },
  { title: "Research", url: createPageUrl("Research") },
  { title: "Industries", url: createPageUrl("Industries") },
  { title: "Careers", url: createPageUrl("Careers") },
  { title: "Contact", url: createPageUrl("Contact") },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [mobileMenuOpen]);

  // Check if current path is home
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="min-h-screen bg-[#0a0b1a] text-white overflow-x-hidden">
      <Sitemap />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .grok-gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #e0f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grok-gradient-bg {
          background: linear-gradient(135deg, #0a0b1a 0%, #1e3a8a 50%, #60a5fa 100%);
        }

        .grok-gradient-light {
          background: linear-gradient(135deg, #dbeafe 0%, #ffffff 100%);
        }

        .dot-pattern {
          background-image: radial-gradient(circle, rgba(96, 165, 250, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .mesh-gradient {
          background: 
            radial-gradient(circle at 20% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 30%, rgba(30, 58, 138, 0.1) 0%, transparent 50%);
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(15px) translateX(-10px); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>

      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
            ? "bg-[#0a0b1a]/80 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <Link to="/" className="group transition-transform hover:scale-105 relative z-[110]" aria-label="BloomX Analytica Home">
              <div className="hidden sm:block">
                <Logo />
              </div>
              <div className="sm:hidden">
                <LogoCompact />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  role="menuitem"
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    (item.url === '/' && isHomePage) || (item.url !== '/' && location.pathname === item.url)
                      ? "text-white" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.title}
                  {((item.url === '/' && isHomePage) || (item.url !== '/' && location.pathname === item.url)) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#60a5fa]" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </div>

            <button
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors relative z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-[#0a0b1a]/98 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out z-[102] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          <div className="flex-1 flex flex-col gap-2" role="menu">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                role="menuitem"
                className={`px-5 py-4 text-base font-medium rounded-xl transition-all duration-300 ${
                  (item.url === '/' && isHomePage) || (item.url !== '/' && location.pathname === item.url)
                    ? "text-white bg-white/10 border border-white/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              © 2025 BloomX Analytica
            </p>
          </div>
        </div>
      </div>

      <main role="main">{children}</main>

      <footer className="border-t border-white/5 bg-[#0a0b1a] relative overflow-hidden" role="contentinfo">
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="sm:col-span-2 lg:col-span-5">
              <Logo size="default" className="mb-4 sm:mb-6" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-4 sm:mb-6">
                Trusted AI infrastructure for a transparent, human-aligned future. Building responsible intelligence systems for European enterprise.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                  <span className="text-sm">Li</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="Twitter">
                  <span className="text-sm">Tw</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors" aria-label="GitHub">
                  <span className="text-sm">Gh</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-sm mb-4 text-white">Product</h4>
              <nav className="flex flex-col gap-3" aria-label="Product links">
                <Link to={createPageUrl("Platform")} className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Platform
                </Link>
                <Link to={createPageUrl("Research")} className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Research
                </Link>
                <a href="#" className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Pricing
                </a>
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-sm mb-4 text-white">Company</h4>
              <nav className="flex flex-col gap-3" aria-label="Company links">
                <Link to={createPageUrl("About")} className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  About Us
                </Link>
                <Link to={createPageUrl("Careers")} className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Careers
                </Link>
                <Link to={createPageUrl("Contact")} className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Contact
                </Link>
                <a href="#" className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors">
                  Partners
                </a>
              </nav>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="font-semibold text-sm mb-4 text-white">Contact</h4>
              <address className="flex flex-col gap-3 not-italic">
                <a href="mailto:contact@bloomxanalytica.co.uk" className="text-sm text-gray-400 hover:text-[#60a5fa] transition-colors break-all">
                  contact@bloomxanalytica.co.uk
                </a>
                <p className="text-sm text-gray-500">
                  71-75 Shelton Street<br/>
                  Covent Garden, London<br/>
                  WC2H 9JQ, UK
                </p>
              </address>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © 2025 BloomX Analytica. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-500" aria-label="Legal links">
              <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-[#60a5fa] transition-colors">Privacy Policy</Link>
              <Link to={createPageUrl("TermsOfUse")} className="hover:text-[#60a5fa] transition-colors">Terms of Use</Link>
              <Link to={createPageUrl("AITransparency")} className="hover:text-[#60a5fa] transition-colors">AI Transparency</Link>
              <Link to={createPageUrl("Accessibility")} className="hover:text-[#60a5fa] transition-colors">Accessibility</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
