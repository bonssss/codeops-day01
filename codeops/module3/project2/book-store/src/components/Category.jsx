function Category({ selectedCategory, onCategoryChange, availableCategories = [] }) {
  const categories = [
    { value: 'all', label: 'All Categories', icon: '✨' },
    ...availableCategories.map(cat => ({
      value: cat,
      label: cat,
      icon: cat === 'Self-Help' ? '🌱' : cat === 'Technology' ? '💻' : cat === 'History' ? '🏛️' : cat === 'Finance' ? '📈' : cat === 'Sci-Fi' ? '🚀' : '📖'
    }))
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar mb-6">
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.value.toLowerCase()
        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              isSelected
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80 shadow-xs'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Category
