type StatusChipProps = {
  tone?: "neutral" | "success" | "warning" | "error";
  text: string;
};

export function StatusChip({ tone = "neutral", text }: StatusChipProps) {
  return <p className={`status-chip ${tone}`}>{text}</p>;
}
