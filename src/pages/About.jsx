import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Zap, Award, Globe, TrendingUp, ArrowRight, Lightbulb, Shield } from "lucide-react";
import SEO from "@/components/SEO";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We build technology that respects humanity and upholds the highest ethical standards in every decision we make."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We push the boundaries of what's possible while maintaining responsibility and transparency in AI development."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "We earn trust through transparency, reliability, and unwavering commitment to user privacy and data security."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe the best solutions emerge from diverse perspectives working together toward common goals."
    }
  ];

  const milestones = [
    {
      year: "May 2025",
      title: "Foundation",
      description: "BloomX Analytica founded in London with a mission to build trustworthy AI infrastructure for European enterprise. Our vision: make AI transparent, compliant, and human-aligned."
    },
    {
      year: "Q3 2025",
      title: "Platform Development",
      description: "Launched core AI governance platform with complete transparency and compliance features. Initial pilot customers onboarded from financial services sector."
    },
    {
      year: "Q4 2025",
      title: "EU AI Act Readiness",
      description: "Achieved full EU AI Act compliance ahead of regulation deadlines, setting new industry standards for responsible AI deployment and governance."
    },
    {
      year: "2026",
      title: "Scale & Growth",
      description: "Expanding customer base across financial services, retail, and public sector. Building comprehensive model library and enterprise features."
    },
    {
      year: "Future",
      title: "Industry Leadership",
      description: "Our goal: become Europe's leading platform for transparent, compliant AI — trusted by hundreds of enterprises, protecting millions of users."
    }
  ];

  const stats = [
    { value: "2025", label: "Founded in London" },
    { value: "99.9%", label: "Target Uptime SLA" },
    { value: "<50ms", label: "Inference Latency" },
    { value: "100%", label: "EU AI Act Compliant" }
  ];

  return (
    <>
      <SEO 
        title="About Us - Our Mission & Team | BloomX Analytica"
        description="Learn about BloomX Analytica's mission to build trustworthy AI infrastructure. Founded in May 2025, we're building transparent, compliant AI systems for European enterprise."
        keywords="about BloomX Analytica, AI company London, responsible AI, AI leadership, company mission, AI values, founded 2025"
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
                Founded May 2025
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white">
                Building AI You Can
                <br />
                <span className="grok-gradient-text">Actually Trust</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
                We're on a mission to make AI transparent, compliant, and human-aligned
                <br className="hidden sm:block" />
                — one model at a time
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl text-center hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-semibold grok-gradient-text mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 sm:py-32 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 mb-6">
                  Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-white">
                  Why We
                  <br />
                  <span className="grok-gradient-text">Exist</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    In 2025, we witnessed organizations adopting AI at unprecedented speed, but few could explain how these systems actually worked. Black-box models were making critical decisions affecting real people's lives — in finance, healthcare, hiring, and beyond.
                  </p>
                  <p>
                    We founded BloomX Analytica with a simple belief: <strong className="text-white">AI doesn't have to be a black box</strong>. Organizations deserve infrastructure that's transparent, compliant, and built on principles of trust and accountability.
                  </p>
                  <p>
                    From day one, we've been committed to building AI systems that are not just powerful, but <strong className="text-white">responsible, explainable, and trustworthy</strong>. We're here to prove that transparency and performance can coexist.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Mission</h3>
                        <p className="text-gray-400 text-sm">
                          Empower organizations to deploy AI systems that are transparent, compliant, and aligned with human values.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <Eye className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Vision</h3>
                        <p className="text-gray-400 text-sm">
                          A future where every AI system is interpretable, accountable, and worthy of society's trust.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Impact</h3>
                        <p className="text-gray-400 text-sm">
                          Building the foundation for responsible AI deployment across financial services, retail, and public sector.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 sm:py-32 px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 text-[#0a0b1a]">
                Our Core <span className="grok-gradient-text">Values</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide every decision we make and every line of code we write
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-8 rounded-3xl hover:shadow-xl hover:shadow-[#60a5fa]/10 transition-all duration-300 group"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#0a0b1a]">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 sm:py-32 px-8 bg-[#0a0b1a] relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 text-white">
                Our <span className="grok-gradient-text">Journey</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                From founding to building Europe's most trusted AI platform
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#60a5fa] via-[#3b82f6] to-transparent" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}>
                      <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold text-sm mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">{milestone.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-[#60a5fa] ring-4 ring-[#0a0b1a]" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className={index % 2 === 0 ? 'hidden lg:block' : 'hidden lg:block lg:col-start-1'} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 sm:py-32 px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 text-[#0a0b1a]">
                Why <span className="grok-gradient-text">BloomX?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What sets us apart in the AI infrastructure landscape
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "European-First",
                  desc: "Built in the EU, for the EU. GDPR native. EU AI Act compliant from day one. Your data never leaves European soil."
                },
                {
                  icon: Award,
                  title: "Proven Expertise",
                  desc: "Team with deep experience from DeepMind, Google Brain, Scale AI, and leading AI research institutions."
                },
                {
                  icon: TrendingUp,
                  title: "Production-Ready",
                  desc: "Sub-50ms inference latency. Horizontal auto-scaling. Battle-tested architecture designed for enterprise scale."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-[#0a0b1a]/5 p-8 rounded-3xl hover:shadow-xl hover:shadow-[#60a5fa]/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a0b1a] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 px-8 bg-[#0a0b1a]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-white">
              Join Us on This
              <br />
              <span className="grok-gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Whether you're looking to partner, join our team, or deploy responsible AI
              <br className="hidden sm:block" />
              — we'd love to hear from you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Careers")}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0 text-lg px-8 py-6 font-semibold hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all rounded-full">
                  Join Our Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full bg-transparent">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}