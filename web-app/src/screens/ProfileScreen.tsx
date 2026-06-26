import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { currentUser as initialUser } from "../data/mockData";
import { Ionicons } from "../components/Ionicons";
import { fonts } from "../theme";

export const ProfileScreen = () => {
  const { c, theme, setTheme } = useTheme();
  const { goBack } = useAppNavigation();

  const menuItems = [
    { icon: "shield-checkmark-outline", label: "Security", desc: "Biometrics & PIN" },
    { icon: "business-outline", label: "Linked Banks", desc: "Manage accounts" },
    { icon: "globe-outline", label: "Currency", desc: "USD" },
    { icon: "notifications-outline", label: "Notifications", desc: "Push & email" },
    { icon: "key-outline", label: "Recovery", desc: "Backup options" },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Settings Profile</span>
      </div>

      {/* Avatar details */}
      <div className="glass-card responsive-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "28px", marginBottom: "24px" }}>
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <img src={initialUser.avatar} alt="Victor" style={{ width: "96px", height: "96px", borderRadius: "28px", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "26px", height: "26px", borderRadius: "50%", backgroundColor: c.success, border: `3.5px solid ${c.card}` }} />
        </div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: c.foreground }}>{initialUser.name}</div>
        <div style={{ fontSize: "15px", fontWeight: "700", color: c.primary, margin: "4px 0" }}>{initialUser.username}</div>
        <div style={{ fontSize: "13px", color: c.mutedForeground }}>{initialUser.email}</div>

        {/* QR Code link actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", width: "100%", marginTop: "28px", paddingTop: "24px", borderTop: `1px solid ${c.border}50` }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="qr-code-outline" size={22} color={c.primary} />
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: c.foreground }}>My QR Code</span>
          </div>
          <div style={{ width: "1px", height: "48px", backgroundColor: c.border }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="share-outline" size={22} color={c.primary} />
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: c.foreground }}>Share Code</span>
          </div>
        </div>
      </div>

      {/* Toggle dark theme */}
      <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", borderRadius: "24px", marginBottom: "24px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "16px", backgroundColor: c.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={theme === "dark" ? "moon-outline" : "sunny-outline"} size={20} color={c.primary} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>Dark Mode Theme</div>
          <div style={{ fontSize: "13px", color: c.mutedForeground }}>Toggle light and dark color scheme</div>
        </div>
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            width: "52px",
            height: "28px",
            borderRadius: "14px",
            backgroundColor: theme === "dark" ? c.primary : c.secondary,
            position: "relative",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: theme === "dark" ? "27px" : "3px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Security lists */}
      <div className="glass-card" style={{ borderRadius: "28px", overflow: "hidden" }}>
        {menuItems.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "18px 24px",
              borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}40` : "none",
              cursor: "pointer",
            }}
            className="tx-item-hover"
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "16px", backgroundColor: c.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={item.icon} size={20} color={c.foreground} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{item.label}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>{item.desc}</div>
            </div>
            <Ionicons name="chevron-forward" size={18} color={c.mutedForeground} />
          </div>
        ))}
      </div>
    </div>
  );
};
