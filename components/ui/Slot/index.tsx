import React from 'react';

const composeRefs =
  <T,>(...refs: (React.Ref<T> | null | undefined)[]) =>
  (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref != null)
        (ref as React.MutableRefObject<T | null>).current = node;
    }
  };

type AnyHandler = (e: never) => void;

const composeHandlers = (child: AnyHandler, slot: AnyHandler) => (e: never) => {
  child(e);
  if (!(e as unknown as { defaultPrevented: boolean }).defaultPrevented)
    slot(e);
};

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, slotRef) => {
    if (!React.isValidElement(children)) return null;

    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = child.props;
    const merged: Record<string, unknown> = { ...slotProps };

    for (const key of Object.keys(childProps)) {
      const sv = (slotProps as Record<string, unknown>)[key];
      const cv = childProps[key];
      if (key === 'className') {
        merged[key] = [sv, cv].filter(Boolean).join(' ');
      } else if (key === 'style') {
        merged[key] = { ...(sv as object), ...(cv as object) };
      } else if (
        key.startsWith('on') &&
        typeof sv === 'function' &&
        typeof cv === 'function'
      ) {
        merged[key] = composeHandlers(cv as AnyHandler, sv as AnyHandler);
      } else {
        merged[key] = cv ?? sv;
      }
    }

    const childRef = (child as unknown as { ref?: React.Ref<unknown> }).ref;
    const composedRef =
      slotRef || childRef ? composeRefs<unknown>(slotRef, childRef) : undefined;

    return React.cloneElement(child, { ...merged, ref: composedRef } as Record<
      string,
      unknown
    >);
  },
);

Slot.displayName = 'Slot';
