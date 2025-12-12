import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Search, ArrowLeft, Plus, Check, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://foodvault-36sx.onrender.com';

export default function Market() {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState({}); // { sentiment_id: quantity }
    const [user, setUser] = useState(null);
    const [savings, setSavings] = useState(0);

    // Load user and savings on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Calculate total savings from local plans
        const storedPlans = JSON.parse(localStorage.getItem('plans') || '[]');
        const total = storedPlans.reduce((acc, plan) => acc + (plan.currentAmount || 0), 0);
        setSavings(total);

        // Fetch foods
        fetch(`${API_BASE}/foods`)
            .then(res => res.json())
            .then(data => {
                // Assuming payload might be { foods: [...] } or just [...]
                // Adjust based on actual response structure if needed. 
                // Common pattern: data.data or data.foods
                const items = data.foods || data.data || (Array.isArray(data) ? data : []);
                setFoods(items);
            })
            .catch(err => console.error("Failed to load foods", err))
            .finally(() => setLoading(false));
    }, []);

    const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
        const item = foods.find(f => (f._id || f.id) === id);
        return acc + ((item?.price || 0) * qty);
    }, 0);

    const remainingBudget = savings - cartTotal;

    const handleAddToCart = (item) => {
        const id = item._id || item.id;
        if (cartTotal + (item.price || 0) > savings) {
            alert("You don't have enough savings for this item!");
            return;
        }

        setCart(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (item) => {
        const id = item._id || item.id;
        setCart(prev => {
            const newQty = (prev[id] || 0) - 1;
            if (newQty <= 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: newQty };
        });
    };

    const filteredFoods = foods.filter(f =>
        (f.name || f.title || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 relative pb-20">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={() => navigate('/user')} className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-slate-800">Food Market</h1>
                    </div>

                    {/* Budget & Search */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center gap-3 w-full md:w-auto">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-semibold">Spending Power</p>
                                <p className="font-bold text-emerald-700">₦{remainingBudget.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search fresh produce..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                    </div>
                ) : filteredFoods.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <ShoppingBasket size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No food items found matching "{search}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredFoods.map(item => {
                            const id = item._id || item.id;
                            const qty = cart[id] || 0;

                            return (
                                <div key={id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                                    <div className="h-40 bg-slate-100 relative overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ShoppingBasket size={32} />
                                            </div>
                                        )}
                                        {qty > 0 && (
                                            <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                {qty} in cart
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
                                            <p className="text-emerald-600 font-semibold mb-3">₦{item.price?.toLocaleString() || '0'}</p>
                                        </div>

                                        {qty === 0 ? (
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                disabled={remainingBudget < (item.price || 0)}
                                                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                            >
                                                <Plus size={16} />
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-between bg-slate-100 rounded-xl p-1">
                                                <button
                                                    onClick={() => handleRemoveFromCart(item)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:text-red-500"
                                                >
                                                    -
                                                </button>
                                                <span className="font-bold text-slate-700 text-sm">{qty}</span>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={remainingBudget < (item.price || 0)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:text-emerald-500 disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cart Summary Bar */}
            {Object.keys(cart).length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-20">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500">Total Selection</p>
                            <p className="text-xl font-bold text-slate-900">₦{cartTotal.toLocaleString()}</p>
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2">
                            Checkout
                            <ArrowLeft className="rotate-180" size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
