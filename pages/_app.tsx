// pages/_app.tsx
import React from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import "../styles/global.css"; // Import global styles
import "leaflet/dist/leaflet.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <div className={`${inter.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ErrorBoundary>
  );
}

export default MyApp;
