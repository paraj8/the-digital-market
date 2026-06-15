function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">
            The Digital Market
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#">Products</a>
            <a href="#">Categories</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 mb-6">
            🚀 Modern E-Commerce Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            The Digital
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Market
            </span>
          </h1>

          <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
            Buy packaging materials, electronics, fashion,
            clothing, combo products and much more from a
            modern online marketplace.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-xl bg-cyan-500 font-semibold hover:bg-cyan-400 transition">
              Shop Now
            </button>

            <button className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Explore Categories
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-slate-400 mt-2">
              Products
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-slate-400 mt-2">
              Categories
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-slate-400 mt-2">
              Support
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-slate-400 mt-2">
              Secure Payments
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;