# Deploy Production

Deploy the current working tree to Vercel production.

## Steps

1. Warn the user: "This will deploy to production at https://balatro-tracker.vercel.app and affect real users."
2. Ask for explicit confirmation before proceeding.
3. On confirmation, run `npx vercel --prod 2>&1`.
4. Extract the production URL from the output.
5. Report the URL and build status to the user.

## Notes

- Production uses the Neon `production` branch (DATABASE_URL from .env.production).
- If the schema has changed, remind the user to run migrations first:
  `set -a && source .env.production && set +a && DATABASE_URL=$DATABASE_URL_UNPOOLED npx prisma migrate deploy`
- The production URL is https://balatro-tracker.vercel.app
