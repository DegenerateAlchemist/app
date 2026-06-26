import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { TransactionItem } from "../components/TransactionItem";
import { type Transaction } from "../data/mockData";
import { fonts } from "../theme";
import { Ionicons } from "../components/Ionicons";

export const ActivityScreen = ({ txs }: { txs: Transaction[] }) => {
  const { c } = useTheme();
  const { navigate, goBack } = useAppNavigation();

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Activity Ledger</span>
      </div>

      <div className="glass-card" style={{ borderRadius: "28px", padding: "12px" }}>
        {txs.map((tx) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onClick={() => navigate("TransactionDetail", { id: tx.id })}
          />
        ))}
      </div>
    </div>
  );
};
