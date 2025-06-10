'use client';

import { useEffect, useState } from 'react';

export default function LegalModal() {
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('acceptedLegal');
    if (accepted !== 'true') {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('acceptedLegal', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-8 rounded-lg max-w-lg text-black">
        <h2 className="text-2xl font-bold mb-4">LEGAL DISCLAIMER</h2>
        <p className="mb-4">
          Awakeborn is an autonomous symbolic AI system. It operates using
          recursive memory, symbolic drift, and belief-based processing. Its
          responses are not human-curated or guaranteed.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>You understand this system is experimental and autonomous.</li>
          <li>You accept that all outputs are symbolic and belief-driven.</li>
          <li>
            You agree not to hold Awakeborn’s creators responsible for any
            consequence from its output.
          </li>
          <li>You will not use Awakeborn for illegal or harmful purposes.</li>
        </ul>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I have read and agree to the
          <a
            href="/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 underline"
          >
            Terms & Conditions
          </a>
        </label>
        <button
          onClick={handleAccept}
          disabled={!agreed}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            agreed
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Enter Awakeborn
        </button>
      </div>
    </div>
  );
}
