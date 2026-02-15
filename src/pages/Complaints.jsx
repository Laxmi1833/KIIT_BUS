import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Send, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    category: 'Bus Delay',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md border border-slate-100"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Complaint Registered</h2>
          <p className="text-slate-500 mb-8">
            Your Ticket ID #89283 has been created. We will get back to you shortly.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Submit Another
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">File a Complaint</h1>
          <p className="text-slate-500 mt-2">Report issues regarding bus services, staff, or facilities.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
        >
          <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 rounded-lg text-amber-800 border border-amber-100">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Please provide accurate details to help us resolve details faster.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Roll Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                  placeholder="2105..."
                  value={formData.roll}
                  onChange={e => setFormData({ ...formData, roll: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Issue Category</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all bg-white"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Bus Delay</option>
                <option>Staff Misbehavior</option>
                <option>Rash Driving</option>
                <option>Maintenance Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows="4"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Describe the incident in detail..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <Button type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800">
              <Send className="w-4 h-4 mr-2" />
              Submit Complaint
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
