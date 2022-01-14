export type UserResult = Awaited<ReturnType<typeof supabase.auth.user>>;

export const user = writable<UserResult>(null);
