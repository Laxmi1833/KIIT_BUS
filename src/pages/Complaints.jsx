import { useState } from 'react'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

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
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        busNumber: '',
        date: '',
        title: '',
        description: '',
        category: '',
      })

      setTimeout(() => setSubmitted(false), 4000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-12 px-4 md:px-8 pb-24 transition-colors">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-secondary dark:text-gray-100 mb-2 tracking-tight">File a Complaint</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">We take your feedback seriously. Let us know what happened.</p>
        </div>

        {submitted ? (
          <Card className="text-center py-12 !border-l-4 !border-l-emerald-500 shadow-card glass-card animate-scale-in">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-secondary dark:text-gray-100 mb-2">Complaint Submitted</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto font-medium leading-relaxed">
              Your reference ID is <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded">#CMP-{Math.floor(Math.random() * 10000)}</span>.
              We will review your report and update you within 48 hours.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">File Another Report</Button>
          </Card>
        ) : (
          <Card className="!p-8 border-0 shadow-card glass-card animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@kiit.ac.in"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Bus Number (Optional)"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleChange}
                  placeholder="e.g. UT-205"
                />
                <Input
                  label="Date of Incident"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-secondary dark:text-gray-200 mb-2">Category</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all text-secondary dark:text-gray-100 font-medium appearance-none shadow-sm"
                  >
                    <option value="" disabled className="text-slate-400">Select a category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <Input
                label="Subject"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief summary of the issue"
                required
              />

              <div>
                <label className="block text-sm font-bold text-secondary dark:text-gray-200 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all text-secondary dark:text-gray-100 font-medium resize-none placeholder:text-slate-400 shadow-sm"
                  placeholder="Please describe the incident in detail..."
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 p-4 rounded-xl flex gap-3 text-sm font-medium border border-blue-100 dark:border-blue-500/20">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <p>Your report is confidential. False reporting may lead to disciplinary action.</p>
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-base font-bold mt-2" isLoading={loading}>
                Submit Complaint
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
