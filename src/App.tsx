/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { INITIAL_PRODUCTS } from './data/products';
import { Product } from './types';
import { Navbar, NavPage } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TradePage } from './pages/TradePage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CoverageCalculatorModal } from './components/CoverageCalculatorModal';
import { RoomSimulatorModal } from './components/RoomSimulatorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CartToastNotification } from './components/CartToastNotification';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { SHOWROOM_CONTACT } from './data/products';

function MainApp() {
  // Page Routing State with Hash fallback
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    const hash = window.location.hash.replace('#', '') as NavPage;
    if (['home', 'catalogue', 'about', 'contact', 'trade'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Sync hash with browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavPage;
      if (['home', 'catalogue', 'about', 'contact', 'trade'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Catalogue filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLook, setSelectedLook] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');

  const handleFilterNavigate = (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
    size?: string;
  }) => {
    if (filters.category) setSelectedCategory(filters.category);
    if (filters.technology) setSelectedTechnology(filters.technology);
    if (filters.look) setSelectedLook(filters.look);
    if (filters.destination) setSelectedDestination(filters.destination);
    navigateTo('catalogue');
  };

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorSelectedProduct, setCalculatorSelectedProduct] = useState<Product | undefined>(undefined);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorTileRef, setSimulatorTileRef] = useState<string | undefined>(undefined);
  const [simulatorRoomId, setSimulatorRoomId] = useState<string | undefined>(undefined);

  const handleOpenCalculatorWithProduct = (product: Product) => {
    setCalculatorSelectedProduct(product);
    setIsCalculatorOpen(true);
  };

  const handleOpenSimulator = (tileRef?: string, roomId?: string) => {
    setSimulatorTileRef(tileRef);
    setSimulatorRoomId(roomId);
    setIsSimulatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] flex flex-col font-sans">
      {/* Sticky Top Header Navigation with Architectural Mega-Menus */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCalculator={() => {
          setCalculatorSelectedProduct(undefined);
          setIsCalculatorOpen(true);
        }}
        onOpenSimulator={handleOpenSimulator}
        onFilterNavigate={handleFilterNavigate}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                products={INITIAL_PRODUCTS}
                onNavigateToCatalogue={() => navigateTo('catalogue')}
                onNavigateToAbout={() => navigateTo('about')}
                onNavigateToContact={() => navigateTo('contact')}
                onNavigateToTrade={() => navigateTo('trade')}
                onOpenCalculator={() => {
                  setCalculatorSelectedProduct(undefined);
                  setIsCalculatorOpen(true);
                }}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenCalculatorWithProduct={handleOpenCalculatorWithProduct}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  navigateTo('catalogue');
                }}
                onOpenSimulatorModal={handleOpenSimulator}
                onFilterCatalogue={handleFilterNavigate}
              />
            )}

            {currentPage === 'catalogue' && (
              <CataloguePage
                products={INITIAL_PRODUCTS}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLook={selectedLook}
                onLookChange={setSelectedLook}
                selectedTechnology={selectedTechnology}
                onTechnologyChange={setSelectedTechnology}
                selectedDestination={selectedDestination}
                onDestinationChange={setSelectedDestination}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onOpenCalculatorWithProduct={handleOpenCalculatorWithProduct}
                onOpenCalculator={() => {
                  setCalculatorSelectedProduct(undefined);
                  setIsCalculatorOpen(true);
                }}
                onOpenSimulator={handleOpenSimulator}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigateToCatalogue={() => navigateTo('catalogue')}
                onNavigateToContact={() => navigateTo('contact')}
              />
            )}

            {currentPage === 'contact' && <ContactPage />}

            {currentPage === 'trade' && <TradePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Quick Concierge */}
      <aside aria-label="Support and Quick Contact" className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
        <a
          href={`https://wa.me/${SHOWROOM_CONTACT.whatsappPhone}?text=Hello%20Bikomax%20Eldoret,%20I%20am%20inquiring%20about%20architectural%20building%20supplies.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 group"
          title="Direct WhatsApp Inquiries (+254 20 230 859)"
          aria-label="Direct WhatsApp Inquiries"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider hidden group-hover:inline pr-1">
            WhatsApp Desk
          </span>
        </a>
      </aside>

      {/* Slide-Out Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Non-intrusive Floating Add Notification */}
      <CartToastNotification />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCoverageTool={() => {
          if (selectedProduct) {
            setCalculatorSelectedProduct(selectedProduct);
          }
          setIsCalculatorOpen(true);
        }}
        onOpenSimulator={handleOpenSimulator}
      />

      {/* Multi-Room Coverage Estimator Modal */}
      <CoverageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={INITIAL_PRODUCTS}
        selectedProduct={calculatorSelectedProduct}
      />

      {/* 3D Interactive Room Simulator Studio Modal */}
      <RoomSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        products={INITIAL_PRODUCTS}
        initialTileRef={simulatorTileRef}
        initialRoomId={simulatorRoomId}
        onOpenCalculatorWithProduct={handleOpenCalculatorWithProduct}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('catalogue');
        }}
        onOpenCalculator={() => {
          setCalculatorSelectedProduct(undefined);
          setIsCalculatorOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
