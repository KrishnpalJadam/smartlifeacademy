 import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Library from './Library';
import Chatbot from './Chatbot';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedDashboard');
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    }
  }, []);
  const user_data = JSON.parse(localStorage.getItem("userdata"));
  return (
    <div>
      <Sidebar />
      <Library />

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
          <h2 className='text-2xl'>👋 Welcome {user_data.firstname} {user_data.lastname}</h2>
             <p>Glad to see you </p>
            <div> Plan : {user_data.plan_name}</div>
            <div> Remaining Days : {user_data?.remaining_days}</div>

            <button style={styles.button} onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#fcd34d',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer'
  }
};

export default Dashboard;
