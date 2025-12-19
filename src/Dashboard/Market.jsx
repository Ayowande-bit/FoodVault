// import React, { useState, useEffect } from 'react';
// import { ShoppingBasket, Search, ArrowLeft, Plus, Check, Wallet, Filter, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // --- GRAINS & FLOURS IMPORTS ---
// import ForeignRice from "../assets/RedBull.jpg";
// import Rice from '../assets/Rice.jpg';
// import BasmaticRice from "../assets/Basmatic.jpg";
// import Local from '../assets/Local.jpg';
// import Oloyin from '../assets/Oloyin.jpg';
// import White from '../assets/White.jpg';
// import Yellow from '../assets/Yellow.jpg';
// import WhiteBeans from '../assets/WhiteBeans.jpg';
// import Semovita from '../assets/Semovita.jpg';

// // --- TUBERS IMPORTS ---
// import Large from '../assets/Yam.jpg';
// import Medium from '../assets/Medium.jpg';
// import Sweet from "../assets/Sweet.jpg";
// import IrishPotato from "../assets/Irish.jpg";

// // --- PROTEINS IMPORTS ---
// import Chicken from "../assets/FullChicken.jpg";
// import Turkey from "../assets/Wings.jpg";
// import Stock from "../assets/Stockfish.jpg";

// // --- OILS IMPORTS ---
// import Palm from "../assets/PalmOil.jpg";
// import VegetableOil from "../assets/Vegetable.jpg";
// import Tera from "../assets/Tera.jpg";
// import BigTera from "../assets/BigTera.jpg";
// import Sachet from "../assets/SachetTera.jpg";

// // --- SPICES & INGREDIENTS IMPORTS ---
// import Maggi from "../assets/MaggiStar.jpg";
// import LocalSalt from "../assets/LocalSalt.jpg";
// import CameroonPepper from "../assets/Cameroon.jpg";
// import Ginger from "../assets/Ginger.jpg";
// import Garlic from "../assets/Garlic.jpg";
// import Tumeric from "../assets/Tumeric.jpg";
// import Curry from "../assets/Curry.jpg";
// import Bay from "../assets/BayLeave.jpg";
// import Powder from "../assets/PowderGarlic.jpg";
// import Nutmeg from "../assets/NutmegSeed.jpg";
// import Locut from "../assets/Locuts.jpg";
// import Ogbono from "../assets/ogbono.jpg";
// import Cray from "../assets/CrayFish.jpg";
// import Dried from "../assets/DriedPepper.jpg";
// import Egusi from "../assets/Egusi.jpg";

// // --- VEGETABLES IMPORTS ---
// import Onion from "../assets/Onions.jpg";
// import Cucumber from "../assets/Cucumber.jpg";

// // --- FRUITS IMPORTS ---
// import Watermelon from "../assets/Water.jpg";
// import Pineapple from "../assets/Pineapple.jpg";
// import Orange from "../assets/Orange.png";
// import Banana from "../assets/Banana.jpg";
// import Papaya from "../assets/Pawpaw.jpg";
// import Avocado from "../assets/Pear.jpg";
// import Mango from "../assets/Mango.jpg";
// import GardenEgg from "../assets/Garden.jpg";
// import Cocunut from "../assets/Cocunut.jpg";
// import Guava from "../assets/Guava.jpg";
// import Cashew from "../assets/Cashew.jpg";
// import Tangerine from "../assets/Tangerine.jpg";
// import Lime from "../assets/Lime.jpg";
// import Lemon from "../assets/Lemon.jpg";
// import Soursop from"../assets/SourSop.jpg";
// import Agbalumo from "../assets/Agbalumo.jpg";
// import Dates from "../assets/Dates.jpg";
// import Apple from "../assets/Apple.jpg";




// const API_BASE = import.meta.env.VITE_API_BASE;

// // Extensive Nigerian Market Data
// const NIGERIAN_MARKET_DATA = [
//     // --- GRAINS ---
//     { id: 'rice-50kg', name: 'Foreign Rice (50kg)', price: 58000, category: 'Grains', image: ForeignRice },
//     { id: 'rice-25kg', name: 'Foreign Rice (25kg)', price: 29500, category: 'Grains', image: Rice },
//     { id: 'rice-basmati', name: 'Basmati Rice ', price: 35000, category: 'Grains', image: BasmaticRice },
//     { id: 'rice-ofada-5kg', name: 'Ofada Rice (5kg)', price: 9000, category: 'Grains', image: 'https://images.unsplash.com/photo-1605307555419-756184e27f06?auto=format&fit=crop&w=500&q=60' }, // Generic sack/grains
//     { id: 'rice-ofada-20kg', name: 'Ofada Rice (20kg)', price: 34000, category: 'Grains', image: 'https://images.unsplash.com/photo-1605307555419-756184e27f06?auto=format&fit=crop&w=500&q=60' },
//     { id: 'local-rice', name: 'Local Rice ', price: 4000, category: 'Grains', image: Local },
//     { id: 'beans-oloyin', name: 'Beans Oloyin ', price: 5500, category: 'Grains', image: Oloyin },
//     { id: 'beans', name: 'White Beans', price: 95000, category: 'Grains', image: WhiteBeans},
//     { id: 'garri-white', name: 'Garri White ', price: 2500, category: 'Grains', image: White },
//     { id: 'garri-yellow', name: 'Garri Yellow ', price: 2800, category: 'Grains', image: Yellow },
//     { id: 'semovita-10kg', name: 'Semovita (10kg)', price: 11000, category: "Grains", image: Semovita },

