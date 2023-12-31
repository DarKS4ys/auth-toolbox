'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import ShowPassword from '../Auth/ShowPassword';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  eye?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ eye, className, type, ...props }, ref) => {
    const [inputFocused, setInputFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleInputFocus = () => {
      setInputFocused(true);
    };

    const handleInputBlur = () => {
      setInputFocused(false);
    };

    return (
      <div
        className={cn(
          'h-10 border outline-none bg-background border-input px-3 py-2 flex rounded-md transition',
          inputFocused && 'border-blue-400 ring ring-blue-400/50'
        )}
      >
        <style>{`
          input:-webkit-autofill {
            box-shadow: 0 0 0 30px white inset !important;
          }
        `}</style>
        <input
          type={eye ? ( showPassword ? "text" : "password" ) : type}
          className={cn(
            'flex w-full outline-none text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        {eye && (
          <ShowPassword
            onClick={() => handleShowPassword()}
            showPassword={showPassword}
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
