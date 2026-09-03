import React from 'react'


function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <div>
        <p className='bg-gray-800 text-white text-center p-4'>&copy; {currentYear} My App. All rights reserved.</p>
      
    </div>
  )
}

export default Footer
