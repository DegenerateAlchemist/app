import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { contacts } from "../data/mockData";
import { Ionicons } from "./Ionicons";

export const QuickContacts = () => {
  const { c } = useTheme();
  const { navigate } = useAppNavigation();

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
        QUICK SEND
      </div>
      <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "12px", scrollbarWidth: "none" }} className="custom-scroll">
        <div
          onClick={() => navigate("Send")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "20px",
              border: `2px dashed ${c.primary}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add" size={22} color={c.primary} />
          </div>
          <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground }}>New</span>
        </div>

        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => navigate("Send", { to: contact.username })}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={contact.avatar}
                alt={contact.name}
                style={{ width: "56px", height: "56px", borderRadius: "20px", backgroundColor: c.secondary, objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: c.success,
                  border: `2.5px solid ${c.background}`,
                }}
              />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground }}>{contact.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
