import React from 'react'
import { Link } from 'react-router-dom'

const CategoryOption = () => {
  return (
    <div>
       <div className="flex ml-20 justify-center items-center  mr-20 gap-10">
  <Link className="bg-gray-200 flex flex-col items-center" to={`/category/103`}>
    <img src="/samba.avif" />
    <p className="text-center">Sneakers</p>
  </Link>

  <Link className="bg-gray-200 flex flex-col items-center" to={`/category/56`}>
    <img src="/samba.avif" />
    <p className="text-center">Sneakers</p>
  </Link>

  <Link className="bg-gray-200 flex flex-col items-center" to={`/category/202`}>
    <img src="/samba.avif" className='object-center' />
    <p className="text-center">Sneakers</p>
  </Link>

  <Link className="bg-gray-200 flex flex-col items-center" to={`/category/56`}>
    <img src="/samba.avif" />
    <p className="text-center">Sneakers</p>
  </Link>
</div>


    </div>
  )
}

export default CategoryOption