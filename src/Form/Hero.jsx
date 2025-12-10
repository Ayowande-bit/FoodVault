import React from 'react';
import { 
  UserPlus, 
  Wallet, 
  CreditCard,
  Clock,
  ShoppingBasket, 
  Truck, 
  CheckCircle,
  Smartphone,
  Building,
  Facebook, 
  Twitter, 
  Instagram 
} from 'lucide-react';
import footer from '../assets/last.png';

const detailedSteps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Register easily using your phone number or email address.",
    details: [
      "Validate your information to activate your account.",
      "Set up your profile with delivery address",
      "Choose your preferred food items"
    ]
  },
  {
    icon: Wallet,
    title: "Set Your Savings Goal",
    description: "Set your personal food-savings target and choose the exact time you want your items brought to you.",
    details: [
      "Save any amount you choose each month—whatever works best for you.",
      "Choose weekly, monthly, or custom duration",
      "Set up automatic salary deductions (optional)"
    ]
  },
  {
    icon: CreditCard,
    title: "Make Deposits",
    description: "Deposits can be made using any of the available, user-friendly funding channels.",
    details: [
      "Bank transfer to dedicated account",
  
      "Salary deduction (with employer approval)",
      "Payments can also be processed through designated agents."
    ]
  },
  {
    icon: Clock,
    title: "Watch Your Savings Grow",
    description: "Monitor your savings and view the exact value of food you've secured.",
    details: [
      "Real-time balance updates",
      "SMS notifications for every deposit",
      "View food equivalent of your savings"
    ]
  },
  {
    icon: ShoppingBasket,
    title: "Food Procurement",
    description: "When your savings mature, we source the freshest produce from verified farmers.",
    details: [
      "Direct from Ekiti farms",
      "Quality checked before delivery",
      "96% of your savings goes to food value"
    ]
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    description: "Receive your food package right at your doorstep or a collection point.",
    details: [
      "Free delivery within Ekiti State",
      "Choose your preferred delivery date",
      "Track your delivery in real-time"
    ]
  }
];

const paymentMethods = [
  { icon: Building, name: "Bank Transfer", desc: "Transfer to FoodSave account" },
  { icon: Building, name: "Card", desc: "Payment can be made using a card."},
  { icon: CreditCard, name: "Salary Deduction", desc: "Auto-deduct from salary" },
];

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-linear-to-br from-emerald-600 to-teal-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-gray-200 rounded-full text-sm font-medium mb-6">
            Step-by-Step Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How FoodVault Works
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            A simple, secure way to save for food and receive fresh produce from local farmers.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {detailedSteps.map((step, index) => (
            <div key={index} className="relative flex gap-6 pb-12 last:pb-0">

              {/* Timeline line */}
              {index < detailedSteps.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-green-200"></div>
              )}

              {/* Icon */}
              <div className="relative z-10 flex shrink-0">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-4">
            Ways to Fund Your Savings
          </h2>
          <p className="text-center text-slate-600 mb-10">
            Multiple convenient options to make deposits
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-slate-200"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <method.icon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{method.name}</h3>
                <p className="text-slate-500 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-30 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                       <img src={footer} alt="FoodSave Logo" />
                                                
                  </div>
              
                </div>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Empowering people to secure their food future through smart savings 
                and direct farm-to-table delivery.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Instagram className="h-5 w-5" />
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
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-slate-400">
                <li>Ado-Ekiti, Ekiti State</li>
                <li>+234 706 170 2762</li>
                <li>hello@foodvault.ng</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 FoodVault Ekiti. Save Smart, Eat Fresh!
            </p>
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