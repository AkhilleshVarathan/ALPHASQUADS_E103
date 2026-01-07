import { useState } from "react";
import { RecognitionPanel, EthicsPanel } from "./CommonPanels";

export default function MemberDashboard() {
  const [activePanel, setActivePanel] = useState("metrics");

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside
        className="w-72 p-6 shadow-xl"
        style={{ background: "var(--card-bg)" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--purple-main)]">
          Team Member
        </h2>

        <SidebarItem
          label="My Contribution"
          active={activePanel === "metrics"}
          onClick={() => setActivePanel("metrics")}
        />
        <SidebarItem
          label="Reflection Assistant"
          active={activePanel === "reflection"}
          onClick={() => setActivePanel("reflection")}
        />
        <SidebarItem
          label="Recognition"
          active={activePanel === "recognition"}
          onClick={() => setActivePanel("recognition")}
        />
        <SidebarItem
          label="Ethics & Transparency"
          active={activePanel === "ethics"}
          onClick={() => setActivePanel("ethics")}
        />
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {activePanel === "metrics" && (
          <PanelWrapper title="My Contribution Metrics">
            Your individual contribution signals appear here.
          </PanelWrapper>
        )}

        {activePanel === "reflection" && (
          <PanelWrapper title="Reflection Assistant">
            AI-powered reflection and growth assistant.
          </PanelWrapper>
        )}

        {activePanel === "recognition" && <RecognitionPanel />}
        {activePanel === "ethics" && <EthicsPanel />}

      </main>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition
        ${
          active
            ? "bg-[rgba(147,51,234,0.12)] text-[var(--purple-main)]"
            : "text-[var(--text-muted)] hover:bg-[rgba(147,51,234,0.08)]"
        }
      `}
    >
      {label}
    </button>
  );
}

function PanelWrapper({ title, children }) {
  return (
    <div className="bg-[var(--card-bg)] backdrop-blur rounded-3xl p-8 shadow-xl">
      <h1 className="text-3xl font-bold mb-4 text-[var(--purple-main)]">
        {title}
      </h1>
      <p className="text-[var(--text-muted)]">{children}</p>
    </div>
  );
}
