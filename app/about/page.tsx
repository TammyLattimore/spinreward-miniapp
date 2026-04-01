import { BottomNav } from "@/components/BottomNav";
import { RewardHeader } from "@/components/RewardHeader";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="app-shell">
      <div className="content-stack">
        <RewardHeader subtitle="Simple and honest onchain point spin rules." />
        <RuleList />
      </div>
      <BottomNav />
    </main>
  );
}
