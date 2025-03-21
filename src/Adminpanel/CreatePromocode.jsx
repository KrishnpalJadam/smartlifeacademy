import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../Config';

const CreatePromocode = () => {
    const [promocode, setPromocode] = useState('');
    const [message, setMessage] = useState('');

    const generatePromocode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPromocode(code);
        setMessage(''); // Clear previous messages

        // 2 second delay before API call
        setTimeout(() => {
            axios.post(`${BASE_URL}/createpromocode`, { admin_id: 1, promocode: code }) // ✅ Corrected payload
                .then(res => {
                    setMessage(`✅ ${res.data.message} (ID: ${res.data.promocode_id})`);
                })
                .catch(err => {
                    setMessage(`❌ Error: ${err.response?.data?.error || 'Something went wrong'}`);
                });
        }, 2000);
    };

    return (
        <div className='container mt-4'>
            <nav className="flex items-center justify-between mb-4">
                <Link to="/Dashboard" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                    <i className="fa-solid fa-chevron-left me-2" /> Back to Dashboard
                </Link>
            </nav>

            <div className="mb-3">
                <label htmlFor="promocode" className="form-label fw-bold" style={{ color: "goldenrod" }}>Promocode</label>
                <input
                    style={{ width: "300px" }}
                    type="text"
                    className="form-control"
                    id="promocode"
                    value={promocode}
                    readOnly
                />
            </div>

            <button className="btn btn-primary" onClick={generatePromocode}>
                Generate Promocode
            </button>

            {message && (
                <div className="mt-3 alert alert-info" style={{ width: '300px' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default CreatePromocode;
