import React from 'react'
import "./VendorList.scss"
import List from "../../../components/List/List"
const VendorList = () => {
    const headers=["Name","Username","Email","Mobile No","Address"];
    const rows = [
        ["Bhatbhateni","bhatbhateni","bhatbhateni@gmail.com","9804567342","Tinkune, Kathmandu"],
        ["Bigmart","bigmart","bigmart@gmail.com","9804567342","Tinkune, Kathmandu"],
    ]
  return (
    <div className='vendorListContainer'>
        <List
             title="Vendors"
             createButtonLabel='Create Vendor'
             headers={headers}
             rows={rows}
             link="create"
             showEyeViewIcon = {true}
             showFilterIcon = {true}
        />
    </div>
  )
}

export default VendorList