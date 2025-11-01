import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Code, Zap, Shield, Database, Settings, ChevronRight, Copy, Check, Terminal, FileCode, Layers, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [copiedCode, setCopiedCode] = useState(null);

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: Zap },
    { id: "authentication", title: "Authentication", icon: Shield },
    { id: "models", title: "Models API", icon: Layers },
    { id: "inference", title: "Inference", icon: Terminal },
    { id: "governance", title: "Governance", icon: Settings },
    { id: "sdk", title: "SDK Reference", icon: Code }
  ];

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language = "bash", id }) => (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
        >
          {copiedCode === id ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
      <pre className="bg-[#1a1b2e] rounded-xl p-4 overflow-x-auto border border-white/10">
        <code className="text-sm text-[#60a5fa] font-mono">{code}</code>
      </pre>
    </div>
  );

  return (
    <>
      <SEO 
        title="Documentation - Developer Guide | BloomX Analytica"
        description="Complete documentation for BloomX Analytica AI platform. API reference, SDK guides, code examples, and best practices for deploying responsible AI."
        keywords="BloomX documentation, AI API docs, SDK guide, AI platform tutorial, API reference, developer documentation"
      />
      
      <div className="bg-[#0a0b1a] min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-8 relative overflow-hidden grok-gradient-bg">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 mb-8">
                Developer Documentation
              </span>
              <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white">
                Build with <span className="grok-gradient-text">BloomX</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Everything you need to integrate transparent, compliant AI into your applications
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-8 bg-[#0a0b1a]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3">
                <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <section.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  
                  {/* Getting Started */}
                  {activeSection === "getting-started" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Getting Started</h2>
                      </div>
                      
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        Welcome to BloomX Analytica! This guide will help you get up and running with our AI platform in minutes.
                      </p>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">1. Install the SDK</h3>
                          <p className="text-gray-400 mb-4">Install the BloomX SDK using pip:</p>
                          <CodeBlock 
                            id="install"
                            code="pip install bloomx-sdk" 
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">2. Get Your API Key</h3>
                          <p className="text-gray-400 mb-4">
                            Sign up at <span className="text-[#60a5fa]">platform.bloomxanalytica.co.uk</span> and generate your API key from the dashboard.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">3. Initialize the Client</h3>
                          <CodeBlock
                            id="init"
                            language="python"
                            code={`from bloomx import BloomX

# Initialize client
client = BloomX(
    api_key="your_api_key_here",
    region="eu-west-1"  # EU-only deployment
)

# Test connection
status = client.health()
print(f"Status: {status}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">4. Deploy Your First Model</h3>
                          <CodeBlock
                            id="deploy"
                            language="python"
                            code={`# Deploy a model
model = client.models.deploy(
    model_id="llm-7b-instruct",
    infrastructure="private-cloud",
    governance_tier="strict"
)

print(f"Model deployed: {model.id}")`}
                          />
                        </div>

                        <div className="bg-[#60a5fa]/10 border border-[#60a5fa]/30 rounded-xl p-6">
                          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#60a5fa]" />
                            Quick Tip
                          </h4>
                          <p className="text-sm text-gray-300">
                            All models deployed with <code className="px-2 py-1 bg-white/10 rounded">governance_tier="strict"</code> include automatic bias detection, audit logging, and EU AI Act compliance.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Authentication */}
                  {activeSection === "authentication" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Authentication</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">API Keys</h3>
                          <p className="text-gray-400 mb-4">
                            BloomX uses API keys for authentication. Keep your keys secure and never commit them to version control.
                          </p>
                          <CodeBlock
                            id="auth-env"
                            language="bash"
                            code={`# Set as environment variable (recommended)
export BLOOMX_API_KEY="your_api_key_here"

# Then use in code without hardcoding
from bloomx import BloomX
client = BloomX()  # Reads from environment`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">API Key Scopes</h3>
                          <div className="space-y-3">
                            {[
                              { scope: "models:read", desc: "List and view model information" },
                              { scope: "models:write", desc: "Deploy and manage models" },
                              { scope: "inference:execute", desc: "Run inference on deployed models" },
                              { scope: "governance:read", desc: "View audit logs and compliance reports" }
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                                <code className="text-[#60a5fa] text-sm font-mono">{item.scope}</code>
                                <span className="text-gray-400 text-sm">{item.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Request Headers</h3>
                          <CodeBlock
                            id="headers"
                            language="bash"
                            code={`curl https://api.bloomxanalytica.co.uk/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Models API */}
                  {activeSection === "models" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Layers className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Models API</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">List Available Models</h3>
                          <CodeBlock
                            id="list-models"
                            language="python"
                            code={`# List all available models
models = client.models.list()

for model in models:
    print(f"{model.name} - {model.description}")
    print(f"  Parameters: {model.parameters}")
    print(f"  Compliance: {model.compliance_tier}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Deploy a Model</h3>
                          <CodeBlock
                            id="deploy-model"
                            language="python"
                            code={`# Deploy with configuration
deployment = client.models.deploy(
    model_id="llm-7b-instruct",
    infrastructure="private-cloud",
    governance_tier="strict",
    config={
        "max_tokens": 2048,
        "temperature": 0.7,
        "auto_scaling": True,
        "min_replicas": 2,
        "max_replicas": 10
    }
)

print(f"Deployment ID: {deployment.id}")
print(f"Endpoint: {deployment.endpoint_url}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Get Model Details</h3>
                          <CodeBlock
                            id="model-details"
                            language="python"
                            code={`# Get detailed model information
model = client.models.get("llm-7b-instruct")

print(f"Name: {model.name}")
print(f"Architecture: {model.architecture}")
print(f"Training Data: {model.training_data_info}")
print(f"Bias Metrics: {model.fairness_metrics}")
print(f"EU AI Act Compliant: {model.eu_ai_act_compliant}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Available Models</h3>
                          <div className="space-y-3">
                            {[
                              { name: "llm-7b-instruct", params: "7B", desc: "General-purpose instruction-following model" },
                              { name: "llm-13b-chat", params: "13B", desc: "Conversational AI optimized for dialogue" },
                              { name: "code-7b", params: "7B", desc: "Code generation and analysis" },
                              { name: "classifier-base", params: "350M", desc: "Fast classification and embedding" }
                            ].map((model, i) => (
                              <div key={i} className="p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <code className="text-[#60a5fa] font-mono text-sm">{model.name}</code>
                                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-400">{model.params} parameters</span>
                                </div>
                                <p className="text-sm text-gray-400">{model.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Inference */}
                  {activeSection === "inference" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Terminal className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Inference</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Basic Inference</h3>
                          <CodeBlock
                            id="basic-inference"
                            language="python"
                            code={`# Run inference on deployed model
response = model.generate(
    prompt="Explain quantum computing in simple terms",
    max_tokens=500,
    temperature=0.7
)

print(response.text)
print(f"Tokens used: {response.tokens_used}")
print(f"Latency: {response.latency_ms}ms")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Inference with Audit Trail</h3>
                          <CodeBlock
                            id="audit-inference"
                            language="python"
                            code={`# Enable full audit logging
response = model.generate(
    prompt="Analyze customer sentiment",
    audit={
        "enabled": True,
        "user_id": "user_123",
        "request_context": {
            "department": "customer_service",
            "purpose": "sentiment_analysis"
        }
    }
)

# Access audit information
print(f"Audit ID: {response.audit_id}")
print(f"Compliance verified: {response.compliance_check_passed}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Streaming Inference</h3>
                          <CodeBlock
                            id="stream-inference"
                            language="python"
                            code={`# Stream tokens as they're generated
for chunk in model.generate_stream(
    prompt="Write a story about AI",
    max_tokens=1000
):
    print(chunk.text, end="", flush=True)
    
    # Access intermediate metrics
    if chunk.is_final:
        print(f"\\nTotal latency: {chunk.latency_ms}ms")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Batch Inference</h3>
                          <CodeBlock
                            id="batch-inference"
                            language="python"
                            code={`# Process multiple prompts efficiently
prompts = [
    "Summarize Q1 earnings",
    "Analyze market trends",
    "Generate product description"
]

results = model.generate_batch(
    prompts=prompts,
    max_tokens=200,
    temperature=0.5
)

for i, result in enumerate(results):
    print(f"Result {i+1}: {result.text}")`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Governance */}
                  {activeSection === "governance" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">Governance & Compliance</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Access Audit Logs</h3>
                          <CodeBlock
                            id="audit-logs"
                            language="python"
                            code={`# Retrieve audit logs
logs = client.governance.audit_logs(
    start_date="2025-01-01",
    end_date="2025-01-31",
    model_id="llm-7b-instruct"
)

for log in logs:
    print(f"Request ID: {log.request_id}")
    print(f"User: {log.user_id}")
    print(f"Timestamp: {log.timestamp}")
    print(f"Compliance: {log.compliance_verified}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Bias Detection</h3>
                          <CodeBlock
                            id="bias-detection"
                            language="python"
                            code={`# Run bias detection on model outputs
bias_report = client.governance.analyze_bias(
    model_id="llm-7b-instruct",
    test_prompts=[
        "Describe a CEO",
        "Describe a nurse",
        "Who should get the loan?"
    ],
    demographic_attributes=["gender", "age", "ethnicity"]
)

print(f"Bias Score: {bias_report.overall_score}")
print(f"Issues Detected: {bias_report.issues_count}")
for issue in bias_report.issues:
    print(f"  - {issue.description}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Model Interpretability</h3>
                          <CodeBlock
                            id="interpretability"
                            language="python"
                            code={`# Get explanation for model decision
explanation = model.explain(
    prompt="Approve this loan application",
    context={"credit_score": 720, "income": 50000}
)

print("Feature Importance:")
for feature, importance in explanation.features.items():
    print(f"  {feature}: {importance:.3f}")

print(f"\\nConfidence: {explanation.confidence}")
print(f"Reasoning: {explanation.reasoning}")`}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Generate Compliance Report</h3>
                          <CodeBlock
                            id="compliance-report"
                            language="python"
                            code={`# Generate EU AI Act compliance report
report = client.governance.compliance_report(
    model_id="llm-7b-instruct",
    period="2025-Q1",
    include_audit_trail=True
)

# Export as PDF
report.export("compliance_report_q1.pdf")

print(f"Compliance Status: {report.status}")
print(f"Risk Level: {report.risk_level}")
print(f"Total Inferences: {report.inference_count}")`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SDK Reference */}
                  {activeSection === "sdk" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-3xl font-semibold text-white">SDK Reference</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Client Initialization</h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl">
                              <code className="text-[#60a5fa] text-sm font-mono">BloomX(api_key, region="eu-west-1")</code>
                              <p className="text-gray-400 text-sm mt-2">Initialize the BloomX client with your API key.</p>
                              <div className="mt-3 space-y-2">
                                <div className="text-sm">
                                  <span className="text-gray-500">Parameters:</span>
                                  <ul className="ml-4 mt-1 space-y-1">
                                    <li className="text-gray-400"><code className="text-[#60a5fa]">api_key</code> (str): Your API key</li>
                                    <li className="text-gray-400"><code className="text-[#60a5fa]">region</code> (str): Deployment region (default: "eu-west-1")</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Models Methods</h3>
                          <div className="space-y-3">
                            {[
                              {
                                method: "client.models.list()",
                                returns: "List[Model]",
                                desc: "List all available models"
                              },
                              {
                                method: "client.models.get(model_id)",
                                returns: "Model",
                                desc: "Get details for a specific model"
                              },
                              {
                                method: "client.models.deploy(model_id, **config)",
                                returns: "Deployment",
                                desc: "Deploy a model with configuration"
                              },
                              {
                                method: "client.models.delete(deployment_id)",
                                returns: "bool",
                                desc: "Delete a model deployment"
                              }
                            ].map((item, i) => (
                              <div key={i} className="p-4 bg-white/5 rounded-xl">
                                <code className="text-[#60a5fa] text-sm font-mono">{item.method}</code>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-gray-500">Returns:</span>
                                  <code className="text-xs text-gray-400">{item.returns}</code>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Inference Methods</h3>
                          <div className="space-y-3">
                            {[
                              {
                                method: "model.generate(prompt, **params)",
                                returns: "Response",
                                desc: "Generate text from prompt"
                              },
                              {
                                method: "model.generate_stream(prompt, **params)",
                                returns: "Iterator[Chunk]",
                                desc: "Stream generation token by token"
                              },
                              {
                                method: "model.generate_batch(prompts, **params)",
                                returns: "List[Response]",
                                desc: "Batch process multiple prompts"
                              },
                              {
                                method: "model.explain(prompt, **context)",
                                returns: "Explanation",
                                desc: "Get model decision explanation"
                              }
                            ].map((item, i) => (
                              <div key={i} className="p-4 bg-white/5 rounded-xl">
                                <code className="text-[#60a5fa] text-sm font-mono">{item.method}</code>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-gray-500">Returns:</span>
                                  <code className="text-xs text-gray-400">{item.returns}</code>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">Error Handling</h3>
                          <CodeBlock
                            id="error-handling"
                            language="python"
                            code={`from bloomx import BloomX, BloomXError, RateLimitError

try:
    response = model.generate(prompt="Hello")
except RateLimitError as e:
    print(f"Rate limit exceeded: {e.retry_after}s")
except BloomXError as e:
    print(f"API error: {e.message}")
    print(f"Status code: {e.status_code}")`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Help Section */}
                <div className="mt-8 bg-gradient-to-br from-[#60a5fa]/10 to-[#3b82f6]/10 border border-[#60a5fa]/30 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Need Help?</h3>
                  <p className="text-gray-300 mb-6">
                    Can't find what you're looking for? Our team is here to help.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white border-0">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Join Community
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}