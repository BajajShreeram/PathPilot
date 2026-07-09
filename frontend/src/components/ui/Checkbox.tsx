import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <label className="ml-2 text-sm font-medium text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>
        {label}
      </label>
    </div>
  );
};
