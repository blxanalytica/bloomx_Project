
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail, FileText } from "lucide-react";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services, we may collect: name, email address, company name, phone number, job title, and professional information you provide through contact forms, job applications, or service registration."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including IP address, browser type, pages visited, time spent, and referring website."
        },
        {
          subtitle: "Cookies & Tracking",
          text: "We use essential cookies for platform functionality and analytics cookies to improve our services. You can control cookie preferences through your browser settings."
        }
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "To provide, maintain, and improve our AI platform services, process your requests, and communicate with you about your account or services."
        },
        {
          subtitle: "Business Operations",
          text: "To respond to inquiries, process job applications, send marketing communications (with consent), and conduct research and analytics to improve our offerings."
        },
        {
          subtitle: "Legal Compliance",
          text: "To comply with legal obligations, enforce our terms, protect our rights and safety, and respond to legal requests from authorities."
        }
      ]
    },
    {
      icon: Eye,
      title: "Data Sharing & Disclosure",
      content: [
        {
          subtitle: "Service Providers",
          text: "We share data with trusted third-party service providers who assist in platform hosting, analytics, customer support, and email delivery. All providers are contractually bound to protect your data."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you and ensure continued protection under this policy."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or government request, or to protect rights, property, and safety."
        },
        {
          subtitle: "No Data Sales",
          text: "We never sell your personal data to third parties for marketing purposes."
        }
      ]
    },
    {
      icon: Database,
      title: "Data Security & Retention",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures including encryption at rest and in transit, secure authentication, regular security audits, and access controls. We maintain SOC 2 and ISO 27001 certifications."
        },
        {
          subtitle: "Data Retention",
          text: "We retain personal data only as long as necessary to fulfill purposes outlined in this policy or as required by law. Contact information: 2 years after last interaction. Account data: duration of active account plus 1 year. Job applications: 1 year from submission."
        },
        {
          subtitle: "Data Location",
          text: "All data is processed and stored within the European Union to ensure GDPR compliance. We do not transfer personal data outside the EU/EEA."
        }
      ]
    },
    {
      icon: FileText,
      title: "Your Rights (GDPR)",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access your personal data and receive a copy in a structured, commonly used format."
        },
        {
          subtitle: "Rectification & Erasure",
          text: "You can request correction of inaccurate data or deletion of your personal information (subject to legal retention requirements)."
        },
        {
          subtitle: "Restriction & Objection",
          text: "You may restrict processing of your data or object to processing based on legitimate interests, including marketing communications."
        },
        {
          subtitle: "Withdraw Consent",
          text: "Where processing is based on consent, you can withdraw it at any time without affecting the lawfulness of prior processing."
        },
        {
          subtitle: "Lodge a Complaint",
          text: "You have the right to lodge a complaint with your local data protection authority (ICO in the UK)."
        }
      ]
    },
    {
      icon: Mail,
      title: "Contact & Requests",
      content: [
        {
          subtitle: "Data Protection Officer",
          text: "For privacy-related questions or to exercise your rights, contact our Data Protection Officer at: privacy@bloomxanalytica.co.uk"
        },
        {
          subtitle: "Response Time",
          text: "We will respond to all requests within 30 days as required by GDPR. Complex requests may take up to 60 days with notification."
        },
        {
          subtitle: "Verification",
          text: "To protect your privacy, we may request verification of your identity before processing data access or deletion requests."
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - Data Protection & GDPR | BloomX Analytica"
        description="BloomX Analytica Privacy Policy. GDPR compliant data protection practices, your rights, and how we handle your personal information."
        keywords="privacy policy, GDPR, data protection, privacy rights, data security, BloomX Analytica"
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
                Privacy <span className="grok-gradient-text">Policy</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Your privacy is fundamental to how we build and operate our AI platform
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Commitments */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "GDPR Compliant", desc: "Full compliance with EU data protection regulations" },
                { label: "EU Data Storage", desc: "All data processed and stored within the European Union" },
                { label: "Your Rights Respected", desc: "Easy access, correction, and deletion of your data" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center"
                >
                  <div className="text-2xl font-semibold text-white mb-2">{item.label}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
              </p>
              <ul className="space-y-2 text-gray-400 ml-6">
                <li>• Posting the updated policy on our website with a new "Last Updated" date</li>
                <li>• Sending an email notification to registered users</li>
                <li>• Displaying a prominent notice on our platform</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                Your continued use of our services after changes indicates acceptance of the updated policy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mt-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  <strong className="text-white">BloomX Analytica Limited</strong><br/>
                  71-75 Shelton Street<br/>
                  Covent Garden, London<br/>
                  WC2H 9JQ, United Kingdom
                </p>
                <p>
                  <strong className="text-white">Email:</strong> privacy@bloomxanalytica.co.uk<br/>
                  <strong className="text-white">General Inquiries:</strong> contact@bloomxanalytica.co.uk
                </p>
                <p>
                  <strong className="text-white">ICO Registration:</strong> We are registered with the UK Information Commissioner's Office (ICO).
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