//     // --- TUBERS ---
//     { id: 'yam-large', name: 'Yam (Large Tuber)', price: 3500, category: 'Tubers', image: Large },
//     { id: 'yam-medium', name: 'Yam (Medium Tuber)', price: 2200, category: 'Tubers', image: Medium },
//     { id: 'potato-sweet', name: 'Sweet Potato (Basket)', price: 4500, category: 'Tubers', image: Sweet },
//     { id: 'potato-irish', name: 'Irish Potato (Basket)', price: 6500, category: 'Tubers', image: IrishPotato },

//     // --- PROTEINS ---
//     { id: 'chicken-frozen', name: 'Frozen Chicken (Full)', price: 7500, category: 'Proteins', image: Chicken },
//     { id: 'turkey-wings', name: 'Turkey Wings (kg)', price: 4500, category: 'Proteins', image: Turkey },
//     { id: 'stockfish-whole', name: 'Stockfish ', price: 18000, category: 'Proteins', image: Stock },

//     // --- OILS ---
//     { id: 'palm-oil-5l', name: 'Palm Oil (5 Liters)', price: 6500, category: 'Oils', image: Palm },
//     { id: 'Kings-oil-5l', name: 'King\'s Oil (5 Liters)', price: 7000, category: 'Oils', image: VegetableOil },
//     { id: 'tera-oil-5l', name: 'Tera Oil (5 Liters)', price: 13500, category: 'Oils', image: Tera },
//     { id: 'tera-oil-full', name: 'Tera Oil (Full)', price: 13500, category: 'Oils', image: BigTera },
//     { id: 'tera-oil-sachet', name: 'Tera Oil ', price: 3500, category: 'Oils', image: Sachet },

//     // --- SPICES & INGREDIENTS ---
//     { id: 'egusi', name: 'Egusi (Cup)', price: 900, category: 'Spicies', image: Egusi },
//     { id: 'maggi-pack', name: 'Maggi Star (Pack)', price: 1100, category: 'Spices', image: Maggi },
//     { id: 'salt-farm', name: 'Local Salt ', price: 200, category: 'Spices', image: LocalSalt },
//     { id: 'pepper-dry', name: 'Dry Pepper (Basket)', price: 3500, category: 'Spices', image: Dried },
//     { id: 'pepper-cameroon', name: 'Cameroun Pepper (Powder)', price: 2000, category: 'Spices', image: CameroonPepper },
//     { id: 'ginger-farm', name: 'Ginger (Basket)', price: 14000, category: 'Spices', image: Ginger },
//     { id: 'garlic-farm', name: 'Garlic (Basket)', price: 18000, category: 'Spices', image: Garlic },
//     { id: 'turmeric', name: 'Turmeric (Fresh Bunches)', price: 1500, category: 'Spices', image: Tumeric },
//     { id: 'curry-pack', name: 'Curry Powder ', price: 2500, category: 'Spices', image: Curry },
//     { id: 'bay-leaves', name: 'Bay Leaves', price: 1200, category: 'Spices', image: Bay },
//     { id: 'powder-garlic', name: 'Powder Garlic ', price: 1200, category: 'Spices', image: Powder },
//     { id: 'nutmeg', name: 'Nutmeg (Seeds)', price: 1200, category: 'Spices', image: Nutmeg },
//     { id: 'locust-beans', name: 'Locust Beans ', price: 3500, category: 'Spices', image: Locut },
//     { id: 'ogbono', name: 'Ogbono Seeds (Bag)', price: 32000, category: 'Spices', image: Ogbono },
//     { id: 'crayfish', name: 'Crayfish (Bag)', price: 22000, category: 'Spices', image: Cray },

//     // --- VEGETABLES ---
//     { id: 'onions', name: 'Onions ', price: 3000, category: 'Spicies', image: Onion },
//     { id: 'cucumber-bag', name: 'Cucumbers (Bag)', price: 4000, category: 'Fruits', image: Cucumber },

