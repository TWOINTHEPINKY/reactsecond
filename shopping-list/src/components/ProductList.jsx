import ProductItem from './ProductItem';
import EmptyList from './EmptyList';

export default function ProductList({ products, onToggle, onDelete, onUpdateAmount }) {
  if (products.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="product-list-section">
      <h2 className="section-title">📋 Список продуктов</h2>
      <ul className="product-list">
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdateAmount={onUpdateAmount}
          />
        ))}
      </ul>
    </section>
  );
}