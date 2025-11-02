import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, CheckCircle2, AlertCircle, ArrowLeft, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { getApiBaseUrl } from "@/utils/apiConfig";

const jobsData = {
  jobs: [
    {
      id: "senior-ai-ml-engineer",
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      salary: "£80,000 - £120,000",
      description: "We're looking for an experienced AI/ML Engineer to help build and scale our edge AI platform. You'll work on cutting-edge problems in model optimization, distributed inference, and real-time AI systems.",
      responsibilities: [
        "Design and implement scalable ML inference pipelines",
        "Optimize models for edge deployment and low-latency serving",
        "Build monitoring and observability tools for production AI systems",
        "Collaborate with research team on model interpretability features",
        "Mentor junior engineers and contribute to technical architecture"
      ],
      requirements: [
        "5+ years experience in ML engineering or related field",
        "Strong Python skills and experience with PyTorch/TensorFlow",
        "Experience with model optimization (quantization, pruning, distillation)",
        "Knowledge of distributed systems and cloud infrastructure",
        "Strong communication skills and ability to work in cross-functional teams"
      ],
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
      description: "Join our research team to advance the state-of-the-art in responsible AI. You'll work on model interpretability, bias detection, and robustness testing for production AI systems.",
      responsibilities: [
        "Conduct research in AI safety, interpretability, and fairness",
        "Publish findings in top-tier conferences and journals",
        "Collaborate with engineering team to deploy research innovations",
        "Design and implement bias detection algorithms",
        "Contribute to EU AI Act compliance frameworks"
      ],
      requirements: [
        "PhD in Computer Science, AI, or related field (or equivalent experience)",
        "Strong publication record in ML/AI conferences",
        "Experience with explainable AI and model interpretability",
        "Proficiency in Python and modern ML frameworks",
        "Knowledge of AI ethics and regulatory compliance"
      ],
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
      description: "We're seeking a talented Product Designer to create intuitive interfaces for complex AI systems. You'll design experiences that make AI transparency and governance accessible to enterprise users.",
      responsibilities: [
        "Design user interfaces for AI platform and dashboard",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Collaborate with engineers to implement designs",
        "Establish and maintain design system"
      ],
      requirements: [
        "4+ years experience in product design or UX/UI design",
        "Strong portfolio demonstrating enterprise product design",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Experience designing data-heavy interfaces and dashboards",
        "Understanding of accessibility and inclusive design principles"
      ],
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
      description: "Help us build and maintain the infrastructure that powers our AI platform. You'll work on Kubernetes, CI/CD pipelines, and cloud infrastructure across AWS, Azure, and GCP.",
      responsibilities: [
        "Manage Kubernetes clusters and container orchestration",
        "Build and maintain CI/CD pipelines",
        "Implement monitoring, logging, and alerting systems",
        "Optimize infrastructure costs and performance",
        "Ensure security best practices and compliance"
      ],
      requirements: [
        "3+ years experience in DevOps or Site Reliability Engineering",
        "Strong knowledge of Kubernetes and Docker",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
        "Scripting skills in Python, Bash, or Go"
      ],
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
      description: "Be the trusted advisor for our enterprise customers. You'll help organizations successfully deploy and scale AI systems while ensuring they achieve their business objectives.",
      responsibilities: [
        "Onboard new enterprise customers and ensure successful deployment",
        "Build strong relationships with key stakeholders",
        "Conduct training sessions and workshops",
        "Identify expansion opportunities and drive renewals",
        "Gather feedback and advocate for customer needs internally"
      ],
      requirements: [
        "3+ years in customer success, account management, or consulting",
        "Experience working with enterprise B2B software clients",
        "Strong technical aptitude and ability to understand AI/ML concepts",
        "Excellent communication and presentation skills",
        "Proven track record of driving customer satisfaction and retention"
      ],
      status: "active",
      featured: false
    }
  ]
};

