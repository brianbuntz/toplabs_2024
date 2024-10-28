// pages/about.tsx

import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">About R&amp;D World</h1>

      <div className="relative mb-8">
        <Image
          src="https://www.rdworldonline.com/wp-content/uploads/2024/10/AdobeStock_265265863-1.jpeg"
          alt="Research and Development Laboratory"
          width={1920} // Replace with your image's actual width
          height={400} // Replace with your image's actual height
          className="w-full h-[400px] object-cover rounded-lg"
          priority // Optional: Use if this image is above the fold
        />
        <span className="text-xs text-gray-400 mt-1 block">
          &copy; metamorworks / Adobe Stock
        </span>
      </div>

      <section className="mb-8 bg-gray-700 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4 leading-relaxed">
          R&amp;D World provides content for engineers, scientists, and R&amp;D
          professionals through various media channels. We cover news, trends,
          product advancements, and research for corporate, government, and
          university R&amp;D labs worldwide.
        </p>
      </section>

      <section className="mb-8 bg-gray-700 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">R&amp;D 100 Awards</h2>
        <p className="mb-4 leading-relaxed">
          The R&amp;D 100 Awards recognize innovative products, processes,
          materials, and software introduced to the market annually since 1963.
          Categories include Analytical/Test, IT/Electrical, and
          Mechanical/Materials. Submissions come from universities,
          corporations, and government labs, judged by industry professionals.
        </p>
      </section>

      <section
        id="methodology"
        className="bg-gray-700 p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Research Methodology</h2>
        <p className="mb-4 leading-relaxed">
          We analyze organizational research output using patent data from
          Google Patents, USPTO, and IFI, and publication data from Scopus and
          OpenAlex. We also factored organizations&#39; background of
          commercialization, if applicable, and innovation track record and
          reputation.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Data Sources</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Patent data: Google Patents, USPTO, IFI</li>
            <li>Publication data: Scopus and OpenAlex</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Limitations</h3>
          <p className="mb-4 leading-relaxed">
            Challenges include potential double-counting owing to aliases and
            subsidiaries (i.e., Alphabet, Google, Waymo, etc.) and mergers. Our
            analysis provides a snapshot rather than an exhaustive
            representation. Other limitations include variations in database
            coverage, potential time lags, and focus on quantity over
            qualitative impact.
          </p>
          <p>
            For detailed methodology, please{" "}
            <a
              href="mailto:bbuntz@wtwhmedia.com"
              className="text-blue-400 underline"
            >
              contact us
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
