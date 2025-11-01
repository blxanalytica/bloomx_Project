
import { motion } from "framer-motion";
import { Heart, Eye, Keyboard, MousePointer, Volume2, CheckCircle, Mail } from "lucide-react";
import SEO from "@/components/SEO";

export default function Accessibility() {
  return (
    <>
      <SEO 
        title="Accessibility Statement - Inclusive Design | BloomX Analytica"
        description="BloomX Analytica Accessibility Statement. Our commitment to WCAG 2.1 AA compliance and creating inclusive, accessible AI platforms for all users."
        keywords="accessibility, WCAG, inclusive design, disability access, screen reader, keyboard navigation, BloomX Analytica"
      />
      
      <div className="bg-[#0a0b1a] min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 px-8 relative overflow-hidden grok-gradient-bg">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 mb-8">
                Last Updated: January 2025
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
                Accessibility <span className="grok-gradient-text">Statement</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Building AI technology that's accessible to everyone, regardless of ability
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-[#60a5fa]" />
                <h2 className="text-3xl font-semibold text-white">Our Commitment</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-4">
                BloomX Analytica is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve these goals.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                We believe that AI technology should be accessible to all users, and we're dedicated to providing an inclusive experience that enables people of all abilities to access our platform and services effectively.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "WCAG 2.1 AA", desc: "Conforming to Level AA standards" },
                { label: "Continuous Testing", desc: "Regular accessibility audits and improvements" },
                { label: "User Feedback", desc: "Actively incorporating accessibility feedback" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center"
                >
                  <div className="text-xl font-semibold text-white mb-2">{item.label}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-semibold text-white mb-4">
                Accessibility <span className="grok-gradient-text">Features</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We've implemented comprehensive accessibility features across our platform
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  icon: Keyboard,
                  title: "Keyboard Navigation",
                  desc: "Complete keyboard navigation support with visible focus indicators, skip navigation links, logical tab order, and keyboard shortcuts for common actions."
                },
                {
                  icon: Eye,
                  title: "Screen Reader Compatibility",
                  desc: "Full compatibility with JAWS, NVDA, and VoiceOver. Semantic HTML structure, ARIA labels and roles, descriptive alternative text for images, and meaningful link text."
                },
                {
                  icon: MousePointer,
                  title: "Visual Design",
                  desc: "High contrast ratios (minimum 4.5:1 for normal text), resizable text up to 200%, no information conveyed by color alone, and consistent visual design patterns."
                },
                {
                  icon: Volume2,
                  title: "Multimedia Accessibility",
                  desc: "Captions for video content, transcripts for audio content, audio descriptions where applicable, and controls for media playback."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards Compliance */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">Standards & Conformance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">WCAG 2.1 Level AA</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our platform conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to people with disabilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Testing Methodology</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    We employ multiple testing approaches to ensure accessibility:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      "Automated accessibility testing tools (Axe, WAVE)",
                      "Manual keyboard navigation testing",
                      "Screen reader testing (JAWS, NVDA, VoiceOver)",
                      "Third-party accessibility audits",
                      "User testing with people who have disabilities"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#60a5fa] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Supported Technologies</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our platform is designed to be compatible with the following assistive technologies:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    {[
                      "JAWS (Windows)",
                      "NVDA (Windows)",
                      "VoiceOver (macOS, iOS)",
                      "TalkBack (Android)",
                      "Dragon NaturallySpeaking",
                      "ZoomText"
                    ].map((tech, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-[#60a5fa]" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Known Issues */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">Known Limitations & Ongoing Work</h2>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                We're transparent about areas where we're still working to improve accessibility:
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Complex Data Visualizations",
                    status: "In Progress",
                    desc: "We're enhancing accessibility of charts and graphs with improved descriptions and data tables."
                  },
                  {
                    title: "PDF Documents",
                    status: "In Progress",
                    desc: "Working to ensure all PDF documentation is fully accessible with proper tagging and structure."
                  },
                  {
                    title: "Third-Party Integrations",
                    status: "Monitoring",
                    desc: "Some third-party services may have limited accessibility. We're working with vendors to address these."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-medium whitespace-nowrap">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 leading-relaxed mt-6">
                We're actively working to address these limitations and will update this statement as improvements are made.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feedback & Contact */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-[#60a5fa]" />
                <h2 className="text-3xl font-semibold text-white">Feedback & Support</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                We welcome feedback on the accessibility of BloomX Analytica. If you encounter accessibility barriers or have suggestions for improvement, please let us know:
              </p>

              <div className="space-y-4 text-gray-400">
                <p>
                  <strong className="text-white">Accessibility Team:</strong><br/>
                  Email: accessibility@bloomxanalytica.co.uk
                </p>
                <p>
                  <strong className="text-white">Response Time:</strong><br/>
                  We aim to respond to accessibility feedback within 2 business days.
                </p>
                <p>
                  <strong className="text-white">Alternative Formats:</strong><br/>
                  If you require information in an alternative format (large print, audio, Braille, etc.), please contact us and we'll work to accommodate your needs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mt-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Formal Complaints</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you're not satisfied with our response to your accessibility concern, you may:
              </p>
              <ul className="space-y-2 text-gray-400 ml-6">
                <li>• File a formal complaint with our Data Protection Officer at privacy@bloomxanalytica.co.uk</li>
                <li>• Contact the Equality and Human Rights Commission (EHRC) in the UK</li>
                <li>• Lodge a complaint with the European Disability Forum (EDF)</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Technical Specifications</h2>
              <div className="text-gray-400 space-y-3">
                <p><strong className="text-white">Accessibility Standards:</strong> WCAG 2.1 Level AA</p>
                <p><strong className="text-white">Assessment Method:</strong> Self-assessment and third-party audit</p>
                <p><strong className="text-white">Last Reviewed:</strong> January 2025</p>
                <p><strong className="text-white">Technologies:</strong> HTML5, ARIA, CSS3, JavaScript (React)</p>
                <p><strong className="text-white">Compatible Browsers:</strong> Chrome, Firefox, Safari, Edge (latest versions)</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
