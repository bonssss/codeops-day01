function Category({ selectedCategory, onCategoryChange, availableCategories = [] }) {
        const categories = [
                { value: 'all', label: 'All' },
                ...availableCategories.map(cat => ({ 
                        value: cat, 
                        label: cat.charAt(0).toUpperCase() + cat.slice(1)
                }))
        ]

  return (
        <div className='flex flex-wrap justify-center gap-3 p-4 bg-white rounded-lg shadow-md mb-6'>
            {categories.map(category => (
                <button
                    key={category.value}
                    type='button'
                    onClick={() => onCategoryChange(category.value)}
                    className={`rounded-full px-6 py-2 font-semibold transition-all duration-200 transform hover:scale-105 ${
                        selectedCategory === category.value
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                    }`}
                >
                    {category.label}
                </button>
            ))}
    </div>
  )
}

export default Category

 
