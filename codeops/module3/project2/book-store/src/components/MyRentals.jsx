import { useBooks } from './BookContext'
import { Link } from 'react-router-dom'

function MyRentals() {
  const { rentals, returnBook } = useBooks()

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">📦 My Active Rentals</h1>
            <p className="text-slate-600 mt-1">Manage your borrowed books, track return deadlines, and return items.</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-xs transition-all"
          >
            <span>+ Borrow More Books</span>
          </Link>
        </div>

        {rentals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📚
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Rentals</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm">
              You do not have any books currently borrowed. Browse our collection and rent your next read!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-2.5 bg-black hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-xs transition-all"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rentals.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col sm:flex-row gap-5"
              >
                <div className="w-full sm:w-32 h-44 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.bookTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-md">
                        {item.id}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.bookTitle}</h3>
                    <p className="text-xs text-slate-500 mb-3">By {item.author}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                      <div>
                        <span className="text-slate-400 block">Renter</span>
                        <span className="font-semibold text-slate-800">{item.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Contact</span>
                        <span className="font-semibold text-slate-800">{item.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Borrowed On</span>
                        <span className="font-medium text-slate-700">{item.rentalDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Return Due</span>
                        <span className="font-bold text-slate-900">{item.returnDueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400">Total Paid</span>
                      <p className="text-sm font-bold text-slate-900">
                        ${item.totalPrice} <span className="text-xs font-normal text-slate-500">({item.rentalPeriod} days)</span>
                      </p>
                    </div>

                    <button
                      onClick={() => returnBook(item.id)}
                      className="px-4 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 hover:border-rose-200 text-xs font-semibold rounded-lg border border-slate-200 transition-all active:scale-95"
                    >
                      ↩ Return Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRentals
