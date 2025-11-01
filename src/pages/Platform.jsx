import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Layers, Zap, ArrowRight, Check, Cpu, Brain, FileCode, BarChart3 } from "lucide-react";
import SEO from "@/components/SEO";

export default function Platform() {
  const services = [
    {
      icon: Sparkles,
      title: "AI Application Development",
      description: "End-to-end AI solutions tailored to your business needs",
      features: [
        "Custom AI application design and development",
        "Integration with existing systems",
        "User-friendly interfaces for complex AI",
        "Scalable architecture for growth",
        "Enterprise & SME solutions"
      ],
      tag: "For Enterprises & SMEs"
    },
    {
      icon: Brain,
      title: "Custom Model Development",
      description: "Bespoke AI models trained for your specific use case",
      features: [
        "Industry-specific model training",
        "Fine-tuning existing models",
        "Transfer learning & optimization",
        "Model compression for edge deployment",
        "Continuous improvement & updates"
      ],
      tag: "Tailored to Your Needs"
    },
    {
      icon: Layers,
      title: "Pre-built Model Library",
      description: "Production-ready AI models for rapid deployment",
      features: [
        "Computer vision models",
        "Natural language processing",
        "Predictive analytics",
        "Recommendation systems",
        "Fraud detection & security"
      ],
      tag: "Fast Time to Market"
    },
    {
      icon: Cpu,
      title: "Research & Development",
      description: "Cutting-edge AI research and proof of concepts",
      features: [
        "AI feasibility studies",
        "Proof of concept development",
        "Algorithm research & innovation",
        "Model interpretability research",
        "Technical white papers"
      ],
      tag: "Innovation-Driven"
    }
  ];

  const process = [
    {
      number: "01",
      title: "Discovery",
      description: "We understand your business challenges, goals, and technical requirements through detailed consultation."
    },
    {
      number: "02",
      title: "Design",
      description: "Our team designs the optimal AI solution architecture, selecting or creating the right models for your needs."
    },
    {
      number: "03",
      title: "Development",
      description: "We build, train, and rigorously test your AI solution with continuous feedback and iteration."
    },
    {
      number: "04",
      title: "Deployment",
      description: "Seamless integration into your infrastructure with comprehensive documentation and training."
    },
    {
      number: "05",
      title: "Support",
      description: "Ongoing monitoring, optimization, and support to ensure continued success and ROI."
    }
  ];

  const technologies = [
    { name: "PyTorch", icon: FileCode },
    { name: "TensorFlow", icon: FileCode },
    { name: "Hugging Face", icon: Brain },
    { name: "ONNX", icon: Cpu },
    { name: "OpenCV", icon: BarChart3 },
    { name: "Scikit-learn", icon: Zap }
  ];

  return (
    <>
      <SEO 
        title="AI Solutions & Services - Custom Development | BloomX Analytica"
        description="Enterprise AI application development, custom model training, and pre-built AI solutions. GDPR compliant, EU-based AI services for businesses of all sizes."
        keywords="AI application development, custom AI models, AI services, machine learning development, enterprise AI, SME AI solutions, AI consulting, BloomX Analytica"
      />
      
      <div className="bg-[#0a0b1a]">
        {/* Hero Section */}
        <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-8 relative overflow-hidden grok-gradient-bg">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute inset-0 mesh-gradient" />
          
          <div className="relative max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8">
                AI Solutions & Services
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white">
                AI That Works
                <br />
                <span className="grok-gradient-text">For Your Business</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
                From custom AI applications to pre-built models — we deliver
                <br className="hidden sm:block" />
                compliant, high-performance AI solutions for European enterprises
              </p>

              <Link to={createPageUrl("Contact")}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  Start Your AI Project
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                { value: "100%", label: "GDPR Compliant" },
                { value: "< 8 Weeks", label: "Typical Deployment" },
                { value: "EU-Based", label: "Data & Hosting" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="text-4xl sm:text-5xl font-semibold grok-gradient-text mb-3">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 text-[#0a0b1a] tracking-tight">
                Our Services
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Comprehensive AI solutions from concept to deployment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-xl hover:shadow-[#60a5fa]/10 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#60a5fa]/20 to-[#3b82f6]/20 text-[#3b82f6] text-xs font-semibold border border-[#60a5fa]/30">
                      {service.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#0a0b1a]">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#60a5fa]" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 text-white">
                Our <span className="grok-gradient-text">Process</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                A proven methodology that delivers results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {process.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-all duration-300 relative"
                >
                  <div className="text-6xl font-bold text-white/5 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <div className="relative">
                    <div className="text-sm font-semibold text-[#60a5fa] mb-2">{step.number}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-[#0a0b1a]">
                Technologies We Use
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Industry-leading frameworks and tools for robust AI solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-6 rounded-2xl hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all duration-300 flex flex-col items-center justify-center gap-3"
                >
                  <tech.icon className="w-10 h-10 text-[#60a5fa]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#0a0b1a]">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-8 leading-tight text-white">
                Ready to Build
                <br />
                <span className="grok-gradient-text">Your AI Solution?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 font-light">
                Let's discuss your project and explore how we can help you
                <br className="hidden sm:block" />
                leverage AI to transform your business
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  Schedule a Consultation
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