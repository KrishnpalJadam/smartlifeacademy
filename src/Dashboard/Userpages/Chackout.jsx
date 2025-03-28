// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import BASE_URL from '../../Config';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-bootstrap';
// const Checkout = () => {
//     const { id } = useParams();
//     const [data, setData] = useState(null); // API se aane wale data ke liye state

//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/user/${id}`);
//                 setData(response.data.data); // API ke response me 'data' key ke andar actual user data hai
//                 const applypromo = await axios.post(`${BASE_URL}/promocodeDiscount`)
//                 console.log("promo", applypromo)
//             } catch (error) {
//                 console.error("Error fetching discount:", error);
//             }
//         };
//         fetchPlans();
//     }, [id]);

//     if (!data) return <p>Loading...</p>; // Jab tak data nahi aata tab tak loading show karein


//     const setchallenge = async () => {
//         try {
//             const response = await axios.post(`${BASE_URL}/startChallenge`, { user_id: "90"});

//                if(response.data.message){
//                 alert(response.data.message);
//                }

//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         }
//     };


//     return (
//         <>
//      <ToastContainer/>
//         <div className="min-h-screen flex flex-col container">
//             <nav className="mt-5">
//                 <Link to="/hero" className="d-flex align-items-center mb-4 text-decoration-none text-white">
//                     <i className="fa-solid fa-chevron-left me-2" /> Back to Home
//                 </Link>
//             </nav>

//             <main className="flex-grow">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         <div className="lg:col-span-2">
//                             <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                                 <h2 className="text-lg font-semibold mb-4">Selected Plan</h2>
//                                 <div className="border rounded-lg p-4 mb-4">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <h3 className="font-semibold">{data.plan_name}</h3>
//                                             <p className="text-sm text-gray-500 mt-1">
//                                                 Includes 30 Days 30 Books Challenge
//                                             </p>
//                                         </div>
//                                         <div className="text-right">
//                                             <p className="text-lg font-semibold">₺{data.original_price}</p>
//                                             <p className="text-sm text-gray-500">{data.plan_name}</p>
//                                         </div>
//                                     </div>
//                                     <div className="mt-4 bg-blue-50 p-3 rounded-lg">
//                                         <p className="text-sm text-blue-700">
//                                             <i className="fas fa-gift mr-2"></i>
//                                             Complete the 30 Days Challenge and get 11 months free!
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="border-t pt-6">
//                                     <h3 className="font-semibold mb-4">Payment Method</h3>
//                                     <div className="space-y-4">
//                                         <div className="flex gap-4 mb-4">
//                                             <button className="flex-1 border border-custom bg-custom/5 text-custom px-4 py-2 !rounded-button">
//                                                 <i className="far fa-credit-card mr-2"></i>Card
//                                             </button>
//                                             <button className="flex-1 border px-4 py-2 !rounded-button hover:border-gray-400">
//                                                 <i className="fab fa-paypal mr-2"></i>PayPal
//                                             </button>
//                                             <button className="flex-1 border px-4 py-2 !rounded-button hover:border-gray-400">
//                                                 <i className="fas fa-university mr-2"></i>Bank
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="lg:col-span-1">
//                             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//                                 <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Subscription Price</span>
//                                         <span>₺{data.original_price}</span>
//                                     </div>
//                                      {/* Promo Code Input Field */}
//                                      <div className="mb-4">
//                                         <input
//                                             type="text"
//                                             placeholder="Enter Promo Code"
//                                             // value={promoCode}
//                                             // onChange={(e) => setPromoCode(e.target.value)}
//                                             className="w-full p-2 border rounded"
//                                         />
//                                         <button 
//                                             // onClick={applyPromoCode} 
//                                             className="w-full bg-blue-600 text-white p-2 mt-2 rounded" onClick={applyPromocode}>
//                                             Apply Promo Code
//                                         </button>
//                                     </div>
//                                     <div className="flex justify-between text-green-600">
//                                         <span>Discount</span>
//                                         <span>₺{data.discount_applied}</span>
//                                     </div>
//                                     <div className="border-t pt-3 flex justify-between font-semibold">
//                                         <span>Total</span>
//                                         <span>₺{parseFloat(data.original_price) - parseFloat(data.discount_applied)}</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6">
//                                     <div className="flex items-center mb-4">
//                                         <input type="checkbox" id="terms" className="rounded border-gray-300 text-custom focus:ring-custom" />
//                                         <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//                                             I agree to the Terms of Service and Privacy Policy
//                                         </label>
//                                     </div>
//                                     <Link to="/login" className="w-full bg-custom text-white p-4 py-3 !rounded-button hover:bg-custom/90" style={{ backgroundColor: "black" }}>
//                                         Secure Payment
//                                     </Link>
//                                 </div>
//                                 <div className="mt-6">
//                                     <div className="flex items-center mb-4">

//                                     </div>
//                                     <Link to="" onClick={setchallenge}  className="w-full bg-custom text-white p-4 py-3 !rounded-button hover:bg-custom/90" style={{ backgroundColor: "black" }}>
//                                         Start 30 Day Challenge
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//         </>
//     );
// };

// export default Checkout;













import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../../Config';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

const Checkout = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [promoCode, setPromoCode] = useState(""); // State for promo code
    const [discount, setDiscount] = useState(0); // Store applied discount
    const [discountApplied, setDiscountApplied] = useState(0);
    const [newAmount, setNewAmount] = useState(data?.original_price || 0);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/${id}`);
                setData(response.data.data);
                setNewAmount(response.data.data.original_price); // Set default price
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPlans();
    }, [id]);
    

    if (!data) return <p>Loading...</p>;

    const applyPromocode = async () => {
        if (!promoCode) {
            toast.error("Please enter a promo code!");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/promocodeDiscount`, {
                user_id: id,
                promocode: promoCode
            });

            if (response.data.data) {
                const { discount_applied, new_amount } = response.data.data;
                toast.success("Promo code applied successfully!");

                setDiscountApplied(discount_applied);
                setNewAmount(new_amount);
            } else {
                toast.error(response.data.message || "Invalid promo code.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <>
            <ToastContainer />
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
                                                <p className="text-lg font-semibold">₺{data.original_price}</p>
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
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subscription Price</span>
                                            <span>₺{data.original_price}</span>
                                        </div>

                                        {/* Promo Code Input Field */}
                                        {/* <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Enter Promo Code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                            <button
                                                className="w-full bg-blue-600 text-white p-2 mt-2 rounded"
                                                onClick={applyPromocode}>
                                                Apply Promo Code
                                            </button>
                                        </div> */}

<div className="flex justify-between text-green-600">
    <span>Discount</span>
    <span>{data.discount_percent}%</span> {/* Discount percentage show kar raha hai */}
</div>
<div className="border-t pt-3 flex justify-between font-semibold">
    <span>Total</span>
    <span>₺{data.final_price}</span> {/* Final price show kar raha hai */}
</div>



                                    </div>
                                    <div className="mt-6">
                                        <Link to="/login" className="w-full bg-custom text-white p-4 py-3 rounded-button hover:bg-custom/90" style={{ backgroundColor: "black" }}>
                                            Secure Payment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Checkout;
