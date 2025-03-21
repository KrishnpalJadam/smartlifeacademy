import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../../Config';

const Checkout = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // API se aane wale data ke liye state

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/${id}`);
                setData(response.data.data); // API ke response me 'data' key ke andar actual user data hai
            } catch (error) {
                console.error("Error fetching discount:", error);
            }
        };
        fetchPlans();
    }, [id]);

    if (!data) return <p>Loading...</p>; // Jab tak data nahi aata tab tak loading show karein

    return (
        <div className="min-h-screen flex flex-col container">
            <nav className="mt-5">
                <Link to="/hero" className="d-flex align-items-center mb-4 text-decoration-none text-white">
                    <i className="fa-solid fa-chevron-left me-2" /> Back to Home
                </Link>
            </nav>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-lg font-semibold mb-4">Selected Plan</h2>
                                <div className="border rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold">{data.plan_name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Includes 30 Days 30 Books Challenge
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">${data.original_price}</p>
                                            <p className="text-sm text-gray-500">{data.plan_name}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-blue-700">
                                            <i className="fas fa-gift mr-2"></i>
                                            Complete the 30 Days Challenge and get 11 months free!
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="font-semibold mb-4">Payment Method</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 mb-4">
                                            <button className="flex-1 border border-custom bg-custom/5 text-custom px-4 py-2 !rounded-button">
                                                <i className="far fa-credit-card mr-2"></i>Card
                                            </button>
                                            <button className="flex-1 border px-4 py-2 !rounded-button hover:border-gray-400">
                                                <i className="fab fa-paypal mr-2"></i>PayPal
                                            </button>
                                            <button className="flex-1 border px-4 py-2 !rounded-button hover:border-gray-400">
                                                <i className="fas fa-university mr-2"></i>Bank
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subscription Price</span>
                                        <span>${data.original_price}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>${data.discount_applied}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${parseFloat(data.original_price) - parseFloat(data.discount_applied)}</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center mb-4">
                                        <input type="checkbox" id="terms" className="rounded border-gray-300 text-custom focus:ring-custom" />
                                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                            I agree to the Terms of Service and Privacy Policy
                                        </label>
                                    </div>
                                    <button className="w-full bg-custom text-white py-3 !rounded-button hover:bg-custom/90" style={{ backgroundColor: "black" }}>
                                        Secure Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;










