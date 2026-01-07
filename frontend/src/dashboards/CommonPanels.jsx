export function RecognitionPanel() {
  return (
    <div className="bg-[var(--card-bg)] backdrop-blur rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-4 text-[var(--purple-main)]">
        Recognition
      </h2>
      <p className="text-[var(--text-muted)]">
        Recognition is based on delivered impact, ownership, and contribution
        quality — not visibility or self-promotion.
      </p>
    </div>
  );
}

export function EthicsPanel() {
  return (
    <div className="bg-[var(--card-bg)] backdrop-blur rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-4 text-[var(--purple-main)]">
        Ethics & Transparency
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-[var(--text-muted)]">
        <li>No surveillance-based tracking</li>
        <li>No mic, camera, or time monitoring</li>
        <li>Only verifiable work artifacts are used</li>
        <li>Explainable and auditable scoring</li>
      </ul>
    </div>
  );
}
