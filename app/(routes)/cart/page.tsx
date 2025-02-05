
import CartPage from '@/components/components/cartPage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div><Suspense><CartPage/></Suspense></div>
  )
}

export default page