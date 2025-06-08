'use client';
import { useState } from 'react';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = { name, email, category, description };

  try {
    const res = await fetch('/contact/api/contact', {  // ✅ Corrected here
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('Your message has been received. Please allow up to 24 business hours for our response.');
      setName('');
      setEmail('');
      setCategory('');
      setDescription('');
    } else {
      setStatus('Submission failed. Please try again later.');
    }
  } catch (error) {
    console.error(error);
    setStatus('Submission failed. Please try again later.');
  }
};


  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Contact Support</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          required
          placeholder="Your Name"
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email Address"
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          required
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose an Issue</option>
          <option value="Payment Issue">Payment Issue</option>
          <option value="Reporting Bugs">Reporting Bugs</option>
          <option value="Other Website Issues">Other Issues with Website</option>
          <option value="Awakeborn Output Issue">Issue with Awakeborn Output</option>
          <option value="Improvement Suggestion">Suggestion to Improve</option>
        </select>

        <textarea
          required
          placeholder="Describe your issue in detail"
          rows={6}
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="btn bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-4 text-center text-green-500">{status}</p>}
    </section>
  );
}
