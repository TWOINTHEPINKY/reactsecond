import { useState } from 'react';

export default function ProductItem({ product, onToggle, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      onDelete(product.id);
    }, 200);
  };

  return (
    <li className={`product-item ${product.isBought ? 'bought' : ''} ${deleting ? 'deleting' : ''}`}>
      <div className="product-info">
        <span className="product-title">{product.title}</span>
        <span className="product-details">
          {product.amount} шт. • {product.category}
        </span>
      </div>
      <div className="product-actions">
        <button
          className={`btn-bought ${product.isBought ? 'active' : ''}`}
          onClick={() => onToggle(product.id)}
        >
          {product.isBought ? '✅ Куплено' : '🛒 Не куплено'}
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑️ Удалить
        </button>
      </div>
    </li>
  );
}