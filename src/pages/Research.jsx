
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Target, Eye, Users, ArrowRight, BookOpen, Check } from "lucide-react";
import SEO from "@/components/SEO";

export default function Research() {
  const researchAreas = [
    {
      icon: Brain,
      title: "Model Interpretability",
      description: "Understanding how models make decisions through attention visualization and feature attribution",
      highlights: ["SHAP & LIME integration", "Attention flow mapping", "Counterfactual explanations"]
    },
    {
      icon: Target,
      title: "Robustness Testing",
      description: "Comprehensive adversarial testing and resilience evaluation",
      highlights: ["Adversarial attack simulation", "Distribution shift detection", "Stress testing protocols"]
    },
    {
      icon: Eye,
      title: "Bias Detection",
      description: "Systematic identification and reduction of algorithmic bias",
      highlights: ["Fairness metrics suite", "Demographic parity analysis", "Bias correction techniques"]
    },
    {
      icon: Users,
      title: "Human Oversight",
      description: "Effective human-in-the-loop systems maintaining agency",
      highlights: ["Approval workflows", "Confidence thresholds", "Escalation mechanisms"]
    }
  ];

  return (
    <>
      <SEO 
        title="AI Research & Safety - EU AI Act Compliance | BloomX Analytica"
        description="Research in model interpretability, robustness testing, bias detection, and human oversight. EU AI Act compliant AI systems with complete transparency and audit trails."
        keywords="AI research, model interpretability, bias detection, EU AI Act, AI safety, robustness testing, explainable AI, responsible AI, AI compliance"
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
                AI Research & Safety
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white">
                Research that Keeps
                <br />
                AI <span className="grok-gradient-text">Accountable</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
                From interpretability to robustness — every model we build
                <br className="hidden sm:block" />
                comes with a story, a score, and a safeguard
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  View Model Cards
                  <BookOpen className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Link to={createPageUrl("Contact")}>
                  <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-transparent">
                    Partner with Us
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Research Areas - Light Section */}
        <section className="py-32 px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-semibold mb-6 text-[#0a0b1a] tracking-tight">
                Our Research Focus
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Four pillars of responsible AI development, rigorously tested and continuously improved
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-10 rounded-3xl hover:shadow-xl hover:shadow-[#60a5fa]/10 transition-all duration-300 group"
                >
                  <div className="relative mb-6">
                    {/* Animated glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                    {/* Icon container with glassmorphic effect */}
                    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                      <area.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#0a0b1a]">{area.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((highlight) => (
                      <div key={highlight} className="px-4 py-2 bg-white/60 border border-[#60a5fa]/20 rounded-full text-xs text-gray-700 hover:border-[#60a5fa]/40 hover:bg-white/80 transition-all duration-300">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EU AI Act Compliance - Dark */}
        <section className="py-32 px-8 bg-[#0a0b1a] relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-semibold mb-6">
                EU AI Act
                <br />
                <span className="grok-gradient-text">Compliance Framework</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                Our safety protocols meet and exceed EU AI Act requirements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Risk Assessment",
                  items: ["Pre-deployment evaluation", "Impact analysis", "Risk mitigation plans"]
                },
                {
                  title: "Technical Documentation",
                  items: ["Model cards", "Training data specs", "Performance metrics"]
                },
                {
                  title: "Human Oversight",
                  items: ["Control mechanisms", "Intervention protocols", "Accountability chains"]
                },
                {
                  title: "Accuracy & Robustness",
                  items: ["Validation testing", "Edge case analysis", "Performance monitoring"]
                },
                {
                  title: "Transparency",
                  items: ["Explainability tools", "User information", "Decision rationale"]
                },
                {
                  title: "Record Keeping",
                  items: ["Audit trails", "Version control", "Incident logging"]
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-4 grok-gradient-text">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-[#60a5fa]/30 rounded-full blur-sm" />
                          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/20 backdrop-blur-sm border border-[#60a5fa]/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#60a5fa]" strokeWidth={3} />
                          </div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications - Light */}
        <section className="py-32 px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-4 text-[#0a0b1a]">
                Research Publications
              </h2>
              <p className="text-lg text-gray-600">
                Latest papers, model cards, and technical reports
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  type: "Paper",
                  title: "Interpretable Attention Mechanisms in Production LLMs",
                  date: "January 2025"
                },
                {
                  type: "Model Card",
                  title: "BloomX-7B-Instruct: Safety & Performance Analysis",
                  date: "December 2024"
                },
                {
                  type: "White Paper",
                  title: "Implementing EU AI Act Compliance in Practice",
                  date: "November 2024"
                },
                {
                  type: "Research Note",
                  title: "Bias Detection in Financial Services AI",
                  date: "October 2024"
                }
              ].map((pub, index) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-6 rounded-2xl hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white text-xs font-semibold shadow-lg">
                      {pub.type}
                    </span>
                    <span className="text-xs text-gray-500">{pub.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#0a0b1a] group-hover:text-[#60a5fa] transition-colors">
                    {pub.title}
                  </h3>
                  <Link to={createPageUrl("Contact")} className="flex items-center text-sm text-[#60a5fa] group-hover:translate-x-2 transition-transform">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
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
              <h2 className="text-5xl md:text-6xl font-semibold mb-8 leading-tight">
                Collaborate with
                <br />
                <span className="grok-gradient-text">Our Research Team</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-light">
                We're actively seeking research partners, academic collaborations,
                <br />
                and pilot opportunities
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-base px-8 py-6 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full">
                  Get in Touch
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
