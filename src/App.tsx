/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { BikomaxLogo } from './components/BikomaxLogo';
import { Product } from './types';
import { getProducts } from './services/api';
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
import { MessageCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { SHOWROOM_CONTACT, INITIAL_PRODUCTS } from './data/products';

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
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLook, setSelectedLook] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');

  const fetchBackendProducts = () => {
    setIsLoadingProducts(true);
    setBackendError(null);
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
          setBackendError(null);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      })
      .catch((err: any) => {
        console.warn('Backend fetch failed, using fallback catalog:', err);
        setProducts((prev) => (prev.length > 0 ? prev : INITIAL_PRODUCTS));
        setBackendError(err.message || 'Failed to fetch products from backend server.');
      })
      .finally(() => {
        setIsLoadingProducts(false);
      });
  };

  useEffect(() => {
    fetchBackendProducts();
  }, []);

  const handleFilterNavigate = (filters: {
    category?: string;
    technology?: string;
    look?: string;
    destination?: string;
    size?: string;
  }) => {
    if (filters.category) {
      setSelectedCategory(filters.category);
      setSelectedTechnology(filters.technology || 'All');
      setSelectedLook(filters.look || 'All');
      setSelectedDestination(filters.destination || 'All');
    } else {
      if (filters.technology) setSelectedTechnology(filters.technology);
      if (filters.look) setSelectedLook(filters.look);
      if (filters.destination) setSelectedDestination(filters.destination);
    }
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

  // 1. Strict Error Guard: If backend error exists and no products can be displayed, show the full-screen error screen
  if (backendError && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0C0D0F] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="max-w-md w-full bg-[#15161A] border border-red-900/60 rounded-xl p-8 shadow-2xl flex flex-col items-center animate-fade-in">
          {/* Logo */}
          <div className="mb-6">
            <BikomaxLogo variant="light" size="lg" className="w-auto" />
          </div>

          {/* Error Icon */}
          <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-500 mb-5 shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white mb-2">
            Something Went Wrong
          </h1>
          <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
            We are unable to load store specifications and product data from the backend server. The website cannot be displayed until backend data is successfully retrieved.
          </p>

          <div className="w-full bg-[#0C0D0F] border border-neutral-800 rounded p-3 text-left font-mono text-xs text-red-400 mb-6 break-words overflow-x-auto max-h-36">
            <span className="text-neutral-500 block text-[10px] uppercase font-sans font-semibold mb-1">
              Error Details:
            </span>
            {backendError}
          </div>

          <button
            type="button"
            onClick={fetchBackendProducts}
            disabled={isLoadingProducts}
            className="w-full py-3 px-6 bg-red-700 hover:bg-red-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingProducts ? 'animate-spin' : ''}`} />
            <span>{isLoadingProducts ? 'Reconnecting to Backend...' : 'Retry Connection'}</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Initial Loading Guard: Show ONLY a full-screen loading screen until data arrives
  if (isLoadingProducts && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0C0D0F] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="flex flex-col items-center max-w-sm">
          <BikomaxLogo variant="light" size="lg" className="w-auto mb-8 animate-pulse" />
          <div className="w-9 h-9 border-2 border-neutral-700 border-t-amber-500 rounded-full animate-spin mb-4" />
          <h2 className="text-xs font-semibold tracking-widest text-neutral-200 uppercase">
            Connecting to Bikomax Depot
          </h2>
          <p className="text-[11px] text-neutral-500 mt-1">
            Loading live architectural catalogue specifications...
          </p>
        </div>
      </div>
    );
  }

  // 3. Empty Data Guard: If loaded but 0 products returned and no error, do not render broken shell
  if (!isLoadingProducts && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0C0D0F] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full bg-[#15161A] border border-neutral-800 rounded-xl p-8 shadow-2xl flex flex-col items-center">
          <BikomaxLogo variant="light" size="lg" className="w-auto mb-6" />
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">No Product Data Found</h2>
          <p className="text-xs text-neutral-400 mb-6">
            The backend is reachable, but no product records were found for this store.
          </p>
          <button
            type="button"
            onClick={fetchBackendProducts}
            className="w-full py-3 px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Store</span>
          </button>
        </div>
      </div>
    );
  }

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
        products={products}
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
                products={products}
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
                  setSelectedTechnology('All');
                  setSelectedLook('All');
                  setSelectedDestination('All');
                  navigateTo('catalogue');
                }}
                onOpenSimulatorModal={handleOpenSimulator}
                onFilterCatalogue={handleFilterNavigate}
              />
            )}

            {currentPage === 'catalogue' && (
              <CataloguePage
                products={products}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedTechnology('All');
                  setSelectedLook('All');
                  setSelectedDestination('All');
                }}
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
                backendError={backendError}
                onRetry={fetchBackendProducts}
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
        products={products}
        selectedProduct={calculatorSelectedProduct}
      />

      {/* 3D Interactive Room Simulator Studio Modal */}
      <RoomSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        products={products}
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
