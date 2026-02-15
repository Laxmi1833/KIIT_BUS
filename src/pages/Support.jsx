import { useState } from 'react'

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    }, 3000)
  }

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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-dark mb-3">Support & Help</h1>
          <p className="text-gray-600 text-lg">
            We’re here to help you with anything related to KiitBus
          </p>
        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          <SupportCard title="Phone Support" value="+91 98765 43210" note="24/7 Available" />
          <SupportCard title="Email Support" value="transport@kiit.ac.in" note="Response in 2 hrs" />
          <SupportCard title="Live Chat" value="In-App Chat" note="7 AM – 9 PM" />
        </div>

        {/* FORM + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM CARD */}
          <div className="relative bg-white rounded-2xl shadow-lg p-10 overflow-hidden">

            {/* Gradient top bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-orange-400"></div>

            <h2 className="text-2xl font-bold text-dark mb-6">
              Send us a Message
            </h2>

            {/* SUCCESS */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3 animate-fade-in">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  ✅
                </div>
                <div>
                  <p className="font-semibold text-green-900">
                    Message sent successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    Our support team will contact you shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />

              <AnimatedInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@kiit.ac.in"
                required
              />

              <AnimatedInput
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-slate rounded-xl resize-none
                             focus:outline-none focus:ring-2 focus:ring-primary
                             transition-all duration-200 hover:border-primary"
                  placeholder="Describe your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-yellow-400
                           text-dark font-bold px-6 py-4 rounded-xl
                           hover:scale-[1.02] active:scale-[0.97]
                           transition-transform duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-5 border-l-4 border-primary hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-dark mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function AnimatedInput({ label, ...props }) {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-dark mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 border border-slate rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-primary
                   transition-all duration-200
                   group-hover:border-primary"
      />
    </div>
  )
}

function SupportCard({ title, value, note }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="text-primary text-2xl font-bold mb-2">{title}</div>
      <p className="text-dark font-semibold">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{note}</p>
    </div>
  )
}
