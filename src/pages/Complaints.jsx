import { useState } from 'react'

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    busNumber: '',
    date: '',
    title: '',
    description: '',
    category: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = [
    'Bus Condition',
    'Driver Behavior',
    'Schedule Delay',
    'Safety Issue',
    'Lost and Found',
    'Other',
  ]

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
        busNumber: '',
        date: '',
        title: '',
        description: '',
        category: '',
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-14">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-dark mb-3">
            File a Complaint
          </h1>
          <p className="text-gray-600 text-lg">
            Help us improve campus transportation services
          </p>
        </div>

        {/* FORM CARD */}
        <div className="relative bg-white rounded-2xl shadow-lg p-10 overflow-hidden">

          {/* Gradient Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-orange-400"></div>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-xl flex gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                ✅
              </div>
              <div>
                <p className="font-semibold text-green-900 text-lg">
                  Complaint submitted successfully!
                </p>
                <p className="text-sm text-green-700">
                  Reference ID: #COMP-{Math.floor(Math.random() * 10000)}
                </p>
                <p className="text-sm text-green-700">
                  Our team will review this within 48 hours.
                </p>
              </div>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-7">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedInput
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <AnimatedInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@university.edu"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedInput
                label="Bus Number (optional)"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
                placeholder="UT-205"
              />

              <AnimatedInput
                label="Date of Incident"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Complaint Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-primary
                           transition-all duration-200 hover:border-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <AnimatedInput
              label="Complaint Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of the issue"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
                className="w-full px-4 py-3 border border-slate rounded-xl resize-none
                           focus:outline-none focus:ring-2 focus:ring-primary
                           transition-all duration-200 hover:border-primary"
                placeholder="Describe what happened, including location and time..."
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                🔒 Your complaint is confidential and reviewed only by authorized transport staff.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-yellow-400
                         text-dark font-bold px-6 py-4 rounded-xl
                         hover:scale-[1.02] active:scale-[0.97]
                         transition-transform duration-200 shadow-md hover:shadow-lg"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <StatCard title="24/7" subtitle="Support Available" />
          <StatCard title="48h" subtitle="Response Time" />
          <StatCard title="100%" subtitle="Confidential" />
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

function StatCard({ title, subtitle }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="text-3xl font-bold text-primary mb-2">
        {title}
      </div>
      <p className="text-gray-600 font-semibold">{subtitle}</p>
    </div>
  )
}
