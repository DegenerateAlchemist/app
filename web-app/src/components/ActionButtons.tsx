import { useTheme } from "../ThemeContext";
import { useAppNavigation, type ScreenName } from "../context/NavigationContext";
import { Ionicons } from "./Ionicons";
import { shadows } from "../theme";

export const ActionButtons = () => {
  const { c } = useTheme();
  const { navigate } = useAppNavigation();

  const actions = [
    { icon: "arrow-forward", label: "Transfer", route: "Send" as ScreenName, rotation: -45 },
    { icon: "add-circle-outline", label: "Deposit", route: "Deposit" as ScreenName },
    { icon: "piggy-bank-outline", label: "Save", route: "Save" as ScreenName },
    { icon: "bar-chart-outline", label: "Invest", route: "Invest" as ScreenName },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", margin: "24px 0" }}>
      {actions.map((action, i) => (
        <div
          key={action.label}
          onClick={() => navigate(action.route)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          {i === 0 ? (
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${c.gradientAccent[0]}, ${c.gradientAccent[1]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: shadows.card,
                transition: "transform 0.2s ease",
              }}
              className="action-btn-hover"
            >
              <Ionicons name={action.icon} size={22} color="#fff" style={{ transform: `rotate(${action.rotation || 0}deg)` }} />
            </div>
          ) : (
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                backgroundColor: c.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              className="action-btn-hover"
            >
              <Ionicons name={action.icon} size={22} color={c.foreground} />
            </div>
          )}
          <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground, letterSpacing: "0.2px" }}>
            {action.label}
          </span>
        </div>
      ))}
    </div>
  );
};
