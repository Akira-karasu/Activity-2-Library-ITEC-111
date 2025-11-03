interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  fontWeight?: number | string;
  size?: "sm" | "md" | "lg"; // <- strongly typed
}


export default function Button({
  title,
  onPress,
  style = {},
  disabled = false,
  fontWeight = 700,
  size = "lg", // default size
  type = "button",
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: { padding: "6px 12px", fontSize: 12 },
    md: { padding: "10px 16px", fontSize: 14 },
    lg: { padding: "14px 20px", fontSize: 16 },
  }[size];

  const baseStyle: React.CSSProperties = {
    backgroundColor: disabled ? "#da8064ff" : "#FF6B3F",
    width: "100%",
    color: "#ffffff",
    border: "none",
    fontWeight,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.15s, transform 0.12s",
    outline: "none",
    ...sizeStyles, // ← applies size-based padding + font size
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <button
      type={type}
      onClick={onPress}
      style={{ ...baseStyle, ...style }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  );
}
