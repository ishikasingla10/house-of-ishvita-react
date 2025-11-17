// Home Page Component - Enhanced UI
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=75&auto=format',
  ];
  
  // Preload hero images immediately for instant display
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animations using GSAP (falls back gracefully if GSAP not available)
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    try {
      const ctx = gsap.context(() => {
        // Hero titles entrance
        gsap.from('.hero-title', {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
        });

        // Subtitle and buttons
        gsap.from('.hero-subtitle, .hero-button', {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.15,
        });

        // Feature boxes and category cards
        gsap.from('.feature-box, .category-card .relative, .fade-in', {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.25,
        });
      }, rootRef);

      return () => ctx.revert();
    } catch (e) {
      // If GSAP fails for any reason, no-op (CSS fallbacks in place)
    }
  }, []);
  
  return (
    <div className="pt-20" ref={rootRef}>
      {/* Hero Section with Slider */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Fashion ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-5xl">
            <div className="mb-8">
              <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-4 drop-shadow-2xl fade-in slide-up delay-100 will-animate">
                House of
              </h1>
              <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-bold text-primary ml-0 md:ml-12 drop-shadow-2xl fade-in slide-up delay-200 will-animate">
                Ishvita
              </h1>
            </div>
            <p className="hero-subtitle text-xl md:text-3xl text-white mb-12 max-w-3xl mx-auto drop-shadow-lg font-light fade-in delay-300 will-animate">
              Personalized styling powered by AI. Discover your perfect look with mood-based recommendations and virtual try-ons.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              {/* Style Your Journey should navigate to the Style Assistant page */}
              <Link to="/style-assistant">
                <button className="hero-button px-10 py-5 bg-primary text-white rounded-full hover:bg-white hover:text-primary transition-all font-semibold text-lg shadow-2xl transform hover:scale-105 fade-in delay-400 will-animate">
                  Style Your Journey
                </button>
              </Link>

              {/* Explore Collections should jump to the Style Categories section on this page */}
              <a href="#style-categories">
                <button className="hero-button px-10 py-5 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-secondary transition-all font-semibold text-lg shadow-2xl border-2 border-white transform hover:scale-105 fade-in delay-450 will-animate">
                  Explore Collections
                </button>
              </a>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="feature-box p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 fade-in delay-500 will-animate h-full flex flex-col justify-start">
                <div className="text-5xl mb-4">✨</div>
                <h2 className="text-3xl font-bold text-white mb-3">AI Stylist</h2>
                <p className="text-white/90 text-lg">
                  Personalized recommendations based on your mood and body type
                </p>
              </div>
              
              <div className="feature-box p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 fade-in delay-550 will-animate h-full flex flex-col justify-start">
                <div className="text-5xl mb-4">👗</div>
                <h2 className="text-3xl font-bold text-white mb-3">Virtual Try-On</h2>
                <p className="text-white/90 text-lg">
                  See how outfits look with our interactive styling board
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
  <section id="style-categories" className="py-20 bg-gradient-to-b from-lightBg to-white px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-secondary mb-6 relative inline-block">
              Style Categories
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></div>
            </h2>
            <p className="text-xl md:text-2xl text-textLight mt-8 max-w-4xl mx-auto">
              From casual everyday looks to glamorous party wear,<br />
              find your perfect style across our curated collections
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <Link to="/party-wear" className="category-card group">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-4 fade-in delay-600 will-animate">
                <img
                  src="https://i.pinimg.com/736x/ce/4b/73/ce4b731d06b055c2ef80b03ad69bbf53.jpg"
                  alt="Party Wear"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">Party Wear</h3>
                  <p className="text-white/90 text-sm">Glamorous evening styles</p>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Trending
                </div>
              </div>
            </Link>
            
            <Link to="/ethnic-wear" className="category-card group">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-4 fade-in delay-650 will-animate">
                <img
                  src="https://i.pinimg.com/736x/c6/3f/a4/c63fa465148e0913096e5da96eda9503.jpg"
                  alt="Ethnic Wear"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">Ethnic Wear</h3>
                  <p className="text-white/90 text-sm">Traditional elegance</p>
                </div>
              </div>
            </Link>
            
            <Link to="/professional" className="category-card group">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-4 fade-in delay-700 will-animate">
                <img
                  src="https://i.pinimg.com/736x/29/9e/8b/299e8b5cf166dfcb09aef1beb3fb59af.jpg"
                  alt="Professional"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">Professional</h3>
                  <p className="text-white/90 text-sm">Corporate chic</p>
                </div>
              </div>
            </Link>
            
            <Link to="/casual" className="category-card group">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-4 fade-in delay-750 will-animate">
                <img
                  src="https://i.pinimg.com/1200x/63/04/71/630471e0cf4a251d50def863da64fc94.jpg"
                  alt="Casual Chic"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">Casual Chic</h3>
                  <p className="text-white/90 text-sm">Everyday comfort</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Collection */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-secondary">
                This Season's Must-Haves
              </h2>
              <p className="text-xl text-textLight leading-relaxed">
                Discover our handpicked collection of trending styles that will elevate your wardrobe. From timeless classics to bold statements, find pieces that speak to your unique style.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-lightBg px-6 py-3 rounded-full">
                  <span className="text-secondary font-semibold">✓ Premium Quality</span>
                </div>
                <div className="bg-lightBg px-6 py-3 rounded-full">
                  <span className="text-secondary font-semibold">✓ Fast Delivery</span>
                </div>
                <div className="bg-lightBg px-6 py-3 rounded-full">
                  <span className="text-secondary font-semibold">✓ Easy Returns</span>
                </div>
              </div>
              <Link to="/party-wear">
                <button className="mt-6 px-10 py-4 bg-secondary text-white rounded-full hover:bg-primary transition-colors font-semibold text-lg shadow-xl">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=60&auto=format&fm=webp"
                alt="Featured 1"
                className="w-full h-64 object-cover rounded-2xl shadow-lg fade-in delay-300 will-animate"
              />
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=60&auto=format&fm=webp"
                alt="Featured 2"
                className="w-full h-64 object-cover rounded-2xl shadow-lg mt-8 fade-in delay-350 will-animate"
              />
              <img
                src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=300&q=60&auto=format&fm=webp"
                alt="Featured 3"
                className="w-full h-64 object-cover rounded-2xl shadow-lg -mt-8 fade-in delay-400 will-animate"
              />
              <img
                src="https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=300&q=60&auto=format&fm=webp"
                alt="Featured 4"
                className="w-full h-64 object-cover rounded-2xl shadow-lg fade-in delay-450 will-animate"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Virtual Styling Section */}
      <section className="py-20 bg-gradient-to-b from-lightBg to-secondary px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6 fade-in delay-300 will-animate">
            Virtual Styling Board
          </h2>
          <p className="text-xl text-textLight mb-12">
            Experience fashion in a whole new way with AI-powered styling
          </p>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <h3 className="text-4xl font-bold text-secondary">Try Before You Buy</h3>
                <p className="text-lg text-textLight">
                  Our revolutionary AI technology lets you visualize outfits instantly. Upload your photo and see how different styles look on you!
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">AI-Powered Recommendations</h4>
                      <p className="text-textLight">Get personalized style suggestions based on your preferences</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">Mix & Match</h4>
                      <p className="text-textLight">Create complete looks by combining different pieces</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary">Save Your Favorites</h4>
                      <p className="text-textLight">Create a wishlist and share with friends</p>
                    </div>
                  </li>
                </ul>
                <button className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:shadow-2xl transition-all font-semibold text-xl transform hover:scale-105">
                  <Link to="/style-assistant" className="text-white">Start Styling Now</Link>
                </button>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=70&auto=format&fit=crop&fm=webp"
                  alt="Virtual Styling Interactive"
                  className="w-full rounded-2xl shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl">
                  <div className="text-4xl font-bold text-primary">AI</div>
                  <div className="text-sm text-textLight">Powered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold text-center text-secondary mb-16">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-lightBg p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-textLight mb-4 italic">
                "Absolutely love the collection! The quality is outstanding and the AI styling feature helped me find my perfect outfit."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Simran Patel</h4>
                  <p className="text-sm text-textLight">Fashion Enthusiast</p>
                </div>
              </div>
            </div>
            
            <div className="bg-lightBg p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-textLight mb-4 italic">
                "Fast delivery and amazing customer service! The ethnic collection is absolutely stunning. Will definitely shop again!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">AK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Ananya Kapoor</h4>
                  <p className="text-sm text-textLight">Regular Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-lightBg p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-textLight mb-4 italic">
                "The virtual try-on feature is a game changer! Made shopping so much easier. Highly recommend House of Ishvita!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">PD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Priya Desai</h4>
                  <p className="text-sm text-textLight">Style Blogger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-secondary px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Stay In Style
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get special offers, style tips, and exclusive previews
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-primary/50"
            />
            <button className="px-10 py-4 bg-primary text-white rounded-full hover:bg-white hover:text-secondary transition-colors font-semibold text-lg">
              Subscribe
            </button>
          </div>
          
          <p className="text-white/70 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
