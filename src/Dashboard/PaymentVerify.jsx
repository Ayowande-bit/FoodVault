import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function PaymentVerify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your payment...');
    const [user, setUser] = useState(null);
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/log');
            return;
        }

        setUser(user);
        setUserFetched(true);
    }, [])



    const reference = searchParams.get('reference');

    if (!reference) {
        setStatus('error');
        setMessage('No payment reference found.');
        return;
    }

    const verifyPayment = async () => {

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/v1/payments/verify?reference=${reference}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.tokens.accessToken}`
                }
            });
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage('Payment verified successfully!');
                setTimeout(() => {
                    navigate('/user');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Payment verification failed.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setStatus('error');
            setMessage('An error occurred while verifying payment.');
        }
    };



    useEffect(() => {
        if (user && userFetched) {
            verifyPayment();
        }
    }, [userFetched])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                <div className="flex justify-center mb-6">
                    {status === 'verifying' && <Loader className="animate-spin text-emerald-500" size={48} />}
                    {status === 'success' && <CheckCircle className="text-emerald-500" size={48} />}
                    {status === 'error' && <XCircle className="text-red-500" size={48} />}
                </div>

                <h2 className="text-xl font-bold text-slate-100 mb-2">
                    {status === 'verifying' && 'Processing Payment'}
                    {status === 'success' && 'Payment Successful'}
                    {status === 'error' && 'Payment Failed'}
                </h2>

                <p className="text-slate-400 mb-6">
                    {message}
                </p>

                {status !== 'verifying' && (
                    <button
                        onClick={() => navigate('/user')}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${status === 'success'
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                            }`}
                    >
                        Return to Dashboard
                    </button>
                )}
            </div>
        </div>
    );
}
