import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { getProductById } from '../data/products';
import Loading from '../components/Loading';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadProduct = () => {
      try {
        if (!id) throw new Error('No id');
        const foundProduct = getProductById(Number(id));
        if (!foundProduct) throw new Error('Product not found');
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please sign in to add items to cart!');
      navigate('/signin');
      return;
    }

    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (product) {
      // The CartContext will handle adding the quantity
      addToCart(product);
      alert('Product added to cart successfully!');
    }
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      alert('Please sign in to manage wishlist!');
      navigate('/signin');
      return;
    }

    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        alert('Product removed from wishlist!');
      } else {
        addToWishlist(product);
        alert('Product added to wishlist!');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 pt-20">{error}</div>;
  if (!product) return <div className="text-center pt-20">Product not found</div>;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.additionalImages && (
              <div className="grid grid-cols-4 gap-4">
                {[product.image, ...(product.additionalImages || [])].map((img, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden ${
                      mainImage === img ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500 mt-2">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.id % 2 === 0 && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{(product.price + 500).toLocaleString()}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.ratings.average)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.ratings.count} reviews)
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`group relative h-10 flex items-center justify-center rounded-md border ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <span className="text-sm font-medium">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            {product.material && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">Material</h3>
                <p className="mt-2 text-sm text-gray-500">{product.material}</p>
              </div>
            )}

            {product.care && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">Care Instructions</h3>
                <ul className="mt-2 list-disc pl-4 text-sm text-gray-500">
                  {product.care.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
                className={`flex-1 min-w-[200px] px-6 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  product.stockStatus === 'out_of_stock'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {product.stockStatus === 'out_of_stock'
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className="p-3 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <svg
                  className={`w-6 h-6 ${
                    isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  product.stockStatus === 'in_stock'
                    ? 'bg-green-500'
                    : product.stockStatus === 'low_stock'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              ></span>
              <span className="text-sm text-gray-500">
                {product.stockStatus === 'in_stock'
                  ? 'In Stock'
                  : product.stockStatus === 'low_stock'
                  ? 'Low Stock'
                  : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
