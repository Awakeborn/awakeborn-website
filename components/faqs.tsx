export default function Faqs() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 py-12 md:py-20 lg:border-0 lg:pt-0">
          {/* Section header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight animate-fade-in-up mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          {/* Faqs */}
          <ul className="grid gap-8 md:grid-cols-2 lg:gap-y-12 xl:gap-x-16 rounded-3xl bg-gray-950/80 border border-purple-900/40 shadow-2xl backdrop-blur-xl p-8 md:p-12 animate-fade-in-up ring-1 ring-purple-500/20">
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                What payment options does Open PRO accept?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                Open PRO accepts all major credit cards, including Visa,
                MasterCard, American Express, and Discover, as well as PayPal
                for added convenience.
              </p>
            </li>
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                Do I need to be a user to view my data?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                Yes, you must be a registered user and logged into your account
                to access and view your data securely. This ensures your data
                privacy and protection.
              </p>
            </li>
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                What if I want to cancel?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                If you wish to cancel your account, you can do so anytime
                through the account settings page. Your cancellation will take
                effect in no more than 7 business days.
              </p>
            </li>
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                What happens if I hit my usage limit?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                If you reach your usage limit, your service will be temporarily
                paused until the start of the next billing cycle. You can
                upgrade to a higher plan if needed.
              </p>
            </li>
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                Do you offer a discount for non-profits?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                Yes, we provide special discounted rates for non-profit
                organizations. Please contact our support team with your
                credentials to apply for the discount.
              </p>
            </li>
            <li className="animate-fade-in-up transition-all duration-200 hover:scale-[1.025] hover:shadow-xl hover:bg-gray-900/80 rounded-2xl p-4">
              <h4 className="mb-2 font-nacelle text-lg font-semibold text-gray-200">
                Will my data be private and safe?
              </h4>
              <p className="text-[1rem] text-indigo-200/65">
                Yes, your data is stored securely and is protected with advanced
                encryption methods. We follow industry-standard practices to
                ensure your privacy and data safety.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
