import { useEffect, useState } from "react";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import MemberDashboard from "./dashboards/MemberDashboard";

export default function ShadowForceApp() {
  const [view, setView] = useState("landing"); // landing | login | dashboard
  const [role, setRole] = useState("");

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [view]);

  return (
    <div className="min-h-screen text-[var(--text-main)]">
      
      {/* ================= LANDING ================= */}
      {view === "landing" && (
        <section className="min-h-screen flex flex-col items-center px-6 pt-24 text-center">

          {/* Header */}
          <div className="mb-20">
            <h1 className="text-6xl font-bold mb-4
              bg-gradient-to-r
              from-[var(--purple-main)]
              via-[var(--pink-main)]
              to-[var(--blue-main)]
              bg-clip-text text-transparent">
              ShadowForce
            </h1>

            <p className="text-xl text-[var(--text-muted)]">
              Measuring <span className="font-medium text-[var(--purple-main)]">
                real impact
              </span>, not noise.
            </p>
          </div>

          {/* Designed for Truth */}
          <section className="bg-[var(--card-bg)] backdrop-blur rounded-[2rem] shadow-xl p-14 max-w-6xl w-full mb-20">
            <h2 className="text-3xl font-bold mb-10">
              Designed for <span className="text-[var(--purple-main)]">Truth</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: "eye",
                  title: "Reveal Silent Architects",
                  desc: "Identify high-impact contributors working quietly."
                },
                {
                  icon: "trending-up",
                  title: "Measure Real Impact",
                  desc: "Focus on outcomes, complexity, and stability."
                },
                {
                  icon: "shield",
                  title: "Fair & Explainable",
                  desc: "Transparent scoring managers can trust."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--card-bg)] backdrop-blur rounded-3xl p-8 shadow-lg hover:scale-105 transition"
                >
                  <i data-lucide={item.icon} className="w-9 h-9 text-[var(--purple-main)] mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Role Selection */}
          <section className="bg-[var(--card-bg)] backdrop-blur rounded-[2rem] shadow-xl p-14 max-w-4xl w-full mb-20">
            <h3 className="text-2xl font-semibold mb-10">
              Choose Your <span className="text-[var(--purple-main)]">Role</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div
                onClick={() => { setRole("Manager"); setView("login"); }}
                className="cursor-pointer bg-[var(--card-bg)] backdrop-blur rounded-3xl p-10 shadow-lg hover:scale-105 transition text-left"
              >
                <i data-lucide="briefcase" className="w-10 h-10 text-[var(--purple-main)] mb-4"></i>
                <h4 className="text-xl font-semibold mb-2">Manager</h4>
                <p className="text-[var(--text-muted)]">
                  View team contribution insights and silent architects.
                </p>
              </div>

              <div
                onClick={() => { setRole("Team Member"); setView("login"); }}
                className="cursor-pointer bg-[var(--card-bg)] backdrop-blur rounded-3xl p-10 shadow-lg hover:scale-105 transition text-left"
              >
                <i data-lucide="user" className="w-10 h-10 text-[var(--blue-main)] mb-4"></i>
                <h4 className="text-xl font-semibold mb-2">Team Member</h4>
                <p className="text-[var(--text-muted)]">
                  View your real contribution metrics and growth signals.
                </p>
              </div>
            </div>
          </section>
        </section>
      )}

      {/* ================= LOGIN ================= */}
      {view === "login" && (
        <section className="min-h-screen flex items-center justify-center">
          <div className="bg-[var(--card-bg)] backdrop-blur rounded-3xl p-12 shadow-xl w-full max-w-md text-center">
            <i data-lucide="lock" className="w-10 h-10 text-[var(--purple-main)] mx-auto mb-4"></i>
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-[var(--text-muted)] mb-6">Role: {role}</p>

            <input className="w-full p-3 mb-4 border rounded-xl" placeholder="Username" />
            <input type="password" className="w-full p-3 mb-6 border rounded-xl" placeholder="Password" />

            <button
              onClick={() => setView("dashboard")}
              className="w-full py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl"
              style={{ background: "var(--btn-gradient)" }}
            >
              Enter
            </button>
          </div>
        </section>
      )}

      {/* ================= DASHBOARD ================= */}
      {view === "dashboard" && (
        role === "Manager"
          ? <ManagerDashboard />
          : <MemberDashboard />
      )}
    </div>
  );
}
