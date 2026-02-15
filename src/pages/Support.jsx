import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Phone, Mail, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'Navigate to the "Book Ride" section, select your pickup location and destination, and choose your preferred bus.',
    },
    {
      question: 'Can I track my bus in real-time?',
      answer: 'Yes, use the Live Tracking page to see bus locations and ETAs.',
    },
    {
      question: 'How can I cancel my booking?',
      answer: 'You can cancel from the Dashboard within 15 minutes of departure.',
    },
    {
      question: 'What are peak hours?',
      answer: 'Typically 7–9 AM and 5–7 PM on weekdays.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Support & Help</h1>
          <p className="text-slate-500 mt-2">We’re here to help you with anything related to KiitBus.</p>
        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SupportCard title="Phone Support" value="+91 98765 43210" note="24/7 Available" icon={<Phone className="w-6 h-6 text-blue-600" />} />
          <SupportCard title="Email Support" value="transport@kiit.ac.in" note="Response in 2 hrs" icon={<Mail className="w-6 h-6 text-amber-600" />} />
          <SupportCard title="Live Chat" value="In-App Chat" note="7 AM – 9 PM" icon={<HelpCircle className="w-6 h-6 text-green-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-green-900">Message Sent!</h3>
                <p className="text-green-700 mt-2">We will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <input
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800">Send Message</Button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ title, value, note, icon }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center group">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-lg font-bold text-slate-900 my-1">{value}</p>
      <p className="text-xs text-slate-500">{note}</p>
    </div>
  )
}
