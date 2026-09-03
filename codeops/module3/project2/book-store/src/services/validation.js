export function isValidEthiopianPhone(phone) {
  return /^(?:\+251|0)9\d{8}$/.test(phone)
}

export function validateRentalForm(formData, books) {
  if (!formData.bookId || !books.some(book => book.id === Number(formData.bookId))) {
    return 'That book ID does not exist.'
  }

  const book = books.find(item => item.id === Number(formData.bookId))
  if (!book.isAvailable) {
    return 'That book is sold out.'
  }

  if (!formData.fullName.trim()) {
    return 'Please enter your full name.'
  }

  if (!isValidEthiopianPhone(formData.phone)) {
    return 'Please enter a valid Ethiopian phone number.'
  }

  if (!Number.isInteger(Number(formData.rentalPeriod)) || Number(formData.rentalPeriod) < 1) {
    return 'Rental period must be at least 1 day.'
  }

  return ''
}
