const Books =[
  { id: 1, title: 'Book 1', author: 'Author 1', description: 'This is a great book about React.', price: 19.99, currency: 'USD',isAvailable:true },
  { id: 2, title: 'Book 2', author: 'Author 2', description: 'This is another great book.', price: 24.99, currency: 'USD',isAvailable:false },
  { id: 3, title: 'Book 3', author: 'Author 3', description: 'Yet another excellent book.', price: 29.99, currency: 'USD',isAvailable:true }

]

function Book() {
  if(Books.length === 0) {
    return <p>Book is not available</p>
  }
  return (
    <div >
      <h2 className='m-4 text-center font-bold text-2xl'>Our Books</h2>
      <ul className='flex flex-wrap justify-center gap-4 p-4' >
        {Books.map(book => (
          <li key={book.id} className='w-64 rounded bg-white p-4 shadow cursor-pointer transition-transform duration-300 hover:scale-105'>
            <h3 className='mb-2 text-lg font-bold'>{book.title}</h3>
            <p className='mb-1'>Author: {book.author}</p>
            <p className='mb-2'>{book.description}</p>
            <p className='font-semibold'>Price: {book.price} {book.currency}</p>
          </li>
        ))}


        {/* <li className='bg-white p-4 rounded shadow cursor-pointer hover:scale-105 transition-transform duration-300'>
          <h3>{title}</h3>
          <p>Author: {author}</p>
          <p>Description: {description}</p>
          <p>Price: {price} {currency}</p>
        </li> */}
        
      </ul>
    </div>
  )
}

export default Book
