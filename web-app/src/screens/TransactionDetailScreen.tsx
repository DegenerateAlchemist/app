import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { Ionicons } from "../components/Ionicons";
import { type Transaction } from "../data/mockData";
import { fonts } from "../theme";

export const TransactionDetailScreen = ({ txs }: { txs: Transaction[] }) => {
  const { c } = useTheme();
  const { goBack, params } = useAppNavigation();
  const tx = txs.find((t) => t.id === params?.id);
  const [showTech, setShowTech] = useState(false);

  if (!tx) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", color: c.mutedForeground }}>
        Transaction not found
      </div>
    );
  }

  const isReceived = tx.type === "received";

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={24} color={c.foreground} />
          </button>
          <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Transaction Ledger Details</span>
        </div>
        <button
          onClick={() => alert("Copied details share link!")}
          style={{ width: "40px", height: "40px", borderRadius: "12px", border: `1px solid ${c.border}50`, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="share-outline" size={18} color={c.foreground} />
        </button>
      </div>

      <div className="glass-card responsive-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "28px" }}>
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "26px",
            backgroundColor: `${isReceived ? c.success : c.primary}1A`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={36}
            color={isReceived ? c.success : c.primary}
            style={{ transform: `rotate(${isReceived ? "135deg" : "-45deg"})` }}
          />
        </div>

        <div style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-1.5px", color: isReceived ? c.success : c.foreground, marginBottom: "8px", fontFamily: fonts.display }}>
          {isReceived ? "+" : "−"}${tx.amount.toFixed(2)}
        </div>
        <div style={{ fontSize: "15px", color: c.mutedForeground, marginBottom: "32px" }}>
          {isReceived ? "Received from" : "Sent to"}{" "}
          <strong style={{ fontWeight: "700", color: c.foreground }}>{tx.name}</strong>
        </div>

        <div style={{ width: "100%", borderRadius: "24px", backgroundColor: c.secondary, padding: "24px", display: "flex", flexDirection: "column", gap: "18px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingBottom: "18px", borderBottom: `1px solid ${c.border}33` }}>
            <img src={tx.avatar} alt={tx.name} style={{ width: "48px", height: "48px", borderRadius: "16px", objectFit: "cover" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.name}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>{tx.username}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Status</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Ionicons
                name={tx.status === "completed" ? "checkmark-circle" : "time-outline"}
                size={16}
                color={tx.status === "completed" ? c.success : c.warning}
              />
              <span style={{ fontSize: "15px", fontWeight: "700", color: tx.status === "completed" ? c.success : c.warning, textTransform: "capitalize" }}>
                {tx.status}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Date</span>
            <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.date}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Fee</span>
            <span style={{ fontSize: "15px", fontWeight: "700", color: c.success }}>$0.00 (Sponsored)</span>
          </div>

          {tx.note && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "15px", color: c.mutedForeground }}>Note</span>
              <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.note}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowTech(!showTech)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px", fontSize: "13px", color: c.mutedForeground }}
        >
          <span>Technical Ledger Blockchain Info</span>
          <Ionicons name={showTech ? "chevron-up" : "chevron-down"} size={14} color={c.mutedForeground} />
        </button>

        {showTech && (
          <div style={{ width: "100%", borderRadius: "18px", backgroundColor: c.secondary, padding: "20px", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", fontFamily: "monospace", fontSize: "12px", color: c.mutedForeground, marginTop: "12px", lineHeight: "1.4" }}>
            <div>Network: Stellar Mainnet</div>
            <div style={{ wordBreak: "break-all" }}>TX Hash: 32f7e53d5a452ef783b9f487cb1f2020777fa98c487</div>
            <div>Ledger: #2020777</div>
            <div>Fee: Sponsored (free)</div>
          </div>
        )}
      </div>
    </div>
  );
};
