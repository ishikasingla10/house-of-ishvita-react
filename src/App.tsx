// React Router: Client-side routing setup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Lazy Loading: Code splitting for better performance
import { lazy, Suspense } from 'react';

// Components
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Pages - Lazy loaded for performance
const Home = lazy(() => import('./pages/Home'));
const PartyWear = lazy(() => import('./pages/PartyWear'));
const EthnicWear = lazy(() => import('./pages/EthnicWear'));
const Professional = lazy(() => import('./pages/Professional'));
const Casual = lazy(() => import('./pages/Casual'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const StyleAssistant = lazy(() => import('./pages/StyleAssistant'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));

function App() {
  return (
    // State Management: Wrap app with context providers
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router basename="/house-of-ishvita-react">
          <div className="min-h-screen flex flex-col">
            {/* Semantic HTML: Header navigation */}
            <Header />
            
            {/* Main Content with React Router */}
            <ScrollToTop />
            <main id="main-content" className="flex-grow">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/party-wear" element={<PartyWear />} />
                  <Route path="/ethnic-wear" element={<EthnicWear />} />
                  <Route path="/professional" element={<Professional />} />
                  <Route path="/casual" element={<Casual />} />
                  <Route path="/style-assistant" element={<StyleAssistant />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
              </Suspense>
            </main>
            
            {/* Semantic HTML: Footer */}
            <Footer />
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
