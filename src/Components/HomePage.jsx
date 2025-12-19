import React from 'react';
import { 
  ArrowRight, PiggyBank, Leaf, Truck, Shield, Home, User, 
  Facebook, Twitter, Instagram 
} from 'lucide-react';
import BackgroundImage from '../assets/Background.jpg';
import footer from '../assets/last.png';
import { TfiEmail } from "react-icons/tfi";

export default function HomePage() {
  // --------------------
  // Features Section Data
  // --------------------
  const features = [
    {
      icon: PiggyBank,
      title: 'Smart Savings',
      description: 'Easily allocate part of your salary for a reliable source of healthy food.'
    },
    {
      icon: Leaf,
      title: 'Farm Fresh',
      description: 'Enjoy farm-fresh food sourced directly from Ekiti farmers'
    },
    {
      icon: Truck,
      title: 'Home Delivery',
      description: 'Your savings grow, and your fresh farm produce comes straight to your home.'
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Track your money every step of the way with clarity.'
    }
  ];

  // --------------------
  // How It Works Data
  // --------------------
  const howItWorks = [
    {
      step: 1,
      title: 'Create a Plan',
      description: 'Set how much to save and how often.'
    },
    {
      step: 2,
      title: 'Save Regularly',
      description: 'Add funds to your savings at your preferred intervals.'
    },
    {
      step: 3,
      title: 'We Buy Food',
      description: 'Our team ensures fresh produce comes straight from the farm'
    },
    {
      step: 4,
      title: 'Get Delivered',
      description: 'Receive wholesome food at your home with ease.'
    }
  ];

  return (
    <div className="min-h-screen relative">

      {/* -------------------- */}
      {/* Hero Section */}
      {/* -------------------- */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={BackgroundImage} 
            alt="Fresh Nigerian produce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-emerald-800/80"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-blg font-shrikhand text-white leading-tight mb-6">
              Save Smart,
              <span className="block text-emerald-400">Eat Fresh!</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed">
              Take control of your spending by setting aside a little from each paycheck. When the time comes, you'll get fresh farm produce 
              delivered right to your home. Helping you avoid financial pressure and stay prepared.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="/log">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg shadow-emerald-600 transition-all hover:scale-105 flex items-center justify-center w-full sm:w-auto">
                  Start Saving Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </a>
              <a href="/hero">
                <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl transition-all w-full sm:w-auto">
                  See How It Works
                </button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-white/80 text-sm">Secure Savings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Leaf className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-white/80 text-sm">Farm Fresh</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-white/80 text-sm">Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- */}
      {/* Features Section */}
      {/* -------------------- */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose FoodVault?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
                  <feature.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- */}
      {/* How It Works Section */}
      {/* -------------------- */}
      <section className="px-4 py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- */}
      {/* CTA Section */}
      {/* -------------------- */}
      <section className="px-4 py-10 bg-linear-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Secure Your Food?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-emerald-100">
            Take charge of your food security alongside hundreds of others
          </p>
          <a href="/log">
            <button className="px-10 py-5 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2">
              Create Your Savings Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </a>
        </div>
      </section>

      {/* -------------------- */}
      {/* Mobile Bottom Navigation */}
      {/* -------------------- */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md hidden z-50">
        <ul className="flex justify-around items-center p-2">
          <li>
            <a href="#home" className="flex flex-col items-center text-green-700">
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </a>
          </li>
          <li>
            <a href="#farm" className="flex flex-col items-center text-green-700">
              <Leaf className="w-6 h-6" />
              <span className="text-xs">Farm</span>
            </a>
          </li>
          <li>
            <a href="#delivery" className="flex flex-col items-center text-green-700">
              <Truck className="w-6 h-6" />
              <span className="text-xs">Delivery</span>
            </a>
          </li>
          <li>
            <a href="#account" className="flex flex-col items-center text-green-700">
              <User className="w-6 h-6" />
              <span className="text-xs">Account</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* -------------------- */}
      {/* Footer */}
      {/* -------------------- */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-38 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                  
                                <img src={footer} alt="FoodSave Logo" />
                            
                </div>
                
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Empowering people to secure their food future through smart savings 
                and direct farm-to-table delivery.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                 <a href="https://mail.google.com/mail/u/0/?pli=1#inbox" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <TfiEmail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/hero" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/admin" className='hover:text-white transition-colors'>Admin</a></li>
                
                 
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-slate-400">
                <li>Ado-Ekiti, Ekiti State</li>
                <li>+234 706 170 2762</li>
                <li>foodvault@gmail.com</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 FoodVault Ekiti. Save Smart, Eat Fresh! .</p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
