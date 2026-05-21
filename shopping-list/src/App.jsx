import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import Filters from './components/Filters';
import Statistics from './components/Statistics';
import ProductList from './components/ProductList';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

const CATEGORIES = ['Молочные продукты', 'Овощи и фрукты', 'Хлебобулочные', 'Напитки', 'Другое'];

function App() {
  const [products, setProducts] = useLocalStorage('products', []);
  const [filter, setFilter] = useState('all'); // 'all', 'bought', 'notBought'
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Применяем тему к body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const toggleBought = (id) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, isBought: !product.isBought } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const filteredProducts = products
    .filter(product => {
      if (filter === 'bought') return product.isBought;
      if (filter === 'notBought') return !product.isBought;
      return true;
    })
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalProducts = products.length;
  const boughtCount = products.filter(p => p.isBought).length;
  const remainingCount = totalProducts - boughtCount;

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} />
      <main className="container">
        <ProductForm onAdd={addProduct} categories={CATEGORIES} />
        <Statistics total={totalProducts} bought={boughtCount} remaining={remainingCount} />
        <Filters
          filter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <ProductList
          products={filteredProducts}
          onToggle={toggleBought}
          onDelete={deleteProduct}
        />
      </main>
      <footer className="footer container">
        <p>© 2026 Список покупок</p>
      </footer>
    </div>
  );
}

export default App;