//     // --- FRUITS ---
//     { id: 'watermelon', name: 'Watermelon ', price: 2000, category: 'Fruits', image: Watermelon },
//     { id: 'pineapple', name: 'Pineapple ', price: 20000, category: 'Fruits', image: Pineapple },
//     { id: 'orange', name: 'Orange ', price: 5000, category: 'Fruits', image: Orange },
//     { id: 'banana', name: 'Banana ', price: 3000, category: 'Fruits', image: Banana },
//     { id: 'pawpaw', name: 'Pawpaw ', price: 6000, category: 'Fruits', image: Papaya },
//     { id: 'avocado', name: 'Avocado', price: 4500, category: 'Fruits', image: Avocado },
//     { id: 'mango', name: 'Mango ', price: 4000, category: 'Fruits', image: Mango }, // Seasonal check
//     { id: 'garden-egg', name: 'Garden Egg', price: 3500, category: 'Fruits', image: GardenEgg },
//     { id: 'coconut-doz', name: 'Coconut ', price: 900, category: 'Fruits', image: Cocunut },

//     { id: 'guava', name: 'Guava', price: 3500, category: 'Fruits', image: Guava },
//     { id: 'cashew-fruit', name: 'Cashew Fruit', price: 2500, category: 'Fruits', image: Cashew },
//     { id: 'tangerine', name: 'Tangerine', price: 4500, category: 'Fruits', image: Tangerine },
//     { id: 'lime', name: 'Lime', price: 3000, category: 'Fruits', image: Lime },
//     { id: 'lemon', name: 'Lemon', price: 3200, category: 'Fruits', image: Lemon },
//     { id: 'soursop', name: 'Soursop', price: 7000, category: 'Fruits', image: Soursop },
//     { id: 'agbalumo', name: 'Agbalumo (African Star Apple)', price: 3000, category: 'Fruits', image: Agbalumo },
//     { id: 'dates', name: 'Dates', price: 3000, category: 'Fruits', image: Dates },
//     { id: 'apple', name: 'Apple', price: 3000, category: 'Fruits', image: Apple },


// ];

// const CATEGORIES = ['All', 'Grains', 'Tubers', 'Proteins','Oils', 'Spices','Fruits'];

// export default function Market() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [cart, setCart] = useState({}); // { id: quantity }
//     const [savings, setSavings] = useState(0);

//     // Initial Load
//     useEffect(() => {
//         // Savings
//         const storedPlans = JSON.parse(localStorage.getItem('plans') || '[]');
//         const total = storedPlans.reduce((acc, plan) => acc + (plan.currentAmount || 0), 0);
//         setSavings(total);

//         // Simulate loading delay for realism
//         setTimeout(() => setLoading(false), 800);
//     }, []);

//     const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
//         const item = NIGERIAN_MARKET_DATA.find(f => f.id === id);
//         return acc + ((item?.price || 0) * qty);
//     }, 0);

//     const remainingBudget = savings - cartTotal;
//     const progressPercent = Math.min(100, (cartTotal / savings) * 100) || 0;

//     const handleAddToCart = (item) => {
//         if (cartTotal + item.price > savings) {
//             alert("Insufficient Funds: You don't have enough savings to add this item.");
//             return;
//         }
//         setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
//     };

//     const handleRemoveFromCart = (item) => {
//         setCart(prev => {
//             const newQty = (prev[item.id] || 0) - 1;
//             if (newQty <= 0) {
//                 const { [item.id]: _, ...rest } = prev;
//                 return rest;
//             }
//             return { ...prev, [item.id]: newQty };
//         });
//     };

//     const filteredFoods = NIGERIAN_MARKET_DATA.filter(f => {
//         const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
//         const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
//         return matchesSearch && matchesCategory;
//     });

//     return (
//         <div className="min-h-screen bg-slate-50 relative pb-32">
//             {/* Header */}
//             <div className="bg-white sticky top-0 z-20 border-b border-slate-200 shadow-sm transition-all">
//                 <div className="max-w-7xl mx-auto px-4 py-4">
//                     <div className="flex items-center gap-4 mb-4">
//                         <button onClick={() => navigate('/user')} className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
//                             <ArrowLeft size={20} />
//                         </button>
//                         <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Food<span className="text-emerald-500">Market</span></h1>
//                     </div>