export default function JobApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "", // Honeypot
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    
    if (jobId) {
      const job = jobsData.jobs.find(j => j.id === jobId);
      setJobDetails(job || null);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFieldErrors({});
    setSubmitted(false);

    try {
      // Validate resume file
      if (!resumeFile) {
        setFieldErrors({ resume: 'Resume is required' });
        setIsSubmitting(false);
        toast.error('Resume is required');
        return;
      }

      const apiBaseUrl = getApiBaseUrl();
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('applyFor', jobDetails?.title || '');
      if (formData.message) {
        formDataToSend.append('message', formData.message);
      }
      formDataToSend.append('resume', resumeFile);
      
      // Add additional attachments
      attachmentFiles.forEach((file) => {
        formDataToSend.append('attachments', file);
      });

      // Honeypot field
      if (formData.company) {
        formDataToSend.append('company', formData.company);
      }

      const response = await fetch(`${apiBaseUrl}/api/forms/career`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.status === 204) {
        // Honeypot triggered, silently ignore
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          toast.error(data.message || 'Validation failed', {
            description: 'Please check the form fields and try again.',
          });
        } else {
          toast.error(data.message || 'Failed to submit application');
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmitted(true);
      toast.success('Application submitted successfully!', {
        description: 'We\'ll review your application and get back to you soon.',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit application', {
        description: 'Please try again later or email us directly.',
      });
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEO 
          title="Application Submitted - Thank You | BloomX Analytica"
          description="Your job application has been successfully submitted to BloomX Analytica. We'll review your application and get back to you shortly."
        />
        <div className="bg-[#0a0b1a] min-h-screen">
          <div className="pt-40 pb-32 px-8">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h1 className="text-4xl font-semibold text-white mb-4">Application Received!</h1>
                <p className="text-lg text-gray-400 mb-8">
                  Thank you for your interest in BloomX Analytica. We will get back to you soon.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to={createPageUrl("Home")}>
                    <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[#0a0b1a] min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-[#60a5fa]"></div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <>
        <SEO 
          title="Job Not Found | BloomX Analytica"
          description="The job position you're looking for could not be found or has been closed."
        />
        <div className="bg-[#0a0b1a] min-h-screen">
          <div className="pt-40 pb-32 px-8 text-center">
            <h1 className="text-4xl font-semibold text-white mb-4">Job Not Found</h1>
            <p className="text-lg text-gray-400 mb-8">The position you're looking for doesn't exist or has been closed.</p>
            <Link to={createPageUrl("Careers")}>
              <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0">
                View All Positions
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`Apply for ${jobDetails.title} | BloomX Analytica`}
        description={`Apply for ${jobDetails.title} at BloomX Analytica. ${jobDetails.location} - ${jobDetails.type}. Join our team building responsible AI systems.`}
        keywords={`${jobDetails.title} job, AI jobs, ${jobDetails.department} jobs, ${jobDetails.location} jobs, BloomX careers`}
      />
      
      <div className="bg-[#0a0b1a] min-h-screen">
        <section className="pt-32 pb-16 px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <Link to={createPageUrl("Careers")} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {jobDetails.featured && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white text-xs font-semibold">
                  Featured
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs">
                {jobDetails.department}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">{jobDetails.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{jobDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span>{jobDetails.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>{jobDetails.salary}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">About the Role</h2>
                <p className="text-gray-400 leading-relaxed">{jobDetails.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {jobDetails.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {jobDetails.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-8 bg-[#0a0b1a] border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-4">Apply for this Position</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <label htmlFor="company-honeypot">Leave this field empty</label>
                <Input
                  id="company-honeypot"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                <Input
                  required
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  className={`bg-[#141824] border-white/10 text-white ${fieldErrors.name ? 'border-red-500' : ''}`}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    className={`bg-[#141824] border-white/10 text-white ${fieldErrors.email ? 'border-red-500' : ''}`}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
                  <Input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                    }}
                    placeholder="+44 20 1234 5678"
                    className={`bg-[#141824] border-white/10 text-white ${fieldErrors.phone ? 'border-red-500' : ''}`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Resume/CV *</label>
                <Input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setResumeFile(file);
                      if (fieldErrors.resume) setFieldErrors({ ...fieldErrors, resume: '' });
                    }
                  }}
                  className={`bg-[#141824] border-white/10 text-white ${fieldErrors.resume ? 'border-red-500' : ''}`}
                />
                {resumeFile && (
                  <p className="text-gray-400 text-sm mt-2">Selected: {resumeFile.name}</p>
                )}
                {fieldErrors.resume && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.resume}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Additional Attachments (Optional)</label>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setAttachmentFiles(files);
                  }}
                  className="bg-[#141824] border-white/10 text-white"
                />
                {attachmentFiles.length > 0 && (
                  <p className="text-gray-400 text-sm mt-2">
                    Selected: {attachmentFiles.map(f => f.name).join(', ')}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">You can attach portfolio, cover letter, etc. (max 5MB each, 10MB total)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Cover Letter / Message (Optional)</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                  }}
                  rows={6}
                  className={`bg-[#141824] border-white/10 text-white ${fieldErrors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your motivation, relevant experience, and what you'd bring to the team..."
                />
                {fieldErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                )}
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0 text-lg py-6 font-semibold hover:shadow-lg hover:shadow-[#60a5fa]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? '✓ Application Submitted!' : isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}