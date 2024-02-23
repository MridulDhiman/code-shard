import React from 'react'

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick}  className="bg-[#47cf73] hover:bg-[#248C46] text-sm  text-black px-2 py-2 rounded-md flex items-center justify-center gap-2" >{children}</button>
  )
}

export default Button