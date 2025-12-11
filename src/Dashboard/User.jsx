import React, { useState, useEffect } from 'react';
import { 
    Wallet, TrendingUp, Calendar, Package, ArrowDownCircle, X, 
    CreditCard, Smartphone, LogOut, Phone, MessageCircle, Mail
} from 'lucide-react';

export default function User() {
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [transactions, setTransactions] = useState([]);
    
    // Modal states
    const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Form states
    const [createPlanForm, setCreatePlanForm] = useState({
        targetAmount: '',
        cycleAmount: '',
        frequency: 'Monthly',
        endDate: '',
        lga: '',
        deliveryAddress: '',
        foodPreferences: []
    });

    const [addMoneyForm, setAddMoneyForm] = useState({
        amount: '',
        paymentMethod: 'Card'
    });

    const API_BASE = 'https://foodvault-36sx.onrender.com/api/v1/savings/:id';

    // Load data on mount
    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        if (!storedUserString) {
            window.location.href = '/sign';
            return;
        }

        try {
            const storedUser = JSON.parse(storedUserString);
            console.log("🔍 FULL USER DATA:", storedUser);  // ← ADD THIS
            console.log("Firstname:", storedUser?.firstname);  // ← ADD THIS  
            console.log("Lastname:", storedUser?.lastname);    // ← ADD THIS
            setUser(storedUser);

            // Fetch plans
            fetch(`${API_BASE}/plan`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'user-id': storedUser._id }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.plans) {
                    setPlans(data.plans);
                    localStorage.setItem('plans', JSON.stringify(data.plans));
                } else {
                    const localPlans = JSON.parse(localStorage.getItem('plans') || '[]');
                    setPlans(localPlans);
                }
            })
            .catch(() => {
                const localPlans = JSON.parse(localStorage.getItem('plans') || '[]');
                setPlans(localPlans);
            });

            const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            setTransactions(savedTransactions);
        } catch {
            window.location.href = '/sign';
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto" />
                    <p className="mt-4 text-slate-300">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Calculations
    const totalSaved = plans.reduce((acc, p) => acc + (p.currentAmount || 0), 0);
    const totalTarget = plans.reduce((acc, p) => acc + (p.targetAmount || 0), 0);
    const foodValue = totalSaved * 0.9;
    const quickAmounts = [1000, 2000, 5000, 10000, 20000];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Food preference toggle
    const handleFoodToggle = (food) => {
        setCreatePlanForm(prev => ({
            ...prev,
            foodPreferences: prev.foodPreferences.includes(food)
                ? prev.foodPreferences.filter(f => f !== food)
                : [...prev.foodPreferences, food]
        }));
    };

    // Create plan
    const handleCreatePlan = async () => {
        if (!createPlanForm.targetAmount || !createPlanForm.cycleAmount) {
            alert('Please fill in Target Amount and Amount Per Cycle');
            return;
        }

        const payload = {
            planName: 'Food Savings',
            targetAmount: parseFloat(createPlanForm.targetAmount),
            cycleAmount: parseFloat(createPlanForm.cycleAmount),
            frequency: createPlanForm.frequency,
            endDate: createPlanForm.endDate,
            lga: createPlanForm.lga,
            deliveryAddress: createPlanForm.deliveryAddress,
            foodPreferences: createPlanForm.foodPreferences,
            userId: user._id,
            currentAmount: 0,
            status: 'active'
        };

        try {
            const res = await fetch(`${API_BASE}/create`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'user-id': user._id
                },
                body: JSON.stringify(payload),
            });
            
            const data = await res.json();
            
            if (data.success && data.newPlan) {
                setPlans(prev => [...prev, data.newPlan]);
                const updatedPlans = [...plans, data.newPlan];
                localStorage.setItem('plans', JSON.stringify(updatedPlans));
            } else {
                const newPlan = {
                    _id: Date.now().toString(),
                    ...payload,
                    createdAt: new Date().toISOString()
                };
                setPlans(prev => [...prev, newPlan]);
                localStorage.setItem('plans', JSON.stringify([...plans, newPlan]));
            }
        } catch {
            const newPlan = {
                _id: Date.now().toString(),
                ...payload,
                createdAt: new Date().toISOString()
            };
            setPlans(prev => [...prev, newPlan]);
            localStorage.setItem('plans', JSON.stringify([...plans, newPlan]));
        }

        setCreatePlanForm({
            targetAmount: '',
            cycleAmount: '',
            frequency: 'Monthly',
            endDate: '',
            lga: '',
            deliveryAddress: '',
            foodPreferences: []
        });
        setShowCreatePlanModal(false);
        alert('Savings plan created successfully!');
    };

    // Add money
    const handleAddMoney = async () => {
        if (!addMoneyForm.amount || !selectedPlan) {
            alert('Please enter an amount');
            return;
        }

        const amount = parseFloat(addMoneyForm.amount);
        if (amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const payload = { amount };

        try {
            const res = await fetch(`${API_BASE}/update/${selectedPlan._id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'user-id': user._id
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            
            if (data.success && data.updatedPlan) {
                setPlans(prev => prev.map(p => p._id === selectedPlan._id ? data.updatedPlan : p));
                const updatedPlans = plans.map(p => p._id === selectedPlan._id ? data.updatedPlan : p);
                localStorage.setItem('plans', JSON.stringify(updatedPlans));
            } else {
                const updatedPlan = {
                    ...selectedPlan,
                    currentAmount: (selectedPlan.currentAmount || 0) + amount
                };
                setPlans(prev => prev.map(p => p._id === selectedPlan._id ? updatedPlan : p));
                const updatedPlans = plans.map(p => p._id === selectedPlan._id ? updatedPlan : p);
                localStorage.setItem('plans', JSON.stringify(updatedPlans));
            }

            const newTransaction = {
                id: Date.now().toString(),
                planId: selectedPlan._id,
                planName: selectedPlan.planName || 'Food Savings',
                amount: amount,
                paymentMethod: addMoneyForm.paymentMethod,
                date: new Date().toISOString().split('T')[0],
                type: 'Deposit',
                timestamp: new Date().toISOString()
            };
            
            const updatedTransactions = [newTransaction, ...transactions];
            setTransactions(updatedTransactions);
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        } catch {
            const updatedPlan = {
                ...selectedPlan,
                currentAmount: (selectedPlan.currentAmount || 0) + amount
            };
            setPlans(prev => prev.map(p => p._id === selectedPlan._id ? updatedPlan : p));
            const updatedPlans = plans.map(p => p._id === selectedPlan._id ? updatedPlan : p);
            localStorage.setItem('plans', JSON.stringify(updatedPlans));

            const newTransaction = {
                id: Date.now().toString(),
                planId: selectedPlan._id,
                planName: selectedPlan.planName || 'Food Savings',
                amount: amount,
                paymentMethod: addMoneyForm.paymentMethod,
                date: new Date().toISOString().split('T')[0],
                type: 'Deposit',
                timestamp: new Date().toISOString()
            };
            
            const updatedTransactions = [newTransaction, ...transactions];
            setTransactions(updatedTransactions);
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        }

        setShowAddMoneyModal(false);
        setSelectedPlan(null);
        setAddMoneyForm({ amount: '', paymentMethod: 'Card' });
        alert(`Successfully added ₦${amount.toLocaleString()} to your savings plan!`);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            window.location.href = '/sign';
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-00">
            <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 gap-4">
                    <div>
                      <p className="text-3xl text-gray-600 font-medium">
                          {getGreeting()}, {user?.firstname || user?.lastname || user?.email?.split('@')[0] || 'Guest'}👋🏽

                        </p>
                        
                        <p className="text-slate-400 text-lg mt-1">
                            Track your plans, deposits, and food value in one place.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowCreatePlanModal(true)}
                            className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-all"
                        >
                            + New Savings Plan
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-teal-700 hover:bg-green-800 text-slate-100 px-3 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 border"
                            title="Logout"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-emerald-700 rounded-2xl p-5 shadow-lg shadow-black/40 border border-emerald-200/2">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-100/15 p-3 rounded-xl">
                                <Wallet className="text-emerald-400" size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-200 uppercase tracking-wider">
                                    Total Saved
                                </p>
                                <p className="text-2xl font-bold text-slate-50">
                                    ₦{totalSaved.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-700 rounded-2xl p-5 shadow-lg shadow-black/40 border border-sky-500/20">
                        <div className="flex items-center gap-3">
                            <div className="bg-sky-500/15 p-3 rounded-xl">
                                <TrendingUp className="text-sky-400" size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-100 uppercase tracking-wider">
                                    Total Target
                                </p>
                                <p className="text-2xl font-bold text-slate-50">
                                    ₦{totalTarget.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-700 rounded-2xl p-5 shadow-lg shadow-black/40">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100/15 p-3 rounded-xl">
                                <Calendar className="text-purple-300" size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-100 uppercase tracking-wider">
                                    Active Plans
                                </p>
                                <p className="text-2xl font-bold text-slate-50">
                                    {plans.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-700 rounded-2xl p-5 shadow-lg shadow-black/40 ">
                        <div className="flex items-center gap-3">
                            <div className="bg-amber-500/15 p-3 rounded-xl">
                                <Package className="text-amber-300" size={22} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-100 uppercase tracking-wider">
                                    Food Value
                                </p>
                                <p className="text-2xl font-bold text-slate-50">
                                    ₦{foodValue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: plans + transactions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Plans */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg md:text-xl font-bold text-gray-600">
                                    Your Savings Plans
                                </h2>
                                {plans.length > 0 && (
                                    <span className="text-xs px-3 py-1 rounded-full bg-slate-900 text-slate-100 border border-slate-700">
                                        {plans.length} plan{plans.length !== 1 ? 's' : ''} active
                                    </span>
                                )}
                            </div>

                            {plans.length === 0 ? (
                                <div className="bg-emerald-800 rounded-2xl p-8 text-center border border-dashed border-slate-700">
                                    <Wallet className="mx-auto text-slate-200 mb-3" size={40} />
                                    <p className="text-slate-100 mb-2 font-medium">
                                        No savings plans yet
                                    </p>
                                    <p className="text-slate-100 text-sm mb-4">
                                        Create your first plan to start saving for food items.
                                    </p>
                                    <button
                                        onClick={() => setShowCreatePlanModal(true)}
                                        className="text-emerald-200 hover:text-emerald-200 text-sm font-semibold"
                                    >
                                        + Create your first plan
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {plans.map((plan) => {
                                        const progress = ((plan.currentAmount || 0) / (plan.targetAmount || 1)) * 100;
                                        const planTransactions = transactions.filter(t => t.planId === plan._id);

                                        return (
                                            <div 
                                                key={plan._id}
                                                className=" rounded-2xl p-5 shadow-lg shadow-black/40 bg-gray-100  transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-emerald-500/10 p-3 rounded-xl">
                                                            <Wallet className="text-emerald-400" size={22} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-600">
                                                                {plan.planName || 'Food Savings'}
                                                            </h3>
                                                            <p className="text-xs text-slate-400">
                                                                {plan.frequency || 'Monthly'} savings plan
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        (plan.status || 'active') === 'active'
                                                            ? 'bg-emerald-600/15 text-gray-600 border border-emerald-400/30'
                                                            : 'bg-slate-700/50 text-slate-300 border border-slate-600'
                                                    }`}>
                                                        {plan.status || 'active'}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex justify-between text-xs mb-1.5">
                                                        <span className="text-slate-400">Progress</span>
                                                        <span className="font-semibold text-slate-100">
                                                            ₦{(plan.currentAmount || 0).toLocaleString()} / ₦{plan.targetAmount?.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-300 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className="bg-linear-to-r from-emerald-900  to-slate-500 h-2.5 rounded-full transition-all"
                                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 mt-1">
                                                        {progress.toFixed(1)}% completed
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-4">
                                                    {plan.endDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={20} />
                                                            {new Date(plan.endDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    )}
                                                    {plan.lga && (
                                                        <span>📍 {plan.lga}</span>
                                                    )}
                                                    {plan.cycleAmount && (
                                                        <span className="flex items-center gap-1 text-slate-400">
                                                            <TrendingUp size={14} />
                                                            ₦{plan.cycleAmount.toLocaleString()} per {(plan.frequency || '').toLowerCase()}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-[11px] text-slate-500 mb-3 pb-3 border-b border-slate-00">
                                                    {planTransactions.length} transaction{planTransactions.length !== 1 ? 's' : ''} made
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setSelectedPlan(plan);
                                                        setShowAddMoneyModal(true);
                                                    }}
                                                    className="w-full bg-linear-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-500/30"
                                                >
                                                    Add money to plan
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Transactions */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-500 mb-3">
                                Recent Transactions
                            </h2>
                            
                            {transactions.length === 0 ? (
                                <div className="bg-slate-200 rounded-2xl p-6 text-center ">
                                    <p className="text-slate-400 text-sm">
                                        No transactions yet. Start saving to see your history here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {transactions.map((transaction) => (
                                        <div 
                                            key={transaction.id}
                                            className="bg-white-100 rounded-2xl p-4 shadow-md shadow-gray-400 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-emerald-500/10 p-2 rounded-xl">
                                                    <ArrowDownCircle className="text-emerald-700" size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-600 text-sm">
                                                        {transaction.type} • {transaction.planName}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        {new Date(transaction.date).toLocaleDateString('en-GB')}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-emerald-500 font-semibold text-sm">
                                                +₦{parseFloat(transaction.amount).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Customer Care */}
                    <div className="space-y-6">
                        <div className="bg-slate-100 rounded-2xl p-6 shadow-lg shadow-black/40 ">
                            <h2 className="text-lg font-bold text-slate-500 mb-1">
                                Customer Care
                            </h2>
                            <p className="text-xs text-slate-400 mb-4">
                                Need help with your savings plan, payments, or delivery? Reach out anytime.
                            </p>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-emerald-700">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-slate-500">
                                            Phone / WhatsApp
                                        </p>
                                        <p className="font-semibold text-slate-400 text-[10px]">
                                            +234 707 268 9047
                                        </p>
                                        <a
                                            href="https://wa.me/2347072689047"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-500 mt-1"
                                        >
                                            <MessageCircle size={13} />
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-sky-900">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-slate-500">
                                            Email
                                        </p>
                                        <p className="font-semibold text-slate-500 text-[12px]">
                                            foodvault86@gmail.com
                                        </p>
                                        <p className="text-[11px] text-slate-500 mt-1">
                                            Reply within 24 hours on weekdays.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-amber-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-slate-500">
                                            Support hours
                                        </p>
                                        <p className="font-semibold text-slate-500 text-[12px]">
                                            9:00am – 6:00pm (Mon – Fri)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-900/10 px-4 py-3 text-[11px] text-slate-400">
                                Tip: When you contact support, share your plan name and last deposit amount so the team can help you faster.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Plan Modal */}
            {showCreatePlanModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-slate-50 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg md:text-xl font-bold text-slate-500">
                                Create new savings plan
                            </h3>
                            <button 
                                onClick={() => setShowCreatePlanModal(false)}
                                className="text-slate-400 hover:text-slate-200"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                                        Target Amount (₦)
                                    </label>
                                    <input
                                        type="number"
                                        value={createPlanForm.targetAmount}
                                        onChange={(e) => setCreatePlanForm({...createPlanForm, targetAmount: e.target.value})}
                                        placeholder="e.g., 50000"
                                        className="w-full px-4 py-2.5 rounded-lg text-slate-700 text-sm border"
                                    />
                                </div>
                                <div>
                                    <label className="block  font-semibold text-slate-600 mb-2 text-sm">
                                        Amount per cycle (₦)
                                    </label>
                                    <input
                                        type="number"
                                        value={createPlanForm.cycleAmount}
                                        onChange={(e) => setCreatePlanForm({...createPlanForm, cycleAmount: e.target.value})}
                                        placeholder="e.g., 5000"
                                        className="w-full px-4 py-2.5  rounded-lg text-slate-700 text-sm border"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                                        Savings frequency
                                    </label>
                                    <select
                                        value={createPlanForm.frequency}
                                        onChange={(e) => setCreatePlanForm({...createPlanForm, frequency: e.target.value})}
                                        className="w-full px-4 py-2.5 border  rounded-lg text-slate-600 text-sm "
                                    >
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        End date
                                    </label>
                                    <input
                                        type="date"
                                        value={createPlanForm.endDate}
                                        onChange={(e) => setCreatePlanForm({...createPlanForm, endDate: e.target.value})}
                                        className="w-full px-4 py-2.5 border border-slate-700 rounded-lg  text-slate-500 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">
                                    Local Government Area
                                </label>
                                <select
                                    value={createPlanForm.lga}
                                    onChange={(e) => setCreatePlanForm({...createPlanForm, lga: e.target.value})}
                                    className="w-full px-4 py-2.5 border border-slate-700 rounded-lg  text-slate-500 text-sm "
                                >
                                    <option value="">Select LGA</option>
                                    <option value="Ado Ekiti">Ado Ekiti</option>
                                    <option value="Ekiti East">Ekiti East</option>
                                    <option value="Ekiti West">Ekiti West</option>
                                    <option value="Emure">Emure</option>
                                    <option value="Gbonyin">Gbonyin</option>
                                    <option value="Ido Osi">Ido Osi</option>
                                    <option value="Ijero">Ijero</option>
                                    <option value="Ikere">Ikere</option>
                                    <option value="Ikole">Ikole</option>
                                    <option value="Ilejemeje">Ilejemeje</option>
                                    <option value="Irepodun/Ifelodun">Irepodun/Ifelodun</option>
                                    <option value="Ise/Orun">Ise/Orun</option>
                                    <option value="Moba">Moba</option>
                                    <option value="Oye">Oye</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">
                                    Delivery address
                                </label>
                                <textarea
                                    value={createPlanForm.deliveryAddress}
                                    onChange={(e) => setCreatePlanForm({...createPlanForm, deliveryAddress: e.target.value})}
                                    placeholder="Enter your full delivery address..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-700 rounded-lg  text-slate-600 text-sm  resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-3">
                                    Food preferences
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['Rice', 'Yam', 'Tomatoes', 'Vegetables', 'Beans', 'Palm Oil', 'Pepper', 'Eggs', 'Garri', 'Groundnut Oil', 'Onions', 'Fish'].map(food => (
                                        <label key={food} className="flex items-center gap-2 cursor-pointer text-xs text-slate-500">
                                            <input
                                                type="checkbox"
                                                checked={createPlanForm.foodPreferences.includes(food)}
                                                onChange={() => handleFoodToggle(food)}
                                                className="w-4 h-4 accent-emerald-800 rounded"
                                            />
                                            <span>{food}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowCreatePlanModal(false)}
                                    className="flex-1 px-6 py-2.5 border border-gray-600 rounded-xl hover:border-gray-300 text-slate-600 hover:bg-gray-300 text-sm font-semibold transition-all duration-1000 hover:scale-110"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreatePlan}
                                    className="flex-1 px-6 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-1000 hover:scale-115"
                                >
                                    Create plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Money Modal */}
            {showAddMoneyModal && selectedPlan && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-100 border rounded-2xl max-w-md w-full shadow-2xl">
                        <div className="border-b border-slate-300 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-600">
                                    Add money to savings
                                </h3>
                                <p className="text-[13px] text-slate-500">
                                    {selectedPlan.planName || 'Food Savings'}
                                </p>
                            </div>
                            <button 
                                onClick={() => {
                                    setShowAddMoneyModal(false);
                                    setSelectedPlan(null);
                                }}
                                className="text-slate-400 hover:text-slate-200"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                    Amount (₦)
                                </label>
                                <input
                                    type="number"
                                    value={addMoneyForm.amount}
                                    onChange={(e) => setAddMoneyForm({...addMoneyForm, amount: e.target.value})}
                                    placeholder="Enter amount"
                                    className="w-full px-4 py-2.5 border border-slate-700 rounded-lg  text-slate-800 text-sm  "
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {quickAmounts.map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setAddMoneyForm({...addMoneyForm, amount: amount.toString()})}
                                        className="px-4 py-2 border border-slate-700 rounded-lg text-xs font-medium text-slate-900 hover:bg-gray-400 transition-colors"
                                    >
                                        ₦{amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-3">
                                    Payment method
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setAddMoneyForm({...addMoneyForm, paymentMethod: 'Card'})}
                                        className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 text-xs transition-all ${
                                            addMoneyForm.paymentMethod === 'Card'
                                                ? 'border-emerald-500 bg-emerald-500/10 text-slate-900'
                                                : 'border-slate-700 hover:border-slate-500 text-slate-700'
                                        }`}
                                    >
                                        <CreditCard 
                                            size={22} 
                                            className={addMoneyForm.paymentMethod === 'Card' ? 'text-emerald-900' : 'text-slate-600'} 
                                        />
                                        <span className="font-medium">Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAddMoneyForm({...addMoneyForm, paymentMethod: 'Transfer'})}
                                        className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 text-xs transition-all ${
                                            addMoneyForm.paymentMethod === 'Transfer'
                                                ? 'border-emerald-500 bg-emerald-500/10 text-slate-900'
                                                : 'border-slate-700 hover:border-slate-500 text-slate-700'
                                        }`}
                                    >
                                        <Smartphone 
                                            size={22} 
                                            className={addMoneyForm.paymentMethod === 'Transfer' ? 'text-emerald-900' : 'text-slate-600'} 
                                        />
                                        <span className="font-medium">Transfer</span>
                                    </button>
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-700 bg-gray-300  px-3 py-2 rounded-lg">
                                Your savings will be used to purchase fresh food items directly from local farmers in Ekiti State.
                            </p>

                            <button
                                onClick={handleAddMoney}
                                className="w-full py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-colors"
                            >
                                Deposit ₦{addMoneyForm.amount ? parseFloat(addMoneyForm.amount).toLocaleString() : '0'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
