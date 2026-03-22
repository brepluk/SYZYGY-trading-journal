import Wrapper from "../wrappers/Dashboard";

const Dashboard = () => {
  return (
    <Wrapper>
      <div className="dashboard-cards-row">
        <div className="dashboard-card">
          <span className="dashboard-card-label">Net P&amp;L</span>
          <span className="dashboard-card-value">—</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Trade win %</span>
          <span className="dashboard-card-value">—</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Avg win</span>
          <span className="dashboard-card-value">—</span>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-card-label">Avg loss</span>
          <span className="dashboard-card-value">—</span>
        </div>
      </div>
      <section className="dashboard-chart-section">
        Daily net cumulative P&L chart (placeholder)
      </section>
      <section className="dashboard-calendar-section">
        Trading calendar (placeholder)
      </section>
    </Wrapper>
  );
};

export default Dashboard;
