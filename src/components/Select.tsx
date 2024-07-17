import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  multiple,
  ...props
}) => {
  return (
    <div className="select-group">
      <label>{label}</label>
      <select multiple={multiple} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
