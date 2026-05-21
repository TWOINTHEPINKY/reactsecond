import { useState } from 'react';

export default function ProductItem({ product, onToggle, onDelete, onUpdateAmount }) {
  const [deleting, setDeleting] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [tempAmount, setTempAmount] = useState(product.amount);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(product.id), 200);
  };

  const handleAmountChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1;
    if (val < 1) val = 1;
    setTempAmount(val);
  };

  const saveAmount = () => {
    if (tempAmount !== product.amount && tempAmount >= 1) {
      onUpdateAmount(product.id, tempAmount);
    }
    setIsEditingAmount(false);
  };

  const increment = () => {
    onUpdateAmount(product.id, product.amount + 1);
  };

  const decrement = () => {
    if (product.amount > 1) {
      onUpdateAmount(product.id, product.amount - 1);
    }
  };

  return (
    <li className={`product-item ${product.isBought ? 'bought' : ''} ${deleting ? 'deleting' : ''}`}>
      <div className="product-info">
        <span className="product-title">{product.title}</span>
        <div className="product-details">
          <span>{product.category}</span>
          <div className="product-amount-control">
            <button onClick={decrement} disabled={product.amount <= 1} className="amount-btn">−</button>
            {isEditingAmount ? (
              <input
                type="number"
                value={tempAmount}
                onChange={handleAmountChange}
                onBlur={saveAmount}
                onKeyPress={(e) => e.key === 'Enter' && saveAmount()}
                autoFocus
                min="1"
                className="amount-input"
              />
            ) : (
              <span className="amount-value" onClick={() => setIsEditingAmount(true)}>
                {product.amount} шт.
              </span>
            )}
            <button onClick={increment} className="amount-btn">+</button>
          </div>
        </div>
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