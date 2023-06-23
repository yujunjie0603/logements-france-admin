import Layout from '@/components/layout'
import Link from 'next/link'
import React from 'react'

function products() {
  return (
    <Layout>

      <Link className="bg-blue-700 text-white py-1 px-1 rounded-md" href={'/products/new'}>
        New product
      </Link>
    </Layout>
  )
}

export default products