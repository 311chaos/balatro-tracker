import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const v = (classes: string[]) => classes.join(" ");

const variantClasses = {
  default: v([
    "bg-primary text-primary-foreground", //default
    "pseudo-hover:bg-blue-700", //hover
    "pseudo-active:bg-blue-800", //active
    "dark:bg-blue-500 dark:text-zinc-950", //dark default
    "dark:pseudo-hover:bg-blue-400 dark:pseudo-hover:text-background", // dark hover
    "dark:pseudo-active:bg-blue-300 dark:pseudo-active:text-background", // dark active
  ]),
  outline: v([
    "border-primary bg-background text-primary", //default
    "pseudo-hover:bg-blue-50 pseudo-hover:text-[color-mix(in_oklch,var(--color-primary)_80%,black)]", //hover
    "pseudo-active:bg-blue-100 pseudo-active:text-[color-mix(in_oklch,var(--color-primary)_90%,black)]", //active
    "dark:border-blue-300 dark:text-blue-300", //dark default
    "dark:pseudo-hover:bg-blue-800 dark:pseudo-hover:text-[color-mix(in_oklch,var(--color-primary)_20%,white)]", //dark hover
    "dark:pseudo-active:bg-blue-700 dark:pseudo-active:text-[color-mix(in_oklch,var(--color-primary)_20%,white)]", //dark active
    "aria-expanded:bg-muted aria-expanded:text-foreground", // expanded
  ]),
  secondary: v([
    "bg-zinc-100 text-primary", //default
    "pseudo-hover:bg-zinc-200 pseudo-hover:text-foreground", //hover
    "pseudo-active:bg-zinc-300 pseudo-active:text-foreground", //active
    "dark:bg-zinc-800 dark:text-blue-300", //dark default —
    "dark:pseudo-hover:bg-zinc-700 dark:pseudo-hover:text-blue-300", //dark hover
    "dark:pseudo-active:bg-zinc-600 dark:pseudo-active:text-blue-200", //dark active
  ]),
  ghost: v([
    "text-foreground",
    "pseudo-hover:bg-zinc-100 pseudo-hover:text-foreground",
    "pseudo-active:bg-zinc-200",
    "dark:pseudo-hover:bg-zinc-800",
    "dark:pseudo-active:bg-zinc-700",
    "aria-expanded:bg-muted aria-expanded:text-foreground",
  ]),
  destructive: v([
    "bg-red-600 text-zinc-50", //default
    "pseudo-hover:bg-red-700", //hover
    "pseudo-active:bg-red-800", //active
    "pseudo-focus-visible:border-destructive/40 pseudo-focus-visible:ring-red-100", //focus
    "dark:bg-red-500 dark:text-zinc-950", //dark default
    "dark:pseudo-hover:bg-red-600 dark:pseudo-hover:text-zinc-200", //dark hover
    "dark:pseudo-active:bg-red-700 dark:pseudo-active:text-zinc-200", //dark active
    "dark:pseudo-focus-visible:ring-red-100", //dark focus
  ]),
  link: v([
    "text-primary underline-offset-4 underline", //default
    "pseudo-hover:text-[color-mix(in_oklch,var(--color-primary)_80%,black)]", //hover
    "pseudo-active:text-[color-mix(in_oklch,var(--color-primary)_90%,black)]", //active
    "dark:text-[color-mix(in_oklch,var(--color-primary)_70%,white)] underline-offset-4 underline", //dark default
    "dark:pseudo-hover:text-[color-mix(in_oklch,var(--color-primary)_50%,white)]", //dark hover
    "dark:pseudo-active:text-[color-mix(in_oklch,var(--color-primary)_40%,white)]", //dark active
  ]),
};

const sizeClasses = {
  default: v([
    "h-10 gap-1.5 px-4",
    "has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
  ]),
  xs: v([
    "h-7 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-xs",
    "in-data-[slot=button-group]:rounded-lg",
    "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
    "[&_svg:not([class*='size-'])]:size-3",
  ]),
  sm: v([
    "h-8 gap-1 rounded-[min(var(--radius-md),12px)] px-3 text-[0.8rem]",
    "in-data-[slot=button-group]:rounded-lg",
    "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
    "[&_svg:not([class*='size-'))]:size-3.5",
  ]),
  lg: v([
    "h-11 gap-1.5 px-5 text-lg",
    "has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
  ]),
  icon: "size-10",
  "icon-xs": v([
    "size-7 rounded-[min(var(--radius-md),10px)]",
    "in-data-[slot=button-group]:rounded-lg",
    "[&_svg:not([class*='size-'])]:size-3",
  ]),
  "icon-sm": v([
    "size-8 rounded-[min(var(--radius-md),12px)]",
    "in-data-[slot=button-group]:rounded-lg",
  ]),
  "icon-lg": "size-11",
};

const baseClasses = v([
  "group/button inline-flex shrink-0 items-center justify-center",
  "rounded-lg border border-transparent bg-clip-padding",
  "text-base font-semibold font-balatro whitespace-nowrap transition-all outline-none select-none",
  "pseudo-focus-visible:border-ring pseudo-focus-visible:ring-3 pseudo-focus-visible:ring-ring/50",
  "pseudo-active:not-aria-[haspopup]:translate-y-px",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  "tracking-widest",
]);

const buttonVariants = cva(baseClasses, {
  variants: {
    variant: variantClasses,
    size: sizeClasses,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const Button = ({
  className,
  variant = "default",
  size = "default",
  style,
  ...props
}: ButtonProps) => (
  <ButtonPrimitive
    data-slot="button"
    className={cn(buttonVariants({ variant, size }), className)}
    style={style}
    {...props}
  />
);

export { Button, buttonVariants };
