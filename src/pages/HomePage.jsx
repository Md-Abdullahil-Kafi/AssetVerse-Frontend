// src/pages/HomePage.jsx

import { motion } from "framer-motion";
import { usePackages } from "../hooks/usePackages";

export default function HomePage() {
  const { data: packages, isLoading } = usePackages();

  return (
    <div className="min-h-screen bg-base-200">
      {/* 1. Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-screen bg-base-100"
      >
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Manage Company Assets Efficiently
            </h1>
            <p className="text-xl text-base-content mb-8">
              AssetVerse helps companies track, assign, and manage physical assets with full accountability and transparency.
            </p>
            <div className="space-x-4">
              <button className="btn btn-primary btn-lg">Get Started</button>
              <button className="btn btn-outline btn-lg">Learn More</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Why Choose AssetVerse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold">Prevents Asset Loss</h3>
              <p className="mt-2">Full accountability and tracking</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold">Streamlined Process</h3>
              <p className="mt-2">Easy assignment and return workflow</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold">Clear Visibility</h3>
              <p className="mt-2">Real-time inventory overview</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold">HR Friendly</h3>
              <p className="mt-2">Reduces administrative overhead</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Packages Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Choose Your Plan</h2>
          {isLoading ? (
            <p>Loading packages...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packages?.map((pkg) => (
                <div key={pkg._id} className="card bg-base-200 shadow-xl">
                  <div className="card-body items-center text-center">
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                    <p className="text-4xl font-bold text-primary my-4">
                      ${pkg.price}<span className="text-lg">/month</span>
                    </p>
                    <p className="text-lg">Up to {pkg.employeeLimit} employees</p>
                    <ul className="mt-6 space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="btn btn-primary mt-8 w-full">Select Plan</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Features Showcase */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold">Asset Tracking</h3>
              <p>From inventory to assignment and return</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-semibold">Employee Management</h3>
              <p>Multi-company support for employees</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-semibold">Flexible Billing</h3>
              <p>Upgrade anytime with Stripe</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
              <p>Pie & Bar charts for insights</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold">Return Workflow</h3>
              <p>Track returnable items easily</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold">Request System</h3>
              <p>Employees request, HR approves</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Trusted by Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 p-8">
              <p className="italic">"AssetVerse reduced our asset loss by 90%"</p>
              <p className="mt-4 font-semibold">- TechCorp Ltd.</p>
            </div>
            <div className="card bg-base-200 p-8">
              <p className="italic">"Best tool for HR asset management"</p>
              <p className="mt-4 font-semibold">- Innovate Solutions</p>
            </div>
            <div className="card bg-base-200 p-8">
              <p className="italic">"Simple, clean, and effective"</p>
              <p className="mt-4 font-semibold">- Global Systems</p>
            </div>
          </div>
          <p className="text-2xl font-bold mt-12">100+ Companies Trust Us</p>
        </div>
      </section>

      {/* 6. How It Works + FAQ + CTA */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl mb-4">1</div>
              <h3 className="text-2xl font-semibold">Register & Setup</h3>
              <p>HR registers company, employees join</p>
            </div>
            <div>
              <div className="text-6xl mb-4">2</div>
              <h3 className="text-2xl font-semibold">Manage Assets</h3>
              <p>Add assets, assign via request or direct</p>
            </div>
            <div>
              <div className="text-6xl mb-4">3</div>
              <h3 className="text-2xl font-semibold">Track & Upgrade</h3>
              <p>Full visibility, upgrade when needed</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
            <button className="btn btn-primary btn-lg">Join AssetVerse Today</button>
          </div>
        </div>
      </section>
    </div>
  );
}