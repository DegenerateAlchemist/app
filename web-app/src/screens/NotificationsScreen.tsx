import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { Ionicons } from "../components/Ionicons";
import { fonts } from "../theme";

export const NotificationsScreen = () => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();

  const [list, setList] = useState([
    { id: "n1", title: "Payment Received", desc: "Sarah sent you $50.00 for 'Dinner split 🍕'", time: "Just now", type: "payment", unread: true },
    { id: "n2", title: "Security Update", desc: "Biometrics PIN & Login enabled successfully from this device.", time: "2 hours ago", type: "security", unread: true },
    { id: "n3", title: "Yield Earned! 🚀", desc: "Your Fixed Deposit plan earned $12.40 this month at 6.2% APY.", time: "Yesterday", type: "payment", unread: false },
    { id: "n4", title: "Market Alert: XLM", desc: "Stellar Lumen (XLM) increased by +4.8% today. Check your Green Portfolio.", time: "2 days ago", type: "system", unread: false },
  ]);

  const markAllRead = () => {
    setList((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return { name: "arrow-down-circle-outline", color: c.success };
      case "security":
        return { name: "shield-checkmark-outline", color: c.primary };
      case "system":
        return { name: "trending-up-outline", color: c.primary };
      default:
        return { name: "notifications-outline", color: c.mutedForeground };
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={24} color={c.foreground} />
          </button>
          <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Notifications Hub</span>
        </div>
        {list.some((n) => n.unread) && (
          <button onClick={markAllRead} style={{ fontSize: "14px", fontWeight: "700", color: c.primary }}>
            Mark all read
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "100px 0" }}>
          <Ionicons name="notifications-off-outline" size={54} color={`${c.mutedForeground}40`} />
          <div style={{ fontSize: "18px", fontWeight: "700", color: c.foreground }}>All caught up!</div>
          <div style={{ fontSize: "14px", color: c.mutedForeground }}>No new notifications at this time.</div>
        </div>
      ) : (
        <div className="glass-card" style={{ borderRadius: "28px", overflow: "hidden" }}>
          {list.map((item, i) => {
            const icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "20px 24px",
                  backgroundColor: item.unread ? `${c.primary}06` : "transparent",
                  borderBottom: i < list.length - 1 ? `1px solid ${c.border}33` : "none",
                }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "14px", backgroundColor: `${icon.color}12`, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" }}>
                  <Ionicons name={icon.name} size={20} color={icon.color} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: item.unread ? "700" : "600", color: c.foreground }}>
                      {item.title}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {item.unread && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: c.primary }} />}
                      <span style={{ fontSize: "12px", color: c.mutedForeground }}>{item.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: c.mutedForeground, lineHeight: "1.5" }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
