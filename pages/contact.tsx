// pages/contact.tsx

import React from "react";
import Image from "next/image";

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="relative mb-8">
        <Image
          src="https://www.rdworldonline.com/wp-content/uploads/2024/06/Firefly-A-professional-design-engineer-in-a-modern-laboratory-setting-working-on-early-stage-94790.jpg"
          alt="Professional Design Engineer"
          width={1920} // Replace with your image's actual width
          height={400} // Replace with your image's actual height
          className="w-full h-[400px] object-cover rounded-lg"
          priority // Optional: Use if this image is above the fold
        />
        <span className="text-xs text-gray-400 mt-1 block">
          &copy; Firefly / Adobe Stock
        </span>
      </div>

      <p className="mb-4 leading-relaxed">
        We&#39;d love to hear from you! Whether you have a question about our
        content, want to collaborate, or need assistance, please don&#39;t
        hesitate to reach out.
      </p>
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Information:</h2>
        <p>
          Email:{" "}
          <a
            href="mailto:bbuntz@wtwhmedia.com"
            className="text-blue-400 underline"
          >
            bbuntz@wtwhmedia.com
          </a>
        </p>
        <p>
          Address: WTWH Media, LLC, 1111 Superior Ave #2600, Cleveland, OH
          44114, USA
        </p>
      </div>
    </div>
  );
};

export default Contact;
