export default function Filters({ filter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <section className="filters">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Все
        </button>
        <button
          className={`filter-btn ${filter === 'bought' ? 'active' : ''}`}
          onClick={() => onFilterChange('bought')}
        >
          Купленные
        </button>
        <button
          className={`filter-btn ${filter === 'notBought' ? 'active' : ''}`}
          onClick={() => onFilterChange('notBought')}
        >
          Не купленные
        </button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </section>
  );
}