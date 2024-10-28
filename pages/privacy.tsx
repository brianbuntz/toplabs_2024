import React from "react";

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 leading-relaxed">
        At R&amp;D World, we are committed to protecting your privacy and
        ensuring the security of your personal information.
      </p>
      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4 leading-relaxed">
        We collect information you provide directly to us, such as when you
        create an account, subscribe to our{" "}
        <a
          href="https://www.rdworldonline.com/enews-sign-up/"
          className="text-blue-400"
        >
          newsletter
        </a>
        , or contact us for support.
      </p>
      <h2 className="text-xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4 leading-relaxed">
        We use the information we collect to provide, maintain, and improve our
        services, to communicate with you, and to personalize your experience on
        our platform.
      </p>
      <p>
        For more detailed information about our privacy practices, please{" "}
        <a href="mailto:bbuntz@wtwhmedia.com" className="text-blue-400">
          contact us
        </a>
        .
      </p>
    </div>
  );
};

export default Privacy;
