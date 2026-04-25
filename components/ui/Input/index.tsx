import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 pseudo-focus-visible:border-ring pseudo-focus-visible:ring-3 pseudo-focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:text-foreground dark:disabled:bg-input/80',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-[0.8rem]',
        md: 'h-10 px-2.5 text-base',
        lg: 'h-11 px-3 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const clearButtonSize: Record<
  NonNullable<VariantProps<typeof inputVariants>['size']>,
  string
> = {
  sm: 'size-3.5',
  md: 'size-3.5',
  lg: 'size-4',
};

type Props = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    clearable?: boolean;
    onClear?: () => void;
  };

export const Input = ({
  className,
  type,
  size = 'md',
  clearable,
  onClear,
  onChange,
  value,
  ...props
}: Props) => {
  const hasValue = value !== undefined && value !== '';
  const showClear = clearable && hasValue;

  const handleClear = () => {
    onClear?.();
    onChange?.({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  if (!clearable) {
    return (
      <InputPrimitive
        type={type}
        data-slot="input"
        value={value}
        onChange={onChange}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    );
  }

  return (
    <div className="relative flex items-center">
      <InputPrimitive
        type={type}
        data-slot="input"
        value={value}
        onChange={onChange}
        className={cn(inputVariants({ size }), 'pr-8', className)}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-stake-red absolute right-2.5 flex items-center justify-center transition-colors"
          aria-label="Clear"
        >
          <X className={clearButtonSize[size ?? 'md']} />
        </button>
      )}
    </div>
  );
};
