
import { motion } from "framer-motion";
import { Eye, FileText, Shield, Target, CheckCircle, AlertTriangle } from "lucide-react";
import SEO from "@/components/SEO";

export default function AITransparency() {
  return (
    <>
      <SEO 
        title="AI Transparency - Responsible AI Practices | BloomX Analytica"
        description="BloomX Analytica AI Transparency Report. Learn about our AI systems, safety measures, EU AI Act compliance, and commitment to responsible AI development."
        keywords="AI transparency, responsible AI, EU AI Act, AI safety, explainable AI, AI ethics, model cards, BloomX Analytica"
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
                Updated: January 2025
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
                AI <span className="grok-gradient-text">Transparency</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Building trust through openness about how our AI systems work, their limitations, and our safety commitments
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
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-semibold text-white mb-4">
                Our Transparency <span className="grok-gradient-text">Commitment</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We believe organizations and society deserve to understand AI systems they depend on. This transparency report explains our AI technology, safety measures, and compliance with the EU AI Act.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Eye, label: "Full Disclosure", desc: "Complete documentation of AI capabilities and limitations" },
                { icon: Shield, label: "EU AI Act Compliant", desc: "Meeting the highest standards for AI safety and transparency" },
                { icon: FileText, label: "Model Cards", desc: "Detailed technical documentation for every AI model" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How Our AI Works */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-8"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">How Our AI Systems Work</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Model Architecture</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    Our platform uses transformer-based neural networks optimized for edge deployment. Models range from 350M to 7B parameters, selected based on use case requirements for accuracy, latency, and resource constraints.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    We employ model quantization and pruning techniques to reduce inference time to &lt;50ms while maintaining accuracy. All models are trained on diverse, curated datasets with documented provenance.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Training Data</h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    <strong className="text-white">Data Sources:</strong> Publicly available datasets, licensed enterprise data (with permission), synthetic data generation, and customer-specific data (with explicit consent and data processing agreements).
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    <strong className="text-white">Data Curation:</strong> All training data undergoes bias detection, quality assessment, and compliance validation. We remove personally identifiable information (PII) and maintain detailed data lineage records.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    <strong className="text-white">Your Data:</strong> Customer data is never used to train or improve our models without explicit opt-in consent. Default privacy settings keep your data completely isolated.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Decision-Making Process</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our models generate predictions or classifications based on statistical patterns learned during training. Each output includes confidence scores indicating prediction certainty. For high-risk decisions, we implement human-in-the-loop workflows requiring explicit approval before action.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">Safety Measures & Controls</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#60a5fa] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Bias Detection & Mitigation</h3>
                      <p className="text-gray-400">
                        Continuous monitoring for demographic bias, fairness metrics across protected attributes, regular bias audits by third-party experts, and automated alerts for statistical anomalies.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#60a5fa] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Model Interpretability</h3>
                      <p className="text-gray-400">
                        SHAP values for feature importance, attention visualization for transformer models, counterfactual explanations showing decision factors, and plain-language reasoning for model outputs.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#60a5fa] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Robustness Testing</h3>
                      <p className="text-gray-400">
                        Adversarial testing to identify vulnerabilities, stress testing under edge cases, distribution shift detection, and red team security assessments.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#60a5fa] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Human Oversight</h3>
                      <p className="text-gray-400">
                        Configurable confidence thresholds requiring human review, approval workflows for high-impact decisions, escalation mechanisms for uncertain predictions, and comprehensive audit logs of all AI decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EU AI Act Compliance */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-semibold text-white mb-6">EU AI Act Compliance</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                BloomX Analytica is fully compliant with the European Union's AI Act, the world's first comprehensive AI regulation. Our systems meet requirements for high-risk AI applications:
              </p>

              <div className="space-y-4">
                {[
                  { title: "Risk Assessment", desc: "Pre-deployment evaluation and continuous monitoring of AI system risks" },
                  { title: "Technical Documentation", desc: "Comprehensive model cards, training data specifications, and performance metrics" },
                  { title: "Record Keeping", desc: "Automated logging of all AI decisions with complete audit trails" },
                  { title: "Transparency", desc: "Clear disclosure when users interact with AI systems" },
                  { title: "Human Oversight", desc: "Controls enabling meaningful human intervention in AI processes" },
                  { title: "Accuracy & Robustness", desc: "Rigorous testing and validation procedures ensuring reliable performance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#60a5fa] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Known Limitations */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-semibold text-white">Known Limitations</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                We believe in honest disclosure of AI system limitations. Users should be aware of the following:
              </p>

              <div className="space-y-4">
                {[
                  { title: "Statistical Nature", desc: "AI models make predictions based on statistical patterns, not causal understanding. Outputs should always be validated by domain experts." },
                  { title: "Training Data Bias", desc: "Despite mitigation efforts, models may reflect biases present in training data or society. We continuously monitor and address identified biases." },
                  { title: "Novel Situations", desc: "Models may perform poorly on scenarios significantly different from training data. Out-of-distribution detection helps identify such cases." },
                  { title: "Adversarial Inputs", desc: "Deliberately crafted malicious inputs may cause unexpected behavior. We implement defenses but recommend human oversight for critical decisions." },
                  { title: "Context Limitations", desc: "Models have finite context windows and may miss important nuances in complex situations requiring extensive background knowledge." },
                  { title: "Evolving Standards", desc: "AI safety is an active research field. We update our practices as new best practices emerge." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Model Cards */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center"
            >
              <h2 className="text-3xl font-semibold text-white mb-4">Model Cards & Technical Documentation</h2>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto">
                Every AI model deployed on our platform comes with a comprehensive model card detailing architecture, training data, performance metrics, intended use cases, and known limitations.
              </p>
              <p className="text-sm text-gray-500">
                Model cards are available to enterprise customers and regulatory authorities upon request. Contact us at: transparency@bloomxanalytica.co.uk
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Questions or Concerns?</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                We welcome questions about our AI systems, safety practices, or compliance measures. We're committed to maintaining open dialogue with customers, regulators, and the broader AI community.
              </p>
              <div className="text-gray-400 space-y-2">
                <p>
                  <strong className="text-white">AI Safety Team:</strong> safety@bloomxanalytica.co.uk<br/>
                  <strong className="text-white">Transparency Inquiries:</strong> transparency@bloomxanalytica.co.uk<br/>
                  <strong className="text-white">General Contact:</strong> contact@bloomxanalytica.co.uk
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
