export default function Statistics({ total, bought, remaining }) {
  return (
    <section className="statistics">
      <div className="stat-card">
        <span className="stat-label">Всего продуктов</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Куплено</span>
        <span className="stat-value bought">{bought}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Осталось купить</span>
        <span className="stat-value remaining">{remaining}</span>
      </div>
    </section>
  );
}