import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooks } from './BookContext'
import Category from './Category'

function Book() {
  const { books, loading, error } = useBooks()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  // Extract available unique categories from actual book inventory
  const availableCategories = useMemo(() => {
    return [...new Set(books.map(b => b.category))]
  }, [books])

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesCategory = selectedCategory === 'all' || book.category.toLowerCase() === selectedCategory.toLowerCase()
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesAvailability = !onlyAvailable || book.isAvailable

        return matchesCategory && matchesSearch && matchesAvailability
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
        if (sortBy === 'title') return a.title.localeCompare(b.title)
        return 0
      })
  }, [books, selectedCategory, searchQuery, sortBy, onlyAvailable])

  const availableCount = books.filter(b => b.isAvailable).length

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
            Addis Ababa's Book Rental Platform
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Discover, Read & Rent Books Easily
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Access hundreds of bestsellers, tech handbooks, and timeless classics for a fraction of the retail cost.
          </p>

          {/* Quick Search in Hero */}
          <div className="pt-4 max-w-xl mx-auto flex items-center bg-white rounded-2xl p-2 shadow-lg border border-slate-700/50">
            <span className="pl-3 text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="pr-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto text-center text-xs text-slate-300">
            <div className="border-r border-slate-800">
              <span className="block text-lg font-extrabold text-white">{books.length}</span>
              <span>Total Titles</span>
            </div>
            <div className="border-r border-slate-800">
              <span className="block text-lg font-extrabold text-emerald-400">{availableCount}</span>
              <span>Available Now</span>
            </div>
            <div>
              <span className="block text-lg font-extrabold text-white">From $3.50/d</span>
              <span>Flexible Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category filter pills */}
        <Category
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availableCategories={availableCategories}
        />

        {/* Filter / Sort Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 text-black rounded border-slate-300 focus:ring-black accent-black"
              />
              <span>In-stock only</span>
            </label>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              Showing <strong className="text-slate-800">{filteredBooks.length}</strong> books
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Live Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="text-slate-800 font-bold text-base">Loading books from API...</p>
            <p className="text-slate-500 text-xs mt-1">Connecting to live catalog</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Books Matched Your Filters</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search query or reset your category selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
                setOnlyAvailable(false)
              }}
              className="px-5 py-2.5 bg-black text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Book Cover Image with Status Overlay */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black/80 backdrop-blur-xs text-white shadow-xs">
                      {book.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {book.isAvailable ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        Available
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-600 text-white shadow-xs">
                        Rented Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Pages */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        ★ {book.rating || '4.8'}
                      </span>
                      <span>📖 {book.pages} pages</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-black transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">By {book.author}</p>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Price and Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Daily Rate
                      </span>
                      <span className="text-base font-extrabold text-slate-900">
                        ${book.price} <span className="text-xs font-normal text-slate-500">/day</span>
                      </span>
                    </div>

                    {book.isAvailable ? (
                      <button
                        onClick={() => navigate(`/rent?bookId=${book.id}`)}
                        className="px-4 py-2 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
                      >
                        Rent Now →
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-2 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    )}
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

export default Book
