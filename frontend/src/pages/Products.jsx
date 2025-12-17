import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle search from URL params and local search
  useEffect(() => {
    const searchQuery = searchParams.get('search') || q;
    
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  }, [products, searchParams, q]);

  const currentSearch = searchParams.get('search') || '';

  return (
    <div className="container page">
      {currentSearch && (
        <div className="search-results-header">
          <h2>Search Results for "{currentSearch}"</h2>
          <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
        </div>
      )}
      
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && filteredProducts.length === 0 && currentSearch && (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try searching with different keywords or browse all products.</p>
        </div>
      )}
      
      <div className="grid">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
