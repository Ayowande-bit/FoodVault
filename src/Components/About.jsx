import React from "react";
import image1 from "../assets/side.png"
import vegetables from "../assets/vegetables.jpg"
import farmer from "../assets/download.jpg"
import { ArrowRight, Twitter, Instagram,Facebook } from "lucide-react";
import footer from "../assets/last.png"


export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="px-6 py-20 md:px-12 md:py-32 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Meet the All-in-one platform revolutionizing how you save and enjoy your favorite groceries
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Food Vault makes saving for your preferred food items seamless and flexible.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          <Stat number={<span className="text-green-800">200+</span>} text="Daily register from new users" />
          <Stat number={<span className="text-green-800">1.5K+</span>} text="Food Vault subscribers" />
          <Stat number={<span className="text-green-800">1000+</span>} text="Listed food items" />
          <Stat number={<span className="text-green-800">1.5K+</span>} text="Successful food deliveries" />
        </div>


            <a href="/log">
        <button className="bg-linear-to-r from-green-600 to-teal-700 hover:from-green-800 hover:to-teal-900 text-white px-6 py-3 rounded-lg text-lg">
          Start Saving Now
        </button>
        </a>
      </section>

      {/* Purpose Section */}
      <section className="px-6 py-20 md:px-12 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-500 to-teal-800">
              Driven by Purpose.<br />Proven by Your Trust.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Food Vault empowers individuals to achieve financial comfort through food savings. 
              Our platform is built with transparency, reliability, and customer satisfaction in mind.
            </p>
          </div>

          <div className="space-y-8">
            <InfoBox title={<span className="text-green-900 font-semibold">Mission</span>} text="Our mission is to make saving for food simple, accessible, and consistent." />
            <InfoBox title={<span className="text-green-900">Vision</span>} text="To become the #1 platform for grocery savings and food access across Africa." />
          </div>
        </div>
      </section>

      {/* About Section with Organized Images */}
      <section className="px-6 py-20 md:px-12 md:py-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Images arranged in grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src={image1}
              alt="Woman with groceries"
              className="rounded-2xl w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop"
              alt="Fresh fruits"
              className="rounded-2xl w-full"
            />
            <img
              src={vegetables}
              alt="Healthy vegetables"
              className="rounded-2xl w-full"
            />
            <img
              src={farmer}
              alt="Farmer harvesting"
              className="rounded-2xl w-full"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Food Vault is here to change how you save and access your favorite groceries.
              Set savings goals, reach targets faster, enjoy flexible plans, and gain access to affordable food.
            </p>

            <a href="/log">
            <button className="bg-emerald-700 hover:bg-teal-700 text-white px-4 py-2 rounded-lg">
              Get Started
            </button>
            </a>
          </div>
        </div>
      </section>

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

function Stat({ number, text }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{number}</div>
      <div className="text-sm md:text-base text-gray-600">{text}</div>
    </div>
  );
}

function InfoBox({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="text-orange-600 font-semibold text-sm mb-2 uppercase">{title}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
