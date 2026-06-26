import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { fonts } from "../theme";
import { Ionicons } from "./Ionicons";

export const BalanceCard = ({ balance }: { balance: number }) => {
  const { c } = useTheme();
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="balance-card-responsive"
      style={{
        background: `linear-gradient(135deg, ${c.gradientBalance[0]}, ${c.gradientBalance[1]} 50%, ${c.gradientBalance[2]})`,
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(51, 51, 160, 0.2)",
      }}
    >
      {/* Ring shapes */}
      <div style={{ position: "absolute", top: "-64px", right: "-64px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-32px", right: "-32px", width: "140px", height: "140px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px" }}>
          AVAILABLE BALANCE
        </span>
        <button
          onClick={() => setVisible(!visible)}
          style={{
            padding: "8px",
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <Ionicons name={visible ? "eye-outline" : "eye-off-outline"} size={16} color="#fff" />
        </button>
      </div>

      <div style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-1.5px", marginBottom: "16px", fontFamily: fonts.display }}>
        {visible ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c993" }} />
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: "500", letterSpacing: "0.2px" }}>
          All systems active
        </span>
      </div>
    </div>
  );
};
