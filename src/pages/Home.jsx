
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Home() {
  const canvasRef = useRef(null);
  const europeMapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles = [];
    const particleCount = 150;
    
    const getSafeValues = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 4;
      
      return {
        centerX: isFinite(centerX) && centerX > 0 ? centerX : 400,
        centerY: isFinite(centerY) && centerY > 0 ? centerY : 300,
        radius: isFinite(radius) && radius > 0 ? radius : 100
      };
    };

    let { centerX, centerY, radius } = getSafeValues();

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particles.push({
        theta,
        phi,
        speed: 0.0005 + Math.random() * 0.001,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    let rotation = 0;
    let animationId;

    function animate() {
      const safeValues = getSafeValues();
      centerX = safeValues.centerX;
      centerY = safeValues.centerY;
      radius = safeValues.radius;

      ctx.fillStyle = "rgba(10, 11, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.001;

      particles.forEach((p, i) => {
        p.theta += p.speed;
        
        const x = centerX + radius * Math.sin(p.phi) * Math.cos(p.theta + rotation);
        const y = centerY + radius * Math.sin(p.phi) * Math.sin(p.theta + rotation);
        const z = radius * Math.cos(p.phi);
        
        const scale = (z + radius) / (radius * 2);
        const size = p.size * scale;
        const alpha = p.alpha * scale;

        if (!isFinite(x) || !isFinite(y) || !isFinite(size) || !isFinite(alpha) || 
            size <= 0 || alpha <= 0) {
          return;
        }

        const gradientRadius = size * 2;
        if (!isFinite(gradientRadius) || gradientRadius <= 0) {
          return;
        }

        try {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, gradientRadius);
          gradient.addColorStop(0, `rgba(96, 165, 250, ${Math.min(1, Math.max(0, alpha))})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${Math.min(1, Math.max(0, alpha * 0.5))})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        } catch (e) {
          ctx.fillStyle = `rgba(96, 165, 250, ${Math.min(1, Math.max(0, alpha))})`;
          ctx.fill();
        }

        particles.slice(i + 1, i + 5).forEach((p2) => {
          const x2 = centerX + radius * Math.sin(p2.phi) * Math.cos(p2.theta + rotation);
          const y2 = centerY + radius * Math.sin(p2.phi) * Math.sin(p2.theta + rotation);
          
          if (!isFinite(x2) || !isFinite(y2)) return;
          
          const dist = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
          
          if (isFinite(dist) && dist < 100 && dist > 0) {
            const lineAlpha = 0.1 * (1 - dist / 100) * scale;
            if (isFinite(lineAlpha) && lineAlpha > 0) {
              try {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(96, 165, 250, ${Math.min(1, Math.max(0, lineAlpha))})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              } catch (e) {}
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();
    
    const handleResize = () => {
      resizeCanvas();
      const safeValues = getSafeValues();
      centerX = safeValues.centerX;
      centerY = safeValues.centerY;
      radius = safeValues.radius;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Enhanced Europe Map Canvas Animation with Geographic Context
  useEffect(() => {
    const canvas = europeMapRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width = 700;
    const height = canvas.height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    let animationId;
    let time = 0;

    // Cities positioned on Europe map with country labels
    const cities = [
      { name: "LONDON", country: "United Kingdom", x: 240, y: 260, isHub: true },
      { name: "DUBLIN", country: "Ireland", x: 180, y: 240 },
      { name: "LISBON", country: "Portugal", x: 150, y: 400 },
      { name: "STOCKHOLM", country: "Sweden", x: 380, y: 150 },
      { name: "WARSAW", country: "Poland", x: 450, y: 260 },
      { name: "ATHENS", country: "Greece", x: 500, y: 450 }
    ];

    // Connection routes - London as central hub
    const routes = [
      { from: 0, to: 1, pulseOffset: 0 },     // London → Dublin
      { from: 0, to: 2, pulseOffset: 0.5 },   // London → Lisbon
      { from: 0, to: 3, pulseOffset: 1.0 },   // London → Stockholm
      { from: 0, to: 4, pulseOffset: 1.5 },   // London → Warsaw
      { from: 0, to: 5, pulseOffset: 2.0 },   // London → Athens
      { from: 3, to: 4, pulseOffset: 2.5 },   // Stockholm ↔ Warsaw
      { from: 2, to: 5, pulseOffset: 3.0 },   // Lisbon ↔ Athens
    ];

    // Enhanced Europe coastline and borders
    const europeBorders = {
      // UK & Ireland
      uk: [[220, 240], [230, 250], [240, 260], [250, 270], [260, 265], [255, 255], [245, 245], [235, 238], [225, 235], [220, 240]],
      ireland: [[170, 230], [180, 240], [185, 250], [182, 258], [175, 260], [168, 255], [165, 245], [168, 235], [170, 230]],
      
      // Iberia (Portugal & Spain)
      portugal: [[140, 390], [150, 400], [155, 410], [152, 420], [145, 415], [138, 405], [140, 390]],
      spain: [[155, 390], [180, 395], [210, 410], [230, 425], [235, 440], [225, 450], [200, 460], [170, 455], [155, 445], [148, 425], [155, 405], [155, 390]],
      
      // France
      france: [[220, 280], [240, 290], [260, 305], [270, 325], [265, 345], [250, 360], [230, 370], [210, 365], [195, 350], [185, 330], [190, 310], [205, 290], [220, 280]],
      
      // Nordic (Sweden, Norway)
      sweden: [[370, 140], [380, 150], [385, 165], [380, 180], [370, 185], [360, 175], [362, 160], [370, 140]],
      norway: [[350, 110], [360, 120], [365, 135], [362, 150], [355, 145], [348, 130], [350, 110]],
      
      // Central Europe (Germany, Poland)
      germany: [[290, 260], [310, 270], [325, 280], [330, 295], [325, 310], [310, 315], [295, 310], [285, 295], [285, 275], [290, 260]],
      poland: [[440, 250], [450, 260], [455, 275], [450, 290], [440, 295], [430, 285], [432, 265], [440, 250]],
      
      // Southern Europe
      italy: [[320, 350], [330, 370], [335, 390], [340, 410], [345, 430], [340, 445], [332, 440], [328, 420], [325, 395], [320, 370], [320, 350]],
      greece: [[490, 440], [500, 450], [505, 465], [500, 475], [490, 472], [485, 460], [488, 445], [490, 440]],
      
      // Eastern borders
      balkans: [[370, 360], [390, 375], [410, 390], [430, 410], [445, 425], [460, 440], [470, 455], [465, 465], [450, 460], [430, 445], [410, 425], [390, 405], [375, 385], [370, 360]],
    };

    // Coastline outline
    const coastline = [
      // Atlantic coast
      [120, 420], [140, 380], [160, 420], [180, 450], [220, 480],
      // Mediterranean
      [280, 500], [320, 520], [360, 530], [400, 540], [440, 520],
      [480, 500], [520, 480], [540, 440], [550, 400], [560, 360],
      // Eastern border
      [560, 320], [540, 280], [520, 240], [500, 200], [480, 180],
      // Baltic
      [460, 160], [440, 140], [400, 120], [360, 110], [320, 120],
      // North Sea
      [280, 140], [240, 160], [200, 180], [160, 200], [140, 220],
      // North Atlantic
      [120, 240], [100, 260], [90, 280], [100, 300], [120, 320],
      [140, 340], [140, 360], [130, 380], [120, 400]
    ];

    function drawEnhancedGeography() {
      // Draw subtle topographic grid
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw continental silhouette with depth gradient
      ctx.beginPath();
      ctx.moveTo(coastline[0][0], coastline[0][1]);
      for (let i = 1; i < coastline.length; i++) {
        ctx.lineTo(coastline[i][0], coastline[i][1]);
      }
      ctx.closePath();
      
      // Subtle elevation gradient
      const elevationGradient = ctx.createRadialGradient(centerX, centerY - 50, 50, centerX, centerY, 350);
      elevationGradient.addColorStop(0, 'rgba(28, 43, 75, 0.25)');
      elevationGradient.addColorStop(0.5, 'rgba(26, 33, 64, 0.18)');
      elevationGradient.addColorStop(1, 'rgba(11, 18, 36, 0.35)');
      ctx.fillStyle = elevationGradient;
      ctx.fill();
      
      // Draw coastline with glow
      ctx.strokeStyle = 'rgba(35, 57, 93, 0.6)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(35, 57, 93, 0.4)';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw country borders
      ctx.strokeStyle = 'rgba(35, 57, 93, 0.4)';
      ctx.lineWidth = 1.5;
      
      Object.values(europeBorders).forEach(border => {
        ctx.beginPath();
        ctx.moveTo(border[0][0], border[0][1]);
        for (let i = 1; i < border.length; i++) {
          ctx.lineTo(border[i][0], border[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
      });
    }

    function drawConnectionPath(city1, city2, progress) {
      const x1 = city1.x;
      const y1 = city1.y;
      const x2 = city2.x;
      const y2 = city2.y;

      // Calculate arc control point
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const arcHeight = dist * 0.15;
      const controlX = midX;
      const controlY = midY - arcHeight;

      // Draw base path with gradient
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, 'rgba(255, 174, 66, 0.2)');
      gradient.addColorStop(0.5, 'rgba(255, 98, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 174, 66, 0.2)');
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(controlX, controlY, x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(255, 98, 0, 0.6)';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw animated pulse
      const pulseProgress = progress % 1;
      const t = pulseProgress;
      const pulseX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * controlX + t * t * x2;
      const pulseY = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * controlY + t * t * y2;
      
      // Pulse outer glow
      const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 20);
      pulseGradient.addColorStop(0, 'rgba(255, 174, 66, 1)');
      pulseGradient.addColorStop(0.4, 'rgba(255, 98, 0, 0.8)');
      pulseGradient.addColorStop(1, 'rgba(255, 98, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 20, 0, Math.PI * 2);
      ctx.fillStyle = pulseGradient;
      ctx.fill();
      
      // Pulse core
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffae42';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff6200';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Direction arrow
      if (t > 0.1 && t < 0.9) {
        const t2 = Math.min(t + 0.05, 1);
        const nextX = (1 - t2) * (1 - t2) * x1 + 2 * (1 - t2) * t2 * controlX + t2 * t2 * x2;
        const nextY = (1 - t2) * (1 - t2) * y1 + 2 * (1 - t2) * t2 * controlY + t2 * t2 * y2;
        
        const angle = Math.atan2(nextY - pulseY, nextX - pulseX);
        
        ctx.save();
        ctx.translate(pulseX, pulseY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-5, -5);
        ctx.lineTo(-5, 5);
        ctx.closePath();
        ctx.fillStyle = '#ffae42';
        ctx.fill();
        ctx.restore();
      }
    }

    function drawRadarPulse() {
      const london = cities[0];
      const maxRadius = 80;
      const pulseSpeed = 0.5;
      const pulse1 = (time * pulseSpeed) % maxRadius;
      const pulse2 = ((time * pulseSpeed) + maxRadius / 2) % maxRadius;
      
      [pulse1, pulse2].forEach(radius => {
        const alpha = 1 - (radius / maxRadius);
        ctx.beginPath();
        ctx.arc(london.x, london.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 174, 66, ${alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    function drawCityMarker(city) {
      const isHub = city.isHub;
      const markerSize = isHub ? 10 : 7;
      
      // Outer glow
      const glowRadius = isHub ? 35 : 25;
      const glowGradient = ctx.createRadialGradient(city.x, city.y, 0, city.x, city.y, glowRadius);
      glowGradient.addColorStop(0, isHub ? 'rgba(255, 174, 66, 0.8)' : 'rgba(249, 115, 22, 0.6)');
      glowGradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
      
      ctx.beginPath();
      ctx.arc(city.x, city.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Pulsing ring for hub
      if (isHub) {
        const pulseSize = 18 + Math.sin(time * 2) * 4;
        ctx.beginPath();
        ctx.arc(city.x, city.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 174, 66, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      
      // Main square marker
      ctx.fillStyle = isHub ? '#ffae42' : '#f97316';
      ctx.fillRect(city.x - markerSize, city.y - markerSize, markerSize * 2, markerSize * 2);
      
      // Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.strokeRect(city.x - markerSize, city.y - markerSize, markerSize * 2, markerSize * 2);
    }

    function drawCityLabel(city) {
      // Calculate label position to avoid overlap
      let labelX = city.x;
      let labelY = city.y - 35;
      let align = 'center';
      
      // Adjust position based on city location
      if (city.name === 'LONDON' || city.name === 'WARSAW') {
        labelY = city.y + 40;
      } else if (city.name === 'DUBLIN') {
        labelX = city.x - 50;
        labelY = city.y;
        align = 'right';
      } else if (city.name === 'STOCKHOLM') {
        labelX = city.x + 50;
        labelY = city.y - 10;
        align = 'left';
      } else if (city.name === 'ATHENS') {
        labelX = city.x + 15;
        labelY = city.y + 15;
        align = 'left';
      }

      ctx.textAlign = align;
      ctx.font = '600 13px Inter, sans-serif';
      
      // Text glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(229, 232, 255, 0.6)';
      
      // City name
      ctx.fillStyle = '#e5e8ff';
      ctx.fillText(city.name, labelX, labelY);
      
      // Country name
      ctx.font = '400 11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(229, 232, 255, 0.6)';
      ctx.fillText(city.country, labelX, labelY + 14);
      
      ctx.shadowBlur = 0;
    }

    function drawMap() {
      // Clear canvas
      ctx.fillStyle = 'rgba(11, 18, 36, 1)';
      ctx.fillRect(0, 0, width, height);
      
      // Background atmospheric glow
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400);
      bgGradient.addColorStop(0, 'rgba(26, 33, 64, 0.3)');
      bgGradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.08)');
      bgGradient.addColorStop(1, 'rgba(11, 18, 36, 0.5)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw enhanced geography
      drawEnhancedGeography();
      
      // Draw radar pulse from London
      drawRadarPulse();
      
      // Draw connections
      routes.forEach(route => {
        const progress = (time * 0.25 + route.pulseOffset) % 4;
        drawConnectionPath(cities[route.from], cities[route.to], progress);
      });
      
      // Draw city markers
      cities.forEach(city => drawCityMarker(city));
      
      // Draw city labels (on top)
      cities.forEach(city => drawCityLabel(city));
      
      time += 0.016;
    }

    function animate() {
      drawMap();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const features = [
    "UK GDPR & EU AI Act Compliant",
    "< 50ms Inference at Scale",
    "On-Premise & Private Cloud",
    "Complete Model Interpretability",
  ];

  const cities = [
    { name: "London", lat: "51.5074°N, 0.1278°W", connections: 847, isHub: true },
    { name: "Stockholm", lat: "59.3293°N, 18.0686°E", connections: 623 },
    { name: "Athens", lat: "37.9838°N, 23.7275°E", connections: 512 },
    { name: "Lisbon", lat: "38.7223°N, 9.1393°W", connections: 489 },
    { name: "Warsaw", lat: "52.2297°N, 21.0122°E", connections: 391 },
    { name: "Dublin", lat: "53.3498°N, 6.2603°W", connections: 367 }
  ];

  return (
    <>
      <SEO 
        title="BloomX Analytica - Trusted AI Infrastructure for European Enterprise"
        description="Private, compliant, and human-aligned AI platform. GDPR & EU AI Act compliant with sub-50ms inference. The trusted AI infrastructure for European enterprise."
        keywords="AI platform, enterprise AI, GDPR AI, EU AI Act compliance, edge AI, responsible AI, AI infrastructure, machine learning platform, BloomX Analytica"
      />
      
      <div className="bg-[#0a0b1a]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden grok-gradient-bg">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.4 }}
            aria-hidden="true"
          />
          
          <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-32 pb-16 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-6 sm:mb-8">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8">
                  Building the Future of AI
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white px-4">
                Making Edge AI
                <br />
                <span className="grok-gradient-text">Simple</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed px-4">
                Private. Compliant. Human-Aligned.
                <br className="hidden sm:block" />
                The trusted AI infrastructure for European enterprise.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                <Link to={createPageUrl("Contact")} className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Platform")} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-transparent">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="hidden sm:flex absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2" aria-hidden="true">
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="grok-gradient-light text-[#0a0b1a] py-16 sm:py-24 lg:py-32 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 sm:mb-6 tracking-tight px-4">
                What We Do
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light px-4">
                AI solutions tailored for enterprises and SMEs across Europe
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
              {[
                {
                  title: "AI Applications",
                  items: [
                    "Enterprise AI Solutions",
                    "Custom AI Applications",
                    "SME Digital Transformation",
                  ]
                },
                {
                  title: "Custom Models",
                  items: [
                    "Bespoke Model Development",
                    "Fine-Tuning & Optimization",
                    "Industry-Specific Training",
                  ]
                },
                {
                  title: "R&D Services",
                  items: [
                    "AI Research & Innovation",
                    "Pre-built Model Library",
                    "Proof of Concept Development",
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-[#0a0b1a]/10 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-medium">{section.title}</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[250px] sm:h-[300px] lg:h-[400px] grok-gradient-bg rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative text-center text-white px-4">
                <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/20 border border-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] animate-float-slow" />
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl font-light">End-to-End AI Solutions</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Built for European Enterprise - LABELED GEOGRAPHIC MAP */}
        <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-8 bg-[#0a0b1a] relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 px-4">
                Built for
                <br />
                <span className="grok-gradient-text">European Enterprise</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light px-4">
                Real-time AI network across Europe — intelligent, connected, compliant
              </p>
            </motion.div>

            {/* Europe Map Visualization */}
            <div className="relative w-full max-w-6xl mx-auto mb-16">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Map Canvas */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <canvas
                    ref={europeMapRef}
                    width="700"
                    height="600"
                    className="max-w-full h-auto rounded-2xl"
                    style={{ 
                      boxShadow: '0 0 60px rgba(96, 165, 250, 0.15), inset 0 0 40px rgba(11, 18, 36, 0.5)'
                    }}
                  />
                </motion.div>

                {/* Cities Data Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-3 w-full lg:w-auto"
                >
                  {cities.map((city, index) => (
                    <motion.div
                      key={city.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={`backdrop-blur-xl border p-4 rounded-xl transition-all duration-300 min-w-[280px] ${
                        city.isHub 
                          ? 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/30 hover:border-orange-500/50' 
                          : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-sm ${city.isHub ? 'bg-[#ffae42]' : 'bg-[#f97316]'}`} />
                          <span className="font-mono text-sm font-semibold text-white">
                            {city.name.toUpperCase()}
                            {city.isHub && <span className="ml-2 text-xs text-orange-400">● HUB</span>}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Zap className={`w-3 h-3 ${city.isHub ? 'text-[#ffae42]' : 'text-[#f97316]'}`} />
                          <span className="font-mono">{city.connections}</span>
                        </div>
                      </div>
                      <div className="font-mono text-xs text-gray-500">{city.lat}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 bg-[#0a0b1a] relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-8 leading-tight px-4">
                Ready to build with
                <br />
                <span className="grok-gradient-text">trusted AI?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 font-light leading-relaxed px-4">
                Join Europe's leading enterprises in deploying responsible,
                <br className="hidden sm:block" />
                high-performance AI systems
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
