"use client";

import Navbar from "@/components/Navbar";

export default function Favorites() {
  return (
    <main>
      <Navbar />
      <div className="px-8 py-8">
        <p>❤️ Here are your favorite recipes.</p>
      </div>
    </main>
  );
}
