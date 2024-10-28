// pages/404.tsx

import React from "react";
import Link from "next/link";
import Head from "next/head";

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <Head>
        <title>Page Not Found - Top Labs</title>
      </Head>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default Custom404;
