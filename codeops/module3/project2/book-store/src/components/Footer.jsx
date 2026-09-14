import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span className="text-xl font-black text-white">BookVerse</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your favorite community book rental library. Rent physical books, learn faster, and return when you're done.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Book Catalog</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Borrow a Book</Link></li>
              <li><Link to="/my-rentals" className="hover:text-white transition-colors">My Rentals</Link></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Addis Ababa Branch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bole Sub-City, Next to Edna Mall<br />
              Addis Ababa, Ethiopia<br />
              Mon - Sat: 8:30 AM – 7:30 PM
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tel: +251 938 756 685<br />
              Email: support@bookverse.et
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} BookVerse Ethiopia. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Rental</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Library FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
