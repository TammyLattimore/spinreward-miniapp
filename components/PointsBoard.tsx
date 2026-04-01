type PointsBoardProps = {
  points: number;
  loading?: boolean;
};

export function PointsBoard({ points, loading }: PointsBoardProps) {
  return (
    <section className="card points-board">
      <p className="label">Current Points</p>
      <p className="points-value">{loading ? "..." : points}</p>
      <p className="hint">Onchain score from `getPoints(address)`</p>
    </section>
  );
}
