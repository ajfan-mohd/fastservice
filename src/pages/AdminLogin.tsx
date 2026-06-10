import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminLogin({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.setItem('admin_logged_in', 'true');
  onLogin();
};

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-black text-slate-900">
          Admin Login
        </h1>
<input
  type="email"
  placeholder="Admin email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="mt-6 w-full rounded-lg border border-slate-200 p-4 outline-none focus:border-blue-600"
/>
        {/* <p className="mt-2 text-sm text-slate-500">
          Enter password to access dashboard.
        </p> */}

        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-lg border border-slate-200 p-4 outline-none focus:border-blue-600"
        />

        <button className="mt-4 w-full rounded-lg bg-blue-600 p-4 font-black text-white hover:bg-slate-900">
          Login
        </button>
      </form>
    </section>
  );
}