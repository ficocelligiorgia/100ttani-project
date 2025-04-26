import React from "react";

const Info = () => {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors">

      
      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/cover-bike.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            100ttani Moto Club
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Passione, strada, fratellanza.
          </p>
        </div>
      </section>

      
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-red-600 mb-6 border-b-2 border-red-600 inline-block pb-1">
          Chi siamo
        </h2>
        <p className="text-lg leading-relaxed">
          I <strong>100ttani Moto Club</strong> sono nati a Roma, uniti dalla
          passione per le due ruote e lo spirito di gruppo. Ogni uscita è un
          viaggio, ogni curva una storia. Nessuna gerarchia rigida, solo
          fratelli e sorelle di strada.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-red-500 mb-4">
            👥 Amministratori del gruppo
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-lg text-gray-800 dark:text-gray-200">
            <li className="hover:text-red-500 transition"> Luca</li>
            <li className="hover:text-red-500 transition"> Francesco</li>
            <li className="hover:text-red-500 transition"> Michela</li>
            <li className="hover:text-red-500 transition"> Luis</li>
            <li className="hover:text-red-500 transition"> Riccardo</li>
          </ul>
        </div>
      </section>

      
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-600 inline-block pb-1">
             Dove ci trovi
          </h2>
          <p className="text-lg leading-relaxed">
            La nostra casa è <strong>Roma</strong>, ma appena accendiamo i
            motori ci trovi ovunque: Castelli Romani, Terminillo, Toscana, e
            ogni strada che merita di essere percorsa. I nostri giri partono
            spesso da un bar o benzinaio... e finiscono con un sorriso.
          </p>
        </div>
      </section>

      
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-600 inline-block pb-1">
             Contatti
          </h2>
          <p className="text-lg mb-4">
            Entra in contatto con noi o unisciti alla prossima uscita:
          </p>
          <ul className="space-y-4 text-lg">
            <li>
              📱{" "}
              <a
                href="https://chat.whatsapp.com/EtEtsQ9G6G75kI0L7fr8k4?utm_campaign=linkinbio&utm_medium=referral&utm_source=later-linkinbio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline transition"
              >
                Gruppo WhatsApp
              </a>
            </li>
            <li>
              📸{" "}
              <a
                href="https://www.instagram.com/100ttani_motoclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 hover:underline transition"
              >
                Pagina Instagram
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Info;
