type SpinActionButtonProps = {
  disabled: boolean;
  pending: boolean;
  onClick: () => void;
};

export function SpinActionButton({ disabled, pending, onClick }: SpinActionButtonProps) {
  return (
    <button
      type="button"
      className={`spin-btn ${pending ? "spin-btn-pending" : ""}`}
      onClick={onClick}
      disabled={disabled || pending}
    >
      {pending ? "Spinning Onchain..." : "Spin Now"}
    </button>
  );
}
