// components/Layout.tsx
import React from 'react'
import Banners from './Banners'
import Footer from './Footer'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Banners />
      <main className="flex-grow px-4 py-8"> {/* Add padding here */}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;
