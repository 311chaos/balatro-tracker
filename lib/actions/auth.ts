'use server';

import { signIn, signOut } from '@/lib/auth';

export const signInWithEmail = async (formData: FormData) => {
  await signIn('resend', formData, { redirectTo: '/tracker/jokers' });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: '/tracker/jokers' });
};
