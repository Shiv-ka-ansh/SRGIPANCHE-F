import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
}

export function PasswordInput({ label, className, ...props }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block font-space font-bold uppercase text-[#CCFF00] mb-2 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={`${className} pr-12`}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#CCFF00] transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
