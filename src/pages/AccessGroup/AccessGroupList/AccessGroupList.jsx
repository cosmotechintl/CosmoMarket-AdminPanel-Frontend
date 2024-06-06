import React from 'react'
import "./AccessGroupList.scss"
import List from '../../../components/List/List'
const AccessGroupList = () => {
  const headers=["Name","Desc","Type"];
  const rows = [
    ["V1","This is vendor group","Vendor"],
    ["A1Pro","This is admin group","Admin"],
  ]
  return (
    <div className='accessGroupContainer'>
        <div className="accessGroupContents">
            <List 
              title="Access Groups" 
              createButtonLabel="Create Access Group"
              headers={headers}
              rows={rows}
              link="create"
              showEyeViewIcon = {false}
              showFilterIcon = {false}
            />
        </div>
    </div>
  )
}

export default AccessGroupList