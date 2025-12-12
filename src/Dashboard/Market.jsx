import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Search, ArrowLeft, Plus, Check, Wallet, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://foodvault-36sx.onrender.com';

// Extensive Nigerian Market Data
const NIGERIAN_MARKET_DATA = [
    // Grains & Flours
    { id: 'rice-50kg', name: 'Foreign Rice (50kg)', price: 75000, category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop' },
    { id: 'rice-25kg', name: 'Foreign Rice (25kg)', price: 38000, category: 'Grains', image: 'https://images.unsplash.com/photo-1536304993881-ff000997bc50?q=80&w=1000&auto=format&fit=crop' },
    { id: 'local-rice', name: 'Local Rice (Painter)', price: 6500, category: 'Grains', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop' },
    { id: 'beans-oloyin', name: 'Beans Oloyin (Painter)', price: 8500, category: 'Grains', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?q=80&w=1000&auto=format&fit=crop' },
    { id: 'garri-white', name: 'Garri White (Painter)', price: 3500, category: 'Grains', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ba/Garri_foto.jpg/800px-Garri_foto.jpg' },
    { id: 'garri-yellow', name: 'Garri Yellow (Painter)', price: 4000, category: 'Grains', image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Garri_and_groundnut.jpg' },
    { id: 'semovita-10kg', name: 'Semovita (10kg)', price: 10500, category: 'Grains', image: 'https://guardian.ng/wp-content/uploads/2021/08/Semovita.jpg' }, // Keeping this as obtaining a stock photo for Semovita is specifically hard, fallback to a representative one if needed, but trying a cleaner link if possible, or sticking to the best available. I will use a high quality generic flour sack if specific is unavailable, but let's try a better generic option for "Grain sack" if this link fails? Actually let's use a clear "Flour Sack" image.
    // Re-evaluating Semovita: providing a clearer generic flour bag image for Better UI consistency
    // { id: 'semovita-10kg', name: 'Semovita (10kg)', price: 10500, category: 'Grains', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?q=80&w=1000' },

    // Tubers
    { id: 'yam-large', name: 'Yam (Large Tuber)', price: 4500, category: 'Tubers', image: 'https://netstorage-legit.akamaized.net/images/vllkyt31d07c08d13.jpg' },
    { id: 'yam-medium', name: 'Yam (Medium Tuber)', price: 2800, category: 'Tubers', image: 'https://guardian.ng/wp-content/uploads/2016/08/Yam-tubers.jpg' },
    { id: 'potato-sweet', name: 'Sweet Potato (Basket)', price: 5000, category: 'Tubers', image: 'https://images.unsplash.com/photo-1596097635121-14b63b8200de?q=80&w=1000&auto=format&fit=crop' },
    { id: 'potato-irish', name: 'Irish Potato (Basket)', price: 8000, category: 'Tubers', image: 'https://images.unsplash.com/photo-1518977676651-71f6480bc68d?q=80&w=1000&auto=format&fit=crop' },

    // Proteins
    { id: 'chicken-frozen', name: 'Frozen Chicken (Full)', price: 9000, category: 'Proteins', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1000&auto=format&fit=crop' },
    { id: 'turkey-wings', name: 'Turkey Wings (kg)', price: 5500, category: 'Proteins', image: 'https://images.unsplash.com/photo-1598103371890-a569580bac93?q=80&w=1000&auto=format&fit=crop' },
    { id: 'beef-kg', name: 'Beef (kg)', price: 5000, category: 'Proteins', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=1000&auto=format&fit=crop' },
    { id: 'egusi', name: 'Egusi (Cup)', price: 1200, category: 'Ingredients', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Egusi_Seeds.jpg/800px-Egusi_Seeds.jpg' },
    { id: 'crayfish', name: 'Crayfish (Big Bag)', price: 6000, category: 'Ingredients', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Crayfish_at_a_market.jpg/800px-Crayfish_at_a_market.jpg' },

    // Oils & Spices
    { id: 'palm-oil-5l', name: 'Palm Oil (5 Liters)', price: 8500, category: 'Oils & Spices', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Palm_oil_production_in_Jukwa_Village_09.jpg' },
    { id: 'veg-oil-3l', name: 'Vegetable Oil (3 Liters)', price: 9000, category: 'Oils & Spices', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcdcc3a?q=80&w=1000&auto=format&fit=crop' },
    { id: 'maggi-pack', name: 'Maggi Star (Pack)', price: 1500, category: 'Oils & Spices', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Maggi_cubes.jpg' },
    { id: 'salt', name: 'Dangote Salt (Bag)', price: 500, category: 'Oils & Spices', image: 'https://images.unsplash.com/photo-1518110925495-5fe2abca2b2a?q=80&w=1000&auto=format&fit=crop' },

    // Vegetables
    { id: 'onions-bskt', name: 'Onions (Small Basket)', price: 4500, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1000&auto=format&fit=crop' },
    { id: 'pepper-basket', name: 'Pepper & Tomatoes (Basket)', price: 12000, category: 'Vegetables', image: 'https://images.unsplash.com/photo-1563565375-f3fdf8655e01?q=80&w=1000&auto=format&fit=crop' },
];

const CATEGORIES = ['All', 'Grains', 'Tubers', 'Proteins', 'Ingredients', 'Oils & Spices', 'Vegetables'];

export default function Market() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState({}); // { id: quantity }
    const [savings, setSavings] = useState(0);

    // Initial Load
    useEffect(() => {
        // Savings
        const storedPlans = JSON.parse(localStorage.getItem('plans') || '[]');
        const total = storedPlans.reduce((acc, plan) => acc + (plan.currentAmount || 0), 0);
        setSavings(total);

        // Simulate loading delay for realism
        setTimeout(() => setLoading(false), 800);
    }, []);

    const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
        const item = NIGERIAN_MARKET_DATA.find(f => f.id === id);
        return acc + ((item?.price || 0) * qty);
    }, 0);

    const remainingBudget = savings - cartTotal;
    const progressPercent = Math.min(100, (cartTotal / savings) * 100) || 0;

    const handleAddToCart = (item) => {
        if (cartTotal + item.price > savings) {
            return; // Blocked
        }
        setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    };

    const handleRemoveFromCart = (item) => {
        setCart(prev => {
            const newQty = (prev[item.id] || 0) - 1;
            if (newQty <= 0) {
                const { [item.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [item.id]: newQty };
        });
    };

    const filteredFoods = NIGERIAN_MARKET_DATA.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 relative pb-32">
            {/* Header */}
            <div className="bg-white sticky top-0 z-20 border-b border-slate-200 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={() => navigate('/user')} className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Food<span className="text-emerald-500">Market</span></h1>
                    </div>

                    {/* Budget Bar */}
                    <div className="bg-slate-900 rounded-2xl p-5 text-white mb-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet size={120} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Available Savings</p>
                                <p className="text-3xl md:text-4xl font-black tracking-tight">₦{savings.toLocaleString()}</p>
                            </div>
                            <div className="flex-1 w-full md:max-w-md">
                                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                                    <span>Spent: ₦{cartTotal.toLocaleString()}</span>
                                    <span>Remaining: ₦{remainingBudget.toLocaleString()}</span>
                                </div>
                                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div
                                        className={`h-full transition-all duration-500 ease-out ${progressPercent > 90 ? 'bg-red-500' : 'bg-linear-to-r from-emerald-400 to-emerald-600'
                                            }`}
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search rice, yam, oil..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-700 focus:ring-4 focus:ring-slate-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 ${selectedCategory === cat
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-emerald-500 mb-4"></div>
                        <p className="font-semibold text-slate-400">Loading market prices...</p>
                    </div>
                ) : filteredFoods.length === 0 ? (
                    <div className="text-center py-40">
                        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBasket size={48} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No items found</h3>
                        <p className="text-slate-400">Try searching for something else or change category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {filteredFoods.map(item => {
                            const qty = cart[item.id] || 0;
                            const isAffordable = remainingBudget >= item.price;
                            const isMaxed = !isAffordable && qty === 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col group ${isMaxed ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-xl hover:shadow-emerald-500/10 border-slate-100 hover:border-emerald-500/30'
                                        }`}
                                >
                                    <div className="h-40 sm:h-48 bg-slate-100 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ShoppingBasket size={32} />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm border border-slate-200/50">
                                            {item.category}
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="font-bold text-slate-800 mb-1 leading-tight line-clamp-2 min-h-[2.5em]">{item.name}</h3>
                                            <p className="text-emerald-600 font-black text-lg">₦{item.price.toLocaleString()}</p>
                                        </div>

                                        <div className="mt-auto">
                                            {qty === 0 ? (
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={!isAffordable}
                                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isAffordable
                                                        ? 'bg-slate-900 text-white hover:bg-emerald-600 active:scale-95'
                                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {isAffordable ? (
                                                        <>Add to Cart <Plus size={16} /></>
                                                    ) : (
                                                        <>Too Expensive</>
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-1 border border-emerald-100">
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item)}
                                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 active:scale-90 transition-all font-bold text-lg"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-black text-emerald-800 text-lg">{qty}</span>
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        disabled={!isAffordable}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-lg shadow-sm transition-all font-bold text-lg ${isAffordable
                                                            ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:scale-90'
                                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cart Summary Float */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] z-30 transform transition-transform duration-300 ${cartTotal > 0 ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 hidden sm:block">
                            <Check size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Selection</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-black text-slate-900">₦{cartTotal.toLocaleString()}</p>
                                <span className="text-xs text-slate-400">({Object.values(cart).reduce((a, b) => a + b, 0)} items)</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => alert(`Checkout not implemented yet!\nSelected Total: ₦${cartTotal.toLocaleString()}`)}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        Checkout Now
                        <ArrowLeft className="rotate-180" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
