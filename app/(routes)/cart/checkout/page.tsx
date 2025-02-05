import CheckOutForm from '@/components/components/checkOutForm'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div><Suspense><CheckOutForm/></Suspense></div>
  )
}

export default page