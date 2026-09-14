import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useBooks } from './BookContext'
import { isValidEthiopianPhone } from '../services/validation'

function RentForm() {
  const { books, rentBook } = useBooks()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const preselectedBookId = searchParams.get('bookId') || ''

  const [formData, setFormData] = useState({
    bookId: preselectedBookId,
    fullName: '',
    phone: '',
    rentalPeriod: '7',
    deliveryType: 'pickup',
    agreeTerms: true
  })

  const [touched, setTouched] = useState({})
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedRental, setCompletedRental] = useState(null)

  useEffect(() => {
    if (preselectedBookId) {
      setFormData(prev => ({ ...prev, bookId: preselectedBookId }))
    }
  }, [preselectedBookId])

  const selectedBook = books.find(b => b.id === Number(formData.bookId))
  const phoneValid = isValidEthiopianPhone(formData.phone)
  const days = Number(formData.rentalPeriod) || 1
  const dailyRate = selectedBook ? selectedBook.price : 0
  const subtotal = (dailyRate * days).toFixed(2)
  const deposit = selectedBook ? (dailyRate * 1.5).toFixed(2) : '0.00'
  const totalAmount = (Number(subtotal) + Number(deposit)).toFixed(2)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.bookId) {
      setError('Please select a book to rent.')
      return
    }

    if (!selectedBook) {
      setError('Selected book was not found.')
      return
    }

    if (!selectedBook.isAvailable) {
      setError('Sorry, this book is currently out of stock or rented by another reader.')
      return
    }

    if (!formData.fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!phoneValid) {
      setError('Please enter a valid Ethiopian phone number (e.g. 0912345678 or +251912345678).')
      return
    }

    if (days < 1 || days > 90) {
      setError('Rental period must be between 1 and 90 days.')
      return
    }

    setIsSubmitting(true)
    setError('')

    setTimeout(() => {
      const result = rentBook({
        bookId: formData.bookId,
        fullName: formData.fullName,
        phone: formData.phone,
        rentalPeriod: days,
        deliveryType: formData.deliveryType
      })

      setIsSubmitting(false)

      if (result.success) {
        setCompletedRental(result.rental)
      } else {
        setError(result.message || 'Failed to complete rental.')
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-black transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Rental Checkout</span>
        </div>

        {/* Modal / Success View */}
        {completedRental ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 text-2xl sm:text-3xl">
              ✓
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Rental Confirmed!</h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              Thank you, <span className="font-semibold text-slate-900">{completedRental.fullName}</span>! Your book rental order has been placed successfully.
            </p>

            <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200 text-left text-xs sm:text-sm space-y-2.5 mb-6 sm:mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-slate-900">{completedRental.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Book</span>
                <span className="font-semibold text-slate-900 line-clamp-1">{completedRental.bookTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rental Duration</span>
                <span className="font-medium text-slate-800">{completedRental.rentalPeriod} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Return Due Date</span>
                <span className="font-bold text-rose-600">{completedRental.returnDueDate}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-700">Total Rental Rate</span>
                <span className="text-slate-900">${completedRental.totalPrice} USD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/my-rentals"
                className="flex-1 py-3 px-4 bg-black hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all"
              >
                View in My Rentals
              </Link>
              <button
                onClick={() => {
                  setCompletedRental(null)
                  setFormData({
                    bookId: '',
                    fullName: '',
                    phone: '',
                    rentalPeriod: '7',
                    deliveryType: 'pickup',
                    agreeTerms: true
                  })
                }}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-all"
              >
                Rent Another Book
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Form Section */}
            <div className="lg:col-span-7 p-5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Borrow a Book</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Select your book, choose your rental term, and confirm your details.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
                  <span className="text-rose-500 font-bold">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Book Selector */}
                <div>
                  <label htmlFor="bookId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. Choose Book
                  </label>
                  <select
                    id="bookId"
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-black focus:ring-1 focus:ring-black transition-all outline-none"
                    required
                  >
                    <option value="">-- Select a book from our library --</option>
                    {books.map(b => (
                      <option key={b.id} value={b.id} disabled={!b.isAvailable}>
                        {b.title} — ${b.price}/day {!b.isAvailable ? '(Currently Out of Stock)' : '✓ In Stock'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Renter Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Bonsa Desalegn"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-black focus:ring-1 focus:ring-black transition-all outline-none"
                  />
                  {touched.fullName && !formData.fullName.trim() && (
                    <p className="text-xs text-rose-500 mt-1">Full name is required.</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    3. Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="0912345678 or +251912345678"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 focus:ring-1 transition-all outline-none ${
                      touched.phone && !phoneValid && formData.phone
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-black focus:ring-black'
                    }`}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Accepts Ethiopian mobile format (09... or +251 9...)
                  </p>
                  {touched.phone && formData.phone && !phoneValid && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">
                      ⚠️ Please enter a valid Ethiopian phone number (e.g. 0938756685).
                    </p>
                  )}
                </div>

                {/* Rental Period */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="rentalPeriod" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      4. Rental Period
                    </label>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {days} {days === 1 ? 'day' : 'days'}
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {[3, 7, 14, 30].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rentalPeriod: String(d) }))}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          Number(formData.rentalPeriod) === d
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>

                  <input
                    type="range"
                    id="rentalPeriod"
                    name="rentalPeriod"
                    min="1"
                    max="60"
                    value={formData.rentalPeriod}
                    onChange={handleChange}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                {/* Pickup / Delivery Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    5. Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.deliveryType === 'pickup' ? 'border-black bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={formData.deliveryType === 'pickup'}
                        onChange={handleChange}
                        className="accent-black"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-800 block">Library Pickup</span>
                        <span className="text-slate-500">Free at Campus Branch</span>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.deliveryType === 'delivery' ? 'border-black bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input
                        type="radio"
                        name="deliveryType"
                        value="delivery"
                        checked={formData.deliveryType === 'delivery'}
                        onChange={handleChange}
                        className="accent-black"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-800 block">Courier Delivery</span>
                        <span className="text-slate-500">Addis Ababa direct</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || (formData.phone && !phoneValid)}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-black hover:bg-slate-800 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Rental...</span>
                    </>
                  ) : (
                    <span>Confirm & Borrow Book (${subtotal} USD)</span>
                  )}
                </button>
              </form>
            </div>

            {/* Live Summary / Selected Book Sidebar */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Rental Summary
                </h3>

                {selectedBook ? (
                  <div>
                    <div className="flex gap-4 items-start mb-6">
                      <img
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm flex-shrink-0"
                      />
                      <div>
                        <span className="inline-block text-[11px] font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-md mb-1 border border-slate-700">
                          {selectedBook.category}
                        </span>
                        <h4 className="text-base font-bold text-white line-clamp-2">{selectedBook.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">By {selectedBook.author}</p>
                        <p className="text-xs font-mono text-emerald-400 mt-2 font-bold">
                          ${selectedBook.price} USD / day
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
                      <div className="flex justify-between text-slate-400">
                        <span>Daily Rate</span>
                        <span className="font-mono text-slate-200">${selectedBook.price} USD</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Duration</span>
                        <span className="font-medium text-slate-200">{days} Days</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Refundable Deposit</span>
                        <span className="font-mono text-slate-200">${deposit} USD</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Fulfillment</span>
                        <span className="font-medium capitalize text-slate-200">{formData.deliveryType}</span>
                      </div>

                      <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                        <span className="text-sm font-bold text-white">Estimated Total</span>
                        <div className="text-right">
                          <span className="text-xl font-extrabold text-white font-mono">${totalAmount}</span>
                          <span className="text-[10px] text-slate-400 block">Includes deposit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500">
                    <div className="text-3xl mb-2">📖</div>
                    <p className="text-xs">Select a book from the form to view pricing, cover, and rental details.</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <span>🛡️</span>
                <span>Verified by BookVerse Guarantee.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RentForm
