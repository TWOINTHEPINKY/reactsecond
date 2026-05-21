import { useState } from 'react';
import { cryptoRandomUUID } from '../utils';

export default function ProductForm({ onAdd, categories }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim() || title.trim().length < 2) {
      newErrors.title = 'Название должно содержать минимум 2 символа';
    }
    const amountNum = Number(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Количество должно быть положительным числом';
    }
    if (!category) {
      newErrors.category = 'Выберите категорию';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      category,
      isBought: false,
    };
    onAdd(newProduct);
    setTitle('');
    setAmount('');
    setCategory('');
    setErrors({});
  };

  const isFormValid = () => {
    return (
      title.trim().length >= 2 &&
      amount &&
      !isNaN(Number(amount)) &&
      Number(amount) > 0 &&
      category
    );
  };

  return (
    <section className="product-form-section">
      <h2 className="section-title">➕ Добавить продукт</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Название (мин. 2 символа)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Количество"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>
        <div className="form-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? 'error' : ''}
          >
            <option value="">-- Выберите категорию --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
          Добавить
        </button>
      </form>
    </section>
  );
}