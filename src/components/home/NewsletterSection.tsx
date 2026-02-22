export default function NewsletterSection() {
    return (
        <section className="py-20 bg-[#1A1A1A] text-white overflow-hidden relative">
            {/* Texture bg */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                    Rejoignez la <span className="text-[#006233]">Famille</span> DZCRAFTDESIGN
                </h2>
                <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
                    Inscrivez-vous pour recevoir en avant-première nos nouvelles collections et être informé de notre présence au Salon de l&apos;Algérie à Lyon.
                </p>

                <form className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto shadow-2xl" id="newsletter-form">
                    <input
                        type="email"
                        placeholder="Votre adresse email"
                        className="flex-1 px-6 py-4 bg-white text-[#1A1A1A] focus:outline-none text-sm"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#006233] px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#004d27] transition-colors"
                    >
                        S&apos;inscrire
                    </button>
                </form>

                <p className="mt-8 text-xs text-gray-500 italic">
                    * En vous inscrivant, vous acceptez de recevoir nos actualités. Vous pouvez vous désinscrire à tout moment.
                </p>
            </div>
        </section>
    );
}
