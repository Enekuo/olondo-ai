import React from 'react';
    import { cn } from '@/lib/utils';

    const Input = React.forwardRef(({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500',
            className
          )}
          ref={ref}
          {...props}
        />
      );
    });
    Input.displayName = 'Input';

    export { Input };