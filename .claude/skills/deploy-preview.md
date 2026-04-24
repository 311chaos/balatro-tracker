# Deploy Preview

Deploy the current working tree to Vercel as a preview deployment.

## Steps

1. Run `npx vercel 2>&1` to create a preview deployment.
2. Extract the preview URL from the output.
3. Report the URL and status to the user.

## Notes

- Preview deploys do NOT affect production.
- Uses the current local file state (uncommitted changes are included).
- The dev Neon branch is used (DATABASE_URL from .env).
