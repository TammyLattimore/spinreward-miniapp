import Image from "next/image";

type SpinWheelPanelProps = {
  isSpinning: boolean;
};

export function SpinWheelPanel({ isSpinning }: SpinWheelPanelProps) {
  return (
    <section className="card spin-panel">
      <div className="wheel-wrap">
        <div className={`wheel ${isSpinning ? "wheel-spin" : ""}`} aria-hidden />
        <div className="wheel-center">SPIN</div>
      </div>
      <Image
        src="/scene-spinreward.svg"
        alt="SpinReward capsule machine scene"
        width={360}
        height={200}
        className="scene-image"
        priority
      />
    </section>
  );
}
