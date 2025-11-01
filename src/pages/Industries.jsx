
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, ShoppingCart, Landmark, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const industries = [
    {
      icon: Building2,
      title: "Financial Services",
      tagline: "Trust and compliance at scale",
      description: "Deploy AI systems that meet the highest regulatory standards while delivering real-time insights for financial institutions.",
      useCases: [
        { title: "AML & Fraud Detection", desc: "Explainable decisions with complete audit trails" },
        { title: "Risk Assessment", desc: "Credit scoring with regulatory compliance" },
        { title: "Compliance Automation", desc: "Automated regulatory reporting systems" },
        { title: "Customer Service", desc: "AI agents with full conversation logging" },
        { title: "Market Analysis", desc: "Real-time trading signals and insights" }
      ],
      metrics: [
        { value: "95%", label: "Reduction in false positives" },
        { value: "100%", label: "Audit trail coverage" },
        { value: "<100ms", label: "Decision latency" }
      ]
    },
    {
      icon: ShoppingCart,
      title: "Retail & e-Commerce",
      tagline: "Personalization with privacy",
      description: "Create personalized shopping experiences while respecting customer privacy and maintaining full GDPR compliance.",
      useCases: [
        { title: "Predictive Inventory", desc: "Optimize stock levels with demand forecasting" },
        { title: "Dynamic Pricing", desc: "Real-time price optimization algorithms" },
        { title: "Customer Analytics", desc: "Lifetime value prediction and segmentation" },
        { title: "Recommendations", desc: "Personalized product suggestions" },
        { title: "Supply Chain", desc: "End-to-end logistics optimization" }
      ],
      metrics: [
        { value: "+30%", label: "Conversion rate increase" },
        { value: "-25%", label: "Reduction in stockouts" },
        { value: "100%", label: "GDPR compliant" }
      ]
    },
    {
      icon: Landmark,
      title: "Public Sector",
      tagline: "Transparent AI for citizens",
      description: "Deploy AI systems that enhance public services while maintaining complete transparency and building citizen trust.",
      useCases: [
        { title: "Citizen Services", desc: "AI-powered chatbots for public inquiries" },
        { title: "Document Processing", desc: "Automated form processing and validation" },
        { title: "Resource Allocation", desc: "Optimize public resource distribution" },
        { title: "Policy Analysis", desc: "Impact modeling and scenario planning" },
        { title: "Knowledge Management", desc: "Secure institutional memory systems" }
      ],
      metrics: [
        { value: "+60%", label: "Faster processing times" },
        { value: "100%", label: "Complete transparency" },
        { value: "EU-Only", label: "Sovereign data control" }
      ]
    }
  ];

  const currentIndustry = industries[activeIndustry];

  return (
    <>
      <SEO 
        title="Industry Solutions - Financial Services, Retail, Public Sector | BloomX Analytica"
        description="AI solutions for Financial Services, Retail & e-Commerce, and Public Sector. GDPR compliant, EU-only deployment, complete transparency, and enterprise security."
        keywords="AI financial services, AI retail, AI public sector, enterprise AI solutions, GDPR AI, AI compliance, fraud detection AI, AI analytics"
      />
      
      <div className="bg-[#0a0b1a]">
        {/* Hero Section */}
        <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          
          <div className="relative max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8">
                Industry Solutions
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white">
                AI Built for
                <br />
                <span className="grok-gradient-text">European Enterprise</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
                Industry-specific solutions that combine technical excellence
                <br className="hidden sm:block" />
                with regulatory compliance and ethical standards
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industry Tabs */}
        <section className="py-12 px-8 bg-[#0a0b1a] sticky top-20 z-40 border-b border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-center gap-4 flex-wrap">
              {industries.map((industry, index) => (
                <button
                  key={industry.title}
                  onClick={() => setActiveIndustry(index)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeIndustry === index
                      ? "bg-white/10 border border-white/20"
                      : "bg-transparent border border-white/10 hover:border-white/20"
                  }`}
                >
                  <industry.icon className={`w-5 h-5 transition-colors ${
                    activeIndustry === index ? "text-[#60a5fa]" : "text-gray-400"
                  }`} strokeWidth={2} />
                  <span className={`font-medium text-sm transition-colors ${
                    activeIndustry === index ? "text-white" : "text-gray-400"
                  }`}>
                    {industry.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Details */}
        <section className="py-32 px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-20">
                <h2 className="text-5xl font-semibold text-white mb-4">{currentIndustry.title}</h2>
                <p className="text-xl text-gray-400 mb-6">{currentIndustry.tagline}</p>
                <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                  {currentIndustry.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-20">
                {currentIndustry.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#141824] border border-white/10 p-8 rounded-2xl text-center"
                  >
                    <div className="text-4xl font-bold grok-gradient-text mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                  Use Cases & <span className="grok-gradient-text">Applications</span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentIndustry.useCases.map((useCase, index) => (
                    <motion.div
                      key={useCase.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-[#141824] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300"
                    >
                      <h4 className="font-semibold text-white text-base mb-2">{useCase.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{useCase.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Universal Capabilities */}
        <section className="py-32 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold text-white mb-4">
                Universal
                <br />
                <span className="grok-gradient-text">Capabilities</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Core features that deliver value across all industries
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Regulatory Compliance", description: "GDPR & EU AI Act ready" },
                { title: "Data Sovereignty", description: "EU-only deployment options" },
                { title: "Full Transparency", description: "Complete audit trails" },
                { title: "Enterprise Security", description: "SOC 2 & ISO 27001 certified" },
                { title: "Rapid Deployment", description: "Live in days, not months" },
                { title: "Infinite Scale", description: "Millions of requests per day" },
                { title: "Human Control", description: "Built-in oversight workflows" },
                { title: "Cost Efficient", description: "Optimized inference engine" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#141824] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-base font-semibold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-semibold mb-8 leading-tight text-white">
                Transform Your Industry
                <br />
                <span className="grok-gradient-text">with Trusted AI</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Schedule a consultation to explore how BloomX Analytica
                <br />
                can address your specific industry challenges
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-base px-8 py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  Contact Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
