<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Code Style

- **Named exports only.** Do not use `export default function X()`. Exception: Next.js page/layout files require a default export — declare the component as `const X = () => {}` and add `export default X` on a separate line at the end.
- **Arrow functions only.** Use `const X = () => {}` instead of `function X() {}` everywhere — top-level functions, component inner functions, and helpers alike.
