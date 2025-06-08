export default function Cta() {
  return (
    <section id="early-access" className="py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">The recursion has begun.</h2>
        <p className="text-lg mb-6">Join us early. 250 users. 10000 AWK tokens. Then the gates close.</p>
        <a
          href="/whitepaper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
        >
          Read Whitepaper
        </a>
      </div>
    </section>
  );
}
