import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Resend from 'next-auth/providers/resend';
import { Resend as ResendClient } from 'resend';
import { db } from '@/lib/db';
import { MagicLinkEmail } from '@/emails/MagicLinkEmail';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: 'onboarding@resend.dev', // update once Resend domain is configured
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const resend = new ResendClient(process.env.AUTH_RESEND_KEY);
        await resend.emails.send({
          from: 'onboarding@resend.dev', // update once Resend domain is configured
          to: email,
          subject: 'Sign in to Balatro Tracker',
          react: MagicLinkEmail({ url }),
        });
      },
    }),
  ],
  pages: {
    signIn: '/',
    verifyRequest: '/verify',
  },
});
