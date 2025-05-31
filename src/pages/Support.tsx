import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Phone,
  Mail,
  Send,
  Search,
  Plus,
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "account" | "technical" | "billing";
}

interface TicketItem {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created: string;
  lastUpdate: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState("help");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);

  const faqs: FaqItem[] = [
    {
      id: "1",
      question: "How do I add a new vehicle to the fleet?",
      answer:
        'To add a new vehicle, navigate to the Fleet Management page, click on "Add Vehicle" button, and fill out the required information including make, model, VIN, and year. Once submitted, the vehicle will be added to your fleet inventory.',
      category: "general",
    },
    {
      id: "2",
      question: "How do I assign a driver to a vehicle?",
      answer:
        'On the Drivers page, find the driver you want to assign, click "Edit" or the three-dot menu next to their name. Select "Assign Vehicle" from the dropdown and choose the desired vehicle from the list of available vehicles.',
      category: "general",
    },
    {
      id: "3",
      question: "How do I reset my password?",
      answer:
        'Click on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email to create a new password. If you\'re already logged in, you can change your password in the Settings > Security section.',
      category: "account",
    },
    {
      id: "4",
      question: "What browsers are supported by FleetPro?",
      answer:
        "FleetPro works best with modern browsers such as Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari (latest versions). Internet Explorer is not fully supported and may result in degraded functionality.",
      category: "technical",
    },
    {
      id: "5",
      question: "How do I upgrade my subscription plan?",
      answer:
        'Go to Settings > Billing and click on "Change Plan". You\'ll see a comparison of available plans. Select your desired plan and follow the payment instructions to complete the upgrade.',
      category: "billing",
    },
    {
      id: "6",
      question: "How do I generate reports for specific time periods?",
      answer:
        'Navigate to the Reports & Analytics section, select the report type you want to generate, and use the date range picker to specify your desired time period. Click "Generate Report" to create the report based on your selections.',
      category: "general",
    },
  ];

  const tickets: TicketItem[] = [
    {
      id: "T-1001",
      title: "Cannot access maintenance history",
      status: "open",
      priority: "high",
      created: "2024-01-14T09:30:00Z",
      lastUpdate: "2024-01-14T09:30:00Z",
    },
    {
      id: "T-1002",
      title: "Need help setting up driver alerts",
      status: "in_progress",
      priority: "medium",
      created: "2024-01-13T14:45:00Z",
      lastUpdate: "2024-01-14T10:15:00Z",
    },
    {
      id: "T-1003",
      title: "Billing inquiry about last invoice",
      status: "resolved",
      priority: "low",
      created: "2024-01-12T11:20:00Z",
      lastUpdate: "2024-01-13T16:30:00Z",
    },
  ];

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-amber-100 text-amber-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-amber-100 text-amber-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Support / Help Center
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("help")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "help"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & FAQs</span>
          </button>

          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "tickets"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>My Support Tickets</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "contact"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact Support</span>
          </button>
        </div>

        {activeTab === "help" && (
          <div>
            <div className="flex flex-wrap gap-4 justify-between mb-6">
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search help articles..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General</option>
                  <option value="account">Account</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                </select>
              </div>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                        <h3 className="font-medium text-gray-800">
                          {faq.question}
                        </h3>
                      </div>
                      <Plus
                        className={`w-5 h-5 transform transition-transform ${
                          expandedFaqs.includes(faq.id) ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    {expandedFaqs.includes(faq.id) && (
                      <div className="p-4 pt-0 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No FAQs found matching your search criteria.
              </div>
            )}
          </div>
        )}

        {activeTab === "tickets" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">My Support Tickets</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>New Ticket</span>
              </button>
            </div>

            {tickets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50 text-gray-600 text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-4 text-left">Ticket ID</th>
                      <th className="py-3 px-4 text-left">Subject</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Priority</th>
                      <th className="py-3 px-4 text-left">Created</th>
                      <th className="py-3 px-4 text-left">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{ticket.id}</td>
                        <td className="py-3 px-4">
                          <a href="#" className="text-blue-600 hover:underline">
                            {ticket.title}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs capitalize ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {formatDate(ticket.created)}
                        </td>
                        <td className="py-3 px-4">
                          {formatDate(ticket.lastUpdate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                You don't have any support tickets yet.
              </div>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-4">Send us a message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="">Select a category</option>
                      <option value="technical">Technical Support</option>
                      <option value="account">Account Issues</option>
                      <option value="billing">Billing Questions</option>
                      <option value="feature">Feature Requests</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-md h-32"
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments (optional)
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Max file size: 10MB. Accepted formats: JPG, PNG, PDF
                    </p>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                    <span>Submit Ticket</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Support Hotline</h3>
                      <p className="text-gray-700">
                        +1-800-FLEET-PRO (353-8776)
                      </p>
                      <p className="text-sm text-gray-500">
                        Monday - Friday, 8am - 6pm ET
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-gray-700">support@fleetpro.example</p>
                      <p className="text-sm text-gray-500">
                        24/7 response, typically within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-gray-700">Available on our website</p>
                      <p className="text-sm text-gray-500">
                        Monday - Friday, 9am - 5pm ET
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Documentation</h3>
                      <p className="text-gray-700">
                        Visit our comprehensive knowledge base
                      </p>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        docs.fleetpro.example
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
