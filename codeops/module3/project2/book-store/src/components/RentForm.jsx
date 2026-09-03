import React from 'react'
import { books as defaultBooks } from '../../data/books'
import { isValidEthiopianPhone, validateRentalForm } from '../services/validation'


function RentForm({ books = defaultBooks, onRent }) {
    const[submitting, setSubmitting] = React.useState(false)
    const [formData, setFormData] = React.useState({
        bookId: '',
        fullName: '',
        phone: '',
        rentalPeriod: ''
    });
    const [error, setError] = React.useState('')
    const phoneValid = isValidEthiopianPhone(formData.phone)

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError('')
    }

    function handleSubmit(event) {
        event.preventDefault()
        const validationError = validateRentalForm(formData, books)
        if (validationError) {
            setError(validationError)
            return
        }

        setSubmitting(true)
        const book = books.find(item => item.id === Number(formData.bookId))
        const bookId = formData.bookId
        const rentalPeriod = formData.rentalPeriod
        const fullName = formData.fullName
        const phone = formData.phone
        console.log(`Renting book with ID: ${bookId} for ${rentalPeriod} days`)
        console.log(`Renter: ${fullName}, Phone: ${phone}`)
        onRent(book.id)

        setTimeout(()=>{
                    setFormData({
                        bookId: '',
                        fullName: '',
                        phone: '',
                        rentalPeriod: ''
                    })
                    setSubmitting(false)


        }, 2000)
    }

    
  return (
    <div className='flex justify-center items-center bg-gray-100 '>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow w-96'>
            <h3 className='text-lg font-bold mb-4'>Rent a Book</h3>
            <div className='mb-4'>
                <label htmlFor='bookId' className='block text-sm font-medium text-gray-700'>
                    Book ID
                </label>
                <input
                    type='text'
                    id='bookId'
                    name='bookId'
                    value={formData.bookId}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
            </div>
             <div className='mb-4'>
                <label htmlFor='fullName' className='block text-sm font-medium text-gray-700'>
                    Full Name
                </label>
                <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
            </div>
             <div className='mb-4'>
                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                    Phone Number
                </label>
                <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
                {!phoneValid && formData.phone.length > 0 && (
                    <p className='text-red-500 text-sm mt-1'>Please enter a valid Ethiopian phone number.</p>
                )}
            </div>

            <div className='mb-4'>
                <label htmlFor='rentalPeriod' className='block text-sm font-medium text-gray-700'>
                    Rental Period (days)
                </label>
                <input
                    type='number'
                    id='rentalPeriod'
                    name='rentalPeriod'
                    value={formData.rentalPeriod}
                    onChange={handleChange}
                    required
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
            </div>
            <button
                type='submit'
                className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                disabled={submitting || !phoneValid}>
               {submitting ? 'Submitting...' : 'Rent Book'}
            </button>
                        {error && <p className='mt-3 text-sm text-red-600'>{error}</p>}
           
        </form>
    </div>
  )
}

export default RentForm
