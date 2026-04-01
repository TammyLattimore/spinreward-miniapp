type RewardRevealCardProps = {
  reward?: number;
  txHash?: string;
  fallbackMessage?: string;
};

export function RewardRevealCard({ reward, txHash, fallbackMessage }: RewardRevealCardProps) {
  return (
    <section className="card reveal-card">
      <p className="kicker">Latest Spin Result</p>
      {typeof reward === "number" ? (
        <>
          <h2>+{reward} Points</h2>
          <p>Reward points gained from this onchain spin.</p>
        </>
      ) : (
        <>
          <h2>Spin submitted</h2>
          <p>{fallbackMessage ?? "Your onchain points have been refreshed."}</p>
        </>
      )}
      {txHash ? <p className="hash-line">tx: {txHash}</p> : null}
    </section>
  );
}
