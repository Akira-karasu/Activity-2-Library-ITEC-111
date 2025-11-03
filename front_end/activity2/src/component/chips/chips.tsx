import "./chips.css";

interface ChipsRadioProps {
  name: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ChipsRadio({ name, options, selected, onChange } : ChipsRadioProps) {
  return (
    <div className="chips-container">
      {options.map((option) => (
        <label key={option} className="chip-pill">
          <input
            type="radio"
            name={name}
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
