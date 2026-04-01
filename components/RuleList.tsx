export function RuleList() {
  return (
    <section className="card">
      <h2>How It Works</h2>
      <ul className="rule-list">
        <li>Each spin is a free onchain action.</li>
        <li>Rewards are point-based only.</li>
        <li>Points are recorded onchain through this contract.</li>
        <li>Current version does not include tokens, NFTs, or withdrawable rewards.</li>
        <li>Future upgrades may add richer reward features.</li>
      </ul>
      <p className="about-copy">
        Current contract supports a simple free spin with onchain point rewards. Points are
        recorded onchain as a lightweight reward score. More advanced reward mechanics can be
        added in a future upgrade.
      </p>
    </section>
  );
}
