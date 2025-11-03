import { useState } from "react";
import "./TextInput.css";
import eye from "../../assets/eye.png";
import eyeOff from "../../assets/eye-off.png";


interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  type?: string;
  inputLabel?: string;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  className = "",
  error,
  type = "text",
  inputLabel = "",
}: TextInputProps) {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div style={{ position: "relative", width: "100%" }}>

      <label>{inputLabel}</label>

      <input
        className={`input ${error ? "error" : ""} ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        type={isPassword && !showPassword ? "password" : "text"}
      />

      {isPassword && (
        <img
          src={showPassword ? eyeOff : eye} // 👈 change to your image path
          alt="toggle visibility"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: "70%",
            transform: "translateY(-50%)",
            width: 20,
            height: 20,
            cursor: "pointer",
            opacity: 0.7,
            userSelect: "none",
          }}
          onMouseDown={(e) => e.preventDefault()} // 👈 removes blue focus
        />
      )}
    </div>
  );
}
