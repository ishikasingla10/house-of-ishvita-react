// Professional Wear Page - Complete Collection
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { professionalProducts } from '../data/products';

const Professional = () => {
  const [, setLoaded] = useState(false);
  const [filter, setFilter] = useState<'all' | 'suits' | 'blazers' | 'dresses'>('all');
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortByPrice, setSortByPrice] = useState(false);
  
  // Preload all product images immediately
  useEffect(() => {
    professionalProducts.forEach(product => {
      const img = new Image();
      img.src = product.image;
    });
  }, []);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  // Filter products based on selection
  const getFilteredProducts = () => {
    let filtered = [...professionalProducts];
    
    if (filter === 'suits') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes('suit'));
    } else if (filter === 'blazers') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes('blazer'));
    } else if (filter === 'dresses') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes('dress') && !p.name.toLowerCase().includes('blazer'));
    }
    
    if (sortByPrice) {
      filtered.sort((a, b) => a.price - b.price);
    }
    
    return filtered;
  };
  
  const filteredProducts = getFilteredProducts();
  
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="min-h-[70vh] bg-cover bg-center relative flex items-center justify-center pt-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=60&auto=format&fit=crop&fm=webp)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="hero-title mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-2 drop-shadow-2xl">
              Professional
            </h1>
            <h1 className="text-3xl md:text-5xl font-light text-primary drop-shadow-lg">
              Corporate Chic
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl max-w-3xl mx-auto mb-8 drop-shadow-lg">
            Power dressing for the modern professional woman
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/40">
              💼 Office Ready
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/40">
              ✨ Sophisticated Style
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/40">
              👔 Executive Quality
            </span>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-textLight">
              <span className="font-semibold text-secondary text-2xl">{filteredProducts.length}</span> 
              <span className="text-lg">professional pieces</span>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full transition-colors shadow-md ${
                  filter === 'all' ? 'bg-primary text-white' : 'bg-lightBg text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                All Styles
              </button>
              <button 
                onClick={() => setFilter('suits')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === 'suits' ? 'bg-primary text-white' : 'bg-lightBg text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                Suits
              </button>
              <button 
                onClick={() => setFilter('blazers')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === 'blazers' ? 'bg-primary text-white' : 'bg-lightBg text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                Blazers
              </button>
              <button 
                onClick={() => setFilter('dresses')}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === 'dresses' ? 'bg-primary text-white' : 'bg-lightBg text-secondary hover:bg-primary hover:text-white'
                }`}
              >
                Dresses
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="bg-gradient-to-b from-lightBg to-white py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Corporate Wardrobe Consultation
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let our experts help you build the perfect professional wardrobe
          </p>
          <button className="px-10 py-4 bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all font-semibold text-lg shadow-xl transform hover:scale-105">
            Book Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Professional;
