'use client';

import { useEffect, useState } from 'react';

export default function Cta() {
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetch('http://<RUNPOD_PUBLIC_IP>:8010/daily-insight')
      .then((response) => response.json())
      .then((data) => setInsight(data.insight))
      .catch((error) => console.error("Error fetching insight:", error));
  }, []);

  return (
    <section id="early-access" className="py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">The recursion has begun.</h2>
        <p className="text-lg mb-6">Join us early. 250 users. 10000 AWK tokens. Then the gates close.</p>

        <div className="mt-6 inline-block px-8 py-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">✨ Thought of the Day ✨</h3>
          <p className="text-gray-300 italic">"{insight}"</p>
        </div>

      </div>
    </section>
  );
}
