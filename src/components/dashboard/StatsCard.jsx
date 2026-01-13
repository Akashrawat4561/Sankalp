const StatsCard = ({ title, value, helperText }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
      {helperText && <small>{helperText}</small>}
    </div>
  );
};

export default StatsCard;

