type RewardHeaderProps = {
  subtitle?: string;
};

export function RewardHeader({ subtitle }: RewardHeaderProps) {
  return (
    <header className="card reward-header">
      <p className="kicker">Arcade Mini App</p>
      <h1>SpinReward</h1>
      <p>{subtitle ?? "Free onchain spin. Win points and track your latest result."}</p>
    </header>
  );
}
