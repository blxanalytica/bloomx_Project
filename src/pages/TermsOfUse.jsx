
import { motion } from "framer-motion";
import { FileText, AlertCircle, Shield, Users, Gavel, XCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function TermsOfUse() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing or using the BloomX Analytica platform and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."
        },
        {
          text: "These terms constitute a legally binding agreement between you (either as an individual or on behalf of an entity) and BloomX Analytica Limited. Your use of our services is also governed by our Privacy Policy, which is incorporated by reference into these terms."
        }
      ]
    },
    {
      icon: Users,
      title: "User Accounts & Responsibilities",
      content: [
        {
          subtitle: "Account Creation",
          text: "To access certain features, you must register for an account. You must provide accurate, current, and complete information and keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "Account Security",
          text: "You are solely responsible for all activities that occur under your account. Notify us immediately of any unauthorized use or security breach. We are not liable for any loss or damage arising from your failure to protect your account information."
        },
        {
          subtitle: "Acceptable Use",
          text: "You agree to use our services only for lawful purposes and in accordance with these terms. You will not: (a) violate any applicable laws or regulations; (b) infringe on intellectual property rights; (c) transmit malicious code or viruses; (d) attempt to gain unauthorized access; (e) interfere with service operation; or (f) use the service for any fraudulent purpose."
        }
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property Rights",
      content: [
        {
          subtitle: "Our IP",
          text: "All content, features, and functionality of our platform, including but not limited to text, graphics, logos, software, and AI models, are owned by BloomX Analytica and protected by UK, EU, and international copyright, trademark, and other intellectual property laws."
        },
        {
          subtitle: "Limited License",
          text: "We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for your internal business purposes in accordance with these terms. This license does not include any right to: (a) resell or commercial use; (b) derivative works; (c) data mining or scraping; or (d) reverse engineering."
        },
        {
          subtitle: "Your Content",
          text: "You retain all rights to data and content you upload to our platform. By uploading, you grant us a license to use, store, and process your content solely to provide our services. We will not use your data to train AI models or for any purpose beyond service delivery without explicit consent."
        }
      ]
    },
    {
      icon: Gavel,
      title: "Service Terms & Limitations",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. We may suspend or terminate services for maintenance, updates, security reasons, or if you violate these terms. Scheduled maintenance will be communicated in advance when possible."
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice. We may also update these terms periodically. Continued use after changes constitutes acceptance of new terms."
        },
        {
          subtitle: "Third-Party Services",
          text: "Our platform may integrate with third-party services. We are not responsible for the availability, accuracy, or content of third-party services. Your use of third-party services is subject to their respective terms and policies."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "Disclaimers & Limitation of Liability",
      content: [
        {
          subtitle: "Warranty Disclaimer",
          text: "OUR SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT SERVICES WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED."
        },
        {
          subtitle: "AI Model Disclaimer",
          text: "While we implement extensive safety measures, AI models may produce unexpected outputs. You are responsible for reviewing and validating all AI-generated content before use. We are not liable for decisions made based on AI outputs."
        },
        {
          subtitle: "Limitation of Liability",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, BLOOMX ANALYTICA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES ARISING FROM YOUR USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM."
        },
        {
          subtitle: "Exceptions",
          text: "Nothing in these terms excludes or limits our liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; or (c) any liability that cannot be excluded under UK law."
        }
      ]
    },
    {
      icon: XCircle,
      title: "Termination & Suspension",
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your account at any time by contacting us at contact@bloomxanalytica.co.uk. Upon termination, your right to access services will immediately cease."
        },
        {
          subtitle: "Termination by Us",
          text: "We may suspend or terminate your access immediately without notice if you: (a) violate these terms; (b) engage in fraudulent or illegal activity; (c) pose a security risk; or (d) fail to pay fees (for paid services). We will provide notice when legally required or reasonably possible."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination: (a) all licenses granted to you will immediately cease; (b) you must stop using our services; (c) we will delete your data in accordance with our Privacy Policy; (d) provisions regarding IP, disclaimers, and limitations of liability will survive termination."
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Terms of Use - Legal Agreement | BloomX Analytica"
        description="BloomX Analytica Terms of Use. Legal terms governing the use of our AI platform, user responsibilities, and service terms."
        keywords="terms of use, terms of service, legal agreement, user agreement, BloomX Analytica"
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
                Terms of <span className="grok-gradient-text">Use</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Legal terms governing your use of the BloomX Analytica platform and services
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sections */}
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
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-white mb-2">{item.subtitle}</h3>
                      )}
                      <p className="text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Terms */}
        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Governing Law & Dispute Resolution</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                These terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of England and Wales. Before initiating legal proceedings, parties agree to attempt to resolve disputes through good faith negotiation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">General Provisions</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  <strong className="text-white">Entire Agreement:</strong> These terms, together with our Privacy Policy, constitute the entire agreement between you and BloomX Analytica regarding use of our services.
                </p>
                <p>
                  <strong className="text-white">Severability:</strong> If any provision is found unenforceable, the remaining provisions will remain in full force and effect.
                </p>
                <p>
                  <strong className="text-white">No Waiver:</strong> Our failure to enforce any right or provision shall not constitute a waiver of such right or provision.
                </p>
                <p>
                  <strong className="text-white">Assignment:</strong> You may not assign or transfer these terms without our written consent. We may assign these terms to any affiliate or successor.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400 mb-4">
                If you have questions about these Terms of Use, please contact us:
              </p>
              <div className="text-gray-400 space-y-2">
                <p>
                  <strong className="text-white">BloomX Analytica Limited</strong><br/>
                  71-75 Shelton Street, Covent Garden<br/>
                  London, WC2H 9JQ, United Kingdom
                </p>
                <p>
                  <strong className="text-white">Email:</strong> legal@bloomxanalytica.co.uk
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
