import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Clock, MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple client-side handling
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        inquiryType: "",
        message: ""
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "contact@bloomxanalytica.co.uk",
      secondary: "We typically respond within 24 hours",
      description: "For general inquiries and support"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "71-75 Shelton Street",
      secondary: "Covent Garden, London WC2H 9JQ",
      description: "Schedule an in-person meeting"
    },
    {
      icon: Clock,
      title: "Office Hours",
      primary: "Monday - Friday: 9:00 AM - 6:00 PM",
      secondary: "Saturday: 10:00 AM - 2:00 PM",
      description: "All times in GMT"
    }
  ];

  const quickLinks = [
    { icon: MessageSquare, title: "Request a Demo", description: "See our platform in action" },
    { icon: Users, title: "Partner with Us", description: "Explore collaboration opportunities" },
    { icon: Clock, title: "Schedule a Call", description: "Book time with our team" }
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch | BloomX Analytica"
        description="Contact BloomX Analytica. Located in London, UK. Email: contact@bloomxanalytica.co.uk. Schedule a demo or discuss your AI infrastructure needs."
        keywords="contact BloomX, AI demo, enterprise AI contact, London AI company, AI consultation, BloomX Analytica contact"
      />
      
      <div className="bg-[#0a0b1a]">
        <section className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-8 relative overflow-hidden grok-gradient-bg">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute inset-0 mesh-gradient" />
          
          <div className="relative max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8">
                Get in Touch
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 leading-[0.9] tracking-tight text-white">
                Let's Build
                <br />
                <span className="grok-gradient-text">Together</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                Have a question or ready to transform your AI infrastructure?
                <br className="hidden sm:block" />
                We're here to help you succeed
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl hover:bg-white/[0.07] transition-all duration-300 group"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{method.title}</h3>
                  <p className="text-[#60a5fa] font-medium mb-1 text-sm sm:text-base">{method.primary}</p>
                  <p className="text-sm text-gray-400 mb-3">{method.secondary}</p>
                  <p className="text-xs text-gray-500">{method.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 grok-gradient-light">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-[#0a0b1a]">Send a Message</h2>
                <p className="text-gray-600 mb-8">Or email us directly at contact@bloomxanalytica.co.uk</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-white border-[#0a0b1a]/10 text-[#0a0b1a] placeholder:text-gray-400 focus:border-[#60a5fa] rounded-xl h-12 px-4 text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        id="email"
                        name="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="bg-white border-[#0a0b1a]/10 text-[#0a0b1a] placeholder:text-gray-400 focus:border-[#60a5fa] rounded-xl h-12 px-4 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company Name"
                      className="bg-white border-[#0a0b1a]/10 text-[#0a0b1a] placeholder:text-gray-400 focus:border-[#60a5fa] rounded-xl h-12 px-4 text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-white border border-[#0a0b1a]/10 text-[#0a0b1a] rounded-xl h-12 px-4 text-base focus:border-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/20"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="demo">Request a Demo</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Technical Support</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project, needs, or questions..."
                      rows={6}
                      className="bg-white border-[#0a0b1a]/10 text-[#0a0b1a] placeholder:text-gray-400 focus:border-[#60a5fa] rounded-xl p-4 text-base resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold h-14 hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all duration-300 border-0 rounded-full text-base"
                  >
                    {submitted ? (
                      <>✓ Message Received - We'll Contact You Soon!</>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting, you agree to our{" "}
                    <Link to={createPageUrl("PrivacyPolicy")} className="text-[#60a5fa] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#0a0b1a]">Quick Links</h3>
                  <div className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <div
                        key={link.title}
                        className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#0a0b1a]/10 hover:border-[#60a5fa]/30 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0a0b1a] mb-1">{link.title}</h4>
                          <p className="text-sm text-gray-600">{link.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-[#0a0b1a]/10">
                  <h3 className="text-xl font-semibold mb-4 text-[#0a0b1a]">Office Hours</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium text-[#0a0b1a]">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium text-[#0a0b1a]">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-[#0a0b1a]">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    All times are in GMT (Greenwich Mean Time)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How quickly can we get started?",
                  a: "We can typically have a proof of concept running within 2-3 weeks of initial consultation."
                },
                {
                  q: "Do you offer on-premise deployment?",
                  a: "Yes, we offer both on-premise and private cloud deployment options to meet your security requirements."
                },
                {
                  q: "What industries do you serve?",
                  a: "We serve healthcare, finance, manufacturing, retail, and public sector organizations across Europe."
                },
                {
                  q: "Are you GDPR compliant?",
                  a: "Yes, all our solutions are built with GDPR and EU AI Act compliance as core requirements."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="aspect-[2/1] bg-gradient-to-br from-[#0a0b1a] via-[#1a1b3a] to-[#0a0b1a] flex items-center justify-center relative">
                <div className="absolute inset-0 dot-pattern opacity-20" />
                <div className="relative text-center p-8">
                  <MapPin className="w-16 h-16 text-[#60a5fa] mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Visit Our Office</h3>
                  <p className="text-gray-400 mb-1">71-75 Shelton Street</p>
                  <p className="text-lg font-medium text-white">Covent Garden, London WC2H 9JQ</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}