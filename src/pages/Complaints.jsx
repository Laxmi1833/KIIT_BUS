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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark mb-2">File a Complaint</h1>
        <p className="text-gray-600 mb-8">Help us improve by reporting issues you've experienced</p>

        <div className="bg-white rounded-xl shadow-md p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-green-900">Complaint submitted successfully!</p>
                <p className="text-sm text-green-700">Reference ID: #COMP-2024-{Math.floor(Math.random() * 10000)}</p>
                <p className="text-sm text-green-700">We'll review your complaint and take action within 48 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@university.edu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Bus Number (if applicable)</label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., UT-205"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Date of Incident</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Complaint Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief summary of your complaint"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Please provide detailed information about what happened, including time, location, and any other relevant details..."
              ></textarea>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Your complaint will be reviewed by our management team. We take all feedback seriously and will take appropriate action. You will receive updates via email.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-dark font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-gray-600 font-semibold">Support Available</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">48h</div>
            <p className="text-gray-600 font-semibold">Response Time</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-gray-600 font-semibold">Confidential</p>
          </div>
        </div>
      </div>
    </div>
  )
}
