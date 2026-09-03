function Header() {
  return (
    <div className='flex justify-center items-center h-20 bg-gray-800 text-white'>
        <nav className='flex justify-between items-center w-3/4'>
            <h1>Book Store</h1>
      <ul className='flex justify-between gap-4'>
        <li>Home</li>
        <li>Rent</li>
        <li>Buy</li>
      </ul></nav>

      
    </div>
  )
}

export default Header
