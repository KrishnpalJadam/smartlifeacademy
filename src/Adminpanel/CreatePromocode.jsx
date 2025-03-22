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
        setMessage('');

        setTimeout(() => {
            axios.post(`${BASE_URL}/createpromocode`, { admin_id: 1, promocode: code })
                .then(res => {
                    setMessage(`✅ ${res.data.message} (ID: ${res.data.promocode_id})`);
                })
                .catch(err => {
                    setMessage(`❌ Error: ${err.response?.data?.error || 'Something went wrong'}`);
                });
        }, 2000);
    };

    return (
        <div className='promo-container'>
            <nav className="promo-nav">
                <Link to="/Dashboard" className="promo-back-link">
                    <i className="fa-solid fa-chevron-left" /> Back to Dashboard
                </Link>
            </nav>
            <div className='p-4 rounded-4' style={{ border: "1px solid goldenrod" }}>
                <div className="promo-input-group">
                    <label htmlFor="promocode" className="promo-label">Promocode</label>
                    <input
                        type="text"
                        className="promo-input"
                        id="promocode"
                        value={promocode}
                        readOnly
                    />
                </div>

                <button className="promo-btn" onClick={generatePromocode}>
                    Generate Promocode
                </button>
            </div>


            {message && (
                <div className="promo-alert">
                    {message}
                </div>
            )}
        </div>
    );
};

export default CreatePromocode;