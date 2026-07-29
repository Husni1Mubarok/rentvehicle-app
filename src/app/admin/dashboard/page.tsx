import React from 'react';

export default function AdminDashboardPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-800 p-8 text-white">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        {/* Future Super Admin link */}
        {/* <a href="/admin/super" className="text-sm underline">Super Admin Panel</a> */}
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <p className="text-sm opacity-80">Placeholder for key metrics.</p>
        </article>
        <article className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Manage Vehicles</h2>
          <p className="text-sm opacity-80">CRUD actions for vehicle inventory.</p>
        </article>
        <article className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-sm opacity-80">Admins & Super Admins.</p>
        </article>
      </div>
    </section>
  );
}
