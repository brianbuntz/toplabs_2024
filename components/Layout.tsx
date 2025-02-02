// components/Layout.tsx
import React from "react";
import Banners from "./Banners";
import Footer from "./Footer";
import GlobalSearch from "./GlobalSearch";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Banners />
      <GlobalSearch />
      <main className="flex-grow px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
