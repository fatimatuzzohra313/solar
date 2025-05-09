import TableView from '@/components/inventory/TableView'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

function page() {
  return (
    <div>
      <DefaultLayout>
        <TableView/>
      </DefaultLayout>
    </div>
  )
}

export default page
