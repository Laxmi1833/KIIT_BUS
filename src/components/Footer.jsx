export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} <span className="text-amber-500 font-semibold">KiitBus</span>. Official Transport Management System.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
