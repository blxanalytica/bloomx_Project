import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Target, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";

// Import job data directly inline
const jobsData = {
  jobs: [
    {
      id: "senior-ai-ml-engineer",
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£80,000 - £120,000",
      status: "active",
      featured: true
    },
    {
      id: "ai-research-scientist",
      title: "AI Research Scientist",
      department: "Research",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£90,000 - £140,000",
      status: "active",
      featured: true
    },
    {
      id: "product-designer",
      title: "Product Designer",
      department: "Design",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£60,000 - £90,000",
      status: "active",
      featured: false
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£70,000 - £100,000",
      status: "active",
      featured: false
    },
    {
      id: "customer-success-manager",
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "London, UK",
      type: "Full-time",
      salary: "£50,000 - £70,000",
      status: "active",
      featured: false
    }
  ]
};

export default function Careers() {
  const [jobPositions, setJobPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load jobs from data
    const activeJobs = jobsData.jobs.filter(job => job.status === 'active');
    setJobPositions(activeJobs);
    setIsLoading(false);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "We build technology that respects humanity and upholds the highest ethical standards."
    },
    {
      icon: Lightbulb,
      title: "Curiosity",
      description: "We question assumptions, explore new frontiers, and never stop learning."
    },
    {
      icon: Target,
      title: "Impact",
      description: "We measure success by the positive change we create for users and society."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We win together, support each other, and value diverse perspectives."
    }
  ];

  const benefits = [
    "Competitive salary + equity",
    "Flexible hybrid/remote work",
    "Learning & conference budget",
    "Health & wellness support",
    "26 days holiday + bank holidays",
    "Parental leave support",
    "Latest tech & tools",
    "Research time (20% policy)"
  ];

  return (
    <>
      <SEO 
        title="Careers - Join Our Team | BloomX Analytica"
        description="Build the future of responsible AI. Join our team in London working on GDPR-compliant, transparent AI systems. View open positions in engineering, research, and design."
        keywords="AI careers, AI jobs London, machine learning jobs, AI engineer jobs, responsible AI careers, tech jobs London, BloomX careers"
      />
      
      <div className="bg-[#0a0b1a]">
        {/* Hero Section */}
        <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="max-w-[1400px] mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8">
                Join Our Team
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 sm:mb-8 text-white leading-[0.9]">
                Build the Future of{" "}
                <span className="grok-gradient-text">Responsible AI</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 font-light">
                Join us in creating AI systems that organizations can trust and society can depend on
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-4 text-white">
                Our <span className="grok-gradient-text">Values</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we build and every decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#141824] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-4 text-white">
                Benefits & <span className="grok-gradient-text">Perks</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We invest in our team's growth, wellbeing, and success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#141824] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-white">{benefit}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-32 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-4 text-white">
                Open <span className="grok-gradient-text">Positions</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Join our team and help shape the future of AI
              </p>
            </motion.div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-[#60a5fa]"></div>
              </div>
            ) : jobPositions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No open positions at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobPositions.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-[#141824] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#60a5fa] transition-all">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {role.department}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {role.location}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                            {role.type}
                          </span>
                          {role.featured && (
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white text-xs font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <Link to={`${createPageUrl("JobApplication")}?id=${role.id}`}>
                        <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0 font-semibold hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-8 bg-[#0a0b1a]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-semibold mb-6 text-white">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              We're always looking for exceptional talent. Send us your CV and tell us how you'd like to contribute.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0 text-lg px-8 py-6 font-semibold hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all rounded-full">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}