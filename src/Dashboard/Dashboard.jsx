import React from 'react'
import Sidebar from './Sidebar'
import Library from './Library'
import Chatbot from './Chatbot'

function Dashboard() {
  return (
    <div>
      <Sidebar/>
      <Library/>
      {/* <Chatbot/> */}
    </div>
  )
}

export default Dashboard