//                     {/* Budget Bar */}
//                     <div className="bg-emerald-900 rounded-2xl p-5 text-white mb-6 shadow-xl relative overflow-hidden group">
//                         <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
//                             <Wallet size={120} />
//                         </div>
//                         <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
//                             <div>
//                                 <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-1">Available Savings</p>
//                                 <p className="text-3xl md:text-4xl font-black tracking-tight">₦{savings.toLocaleString()}</p>
//                             </div>
//                             <div className="flex-1 w-full md:max-w-md">
//                                 <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-2">
//                                     <span>Spent: ₦{cartTotal.toLocaleString()}</span>
//                                     <span>Remaining: ₦{remainingBudget.toLocaleString()}</span>
//                                 </div>
//                                 <div className="h-4 bg-emerald-800 rounded-full overflow-hidden border border-emerald-700">
//                                     <div
//                                         className={`h-full transition-all duration-500 ease-out ${progressPercent > 90 ? 'bg-red-500' : 'bg-linear-to-r from-emerald-400 to-emerald-600'
//                                             }`}
//                                         style={{ width: `${progressPercent}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Controls */}
//                     <div className="flex flex-col lg:flex-row gap-4">
//                         <div className="relative flex-1">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                             <input
//                                 type="text"
//                                 placeholder="Search rice, yam, oil..."
//                                 value={search}
//                                 onChange={e => setSearch(e.target.value)}
//                                 className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-700 focus:ring-4 focus:ring-slate-200 outline-none transition-all placeholder:text-slate-400 font-medium"
//                             />
//                         </div>
//                         <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
//                             {CATEGORIES.map(cat => (
//                                 <button
//                                     key={cat}
//                                     onClick={() => setSelectedCategory(cat)}
//                                     className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border-2 ${selectedCategory === cat
//                                         ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
//                                         : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
//                                         }`}
//                                 >
//                                     {cat}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Grid */}
//             <div className="max-w-7xl mx-auto p-4 md:p-6">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-32 opacity-50">
//                         <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-emerald-500 mb-4"></div>
//                         <p className="font-semibold text-slate-400">Loading market prices...</p>
//                     </div>
//                 ) : filteredFoods.length === 0 ? (
//                     <div className="text-center py-40">
//                         <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <ShoppingBasket size={48} className="text-slate-300" />
//                         </div>
//                         <h3 className="text-xl font-bold text-slate-700 mb-2">No items found</h3>
//                         <p className="text-slate-400">Try searching for something else or change category</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
//                         {filteredFoods.map(item => {
//                             const qty = cart[item.id] || 0;
//                             // const isAffordable = remainingBudget >= item.price; // No longer needed for disabled state

//                             return (
//                                 <div
//                                     key={item.id}
//                                     className="bg-white rounded-3xl border border-slate-100 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col group"
//                                 >
//                                     <div className="h-40 sm:h-48 bg-slate-100 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
//                                         {item.image ? (
//                                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-slate-300">
//                                                 <ShoppingBasket size={32} />
//                                             </div>
//                                         )}
//                                         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm border border-slate-200/50">
//                                             {item.category}
//                                         </div>
//                                     </div>

//                                     <div className="p-4 flex-1 flex flex-col">
//                                         <div className="mb-4">
//                                             <h3 className="font-bold text-slate-800 mb-1 leading-tight line-clamp-2 min-h-[2.5em]">{item.name}</h3>
//                                             <p className="text-emerald-600 font-black text-lg">₦{item.price.toLocaleString()}</p>
//                                         </div>

//                                         <div className="mt-auto">
//                                             {qty === 0 ? (
//                                                 <button
//                                                     onClick={() => handleAddToCart(item)}
//                                                     className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-200"
//                                                 >
//                                                     Add to Cart <Plus size={16} />
//                                                 </button>
//                                             ) : (
//                                                 <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-1 border border-emerald-100">
//                                                     <button
//                                                         onClick={() => handleRemoveFromCart(item)}
//                                                         className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 active:scale-90 transition-all font-bold text-lg"
//                                                     >
//                                                         -
//                                                     </button>
//                                                     <span className="font-black text-emerald-800 text-lg">{qty}</span>
//                                                     <button
//                                                         onClick={() => handleAddToCart(item)}
//                                                         className="w-10 h-10 flex items-center justify-center rounded-lg shadow-sm transition-all font-bold text-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-90"
//                                                     >
//                                                         +
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             {/* Cart Summary Float */}
//             <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] z-30 transform transition-transform duration-300 ${cartTotal > 0 ? 'translate-y-0' : 'translate-y-[120%]'}`}>
//                 <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="flex items-center gap-4 w-full sm:w-auto">
//                         <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 hidden sm:block">
//                             <Check size={24} />
//                         </div>
//                         <div>
//                             <p className="text-sm text-slate-500 font-medium">Total Selection</p>
//                             <div className="flex items-baseline gap-2">
//                                 <p className="text-2xl font-black text-slate-900">₦{cartTotal.toLocaleString()}</p>
//                                 <span className="text-xs text-slate-400">({Object.values(cart).reduce((a, b) => a + b, 0)} items)</span>
//                             </div>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => alert(`Checkout not implemented yet!\nSelected Total: ₦${cartTotal.toLocaleString()}`)}
//                         className="w-full sm:w-auto bg-slate-900 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 text-lg"
//                     >
//                         Checkout Now
//                         <ArrowLeft className="rotate-180" size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
