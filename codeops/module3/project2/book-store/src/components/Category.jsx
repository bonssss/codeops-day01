function Category({ selectedCategory, onCategoryChange }) {
        const categories = [
                { value: 'all', label: 'All' },
                { value: 'fiction', label: 'Fiction' },
                { value: 'history', label: 'History' },
                { value: 'science', label: 'Science' },
        ]

  return (
        <div className='flex flex-wrap justify-center gap-3 p-4'>
            {categories.map(category => (
                <button
                    key={category.value}
                    type='button'
                    onClick={() => onCategoryChange(category.value)}
                    className={`rounded px-4 py-2 font-semibold transition-colors ${
                        selectedCategory === category.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {category.label}
                </button>
            ))}
    </div>
  )
}

export default Category

 
