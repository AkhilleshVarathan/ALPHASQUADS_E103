import { useState } from "react";
import { RecognitionPanel, EthicsPanel } from "./CommonPanels";

export default function ManagerDashboard() {
  const [activePanel, setActivePanel] = useState("monitor");

  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <aside
        className="w-72 p-6 shadow-xl"
        style={{ background: "var(--card-bg)" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--purple-main)]">
          Manager
        </h2>

        <SidebarItem
          label="Contribution Monitor"
          active={activePanel === "monitor"}
          onClick={() => setActivePanel("monitor")}
        />
        <SidebarItem
          label="Activity Insights"
          active={activePanel === "activity"}
          onClick={() => setActivePanel("activity")}
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

        {activePanel === "monitor" && (
          <PanelWrapper title="Contribution Monitor">
            Team-level contribution overview will appear here.
          </PanelWrapper>
        )}

        {activePanel === "activity" && (
          <PanelWrapper title="Activity vs Impact">
            Activity vs Impact visualization goes here.
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
