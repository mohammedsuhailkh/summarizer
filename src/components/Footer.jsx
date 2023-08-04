import React from 'react'

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();




  return (
    <div className='text-sm justify-center text-center text-gray-700 '>
      <a className='text-gray-700 font-thin ' href="https://bit.ly/mohammedsuhailkh">&copy; {currentYear} mohammedsuhailkh</a>
    </div>
  )
}

export default Footer
