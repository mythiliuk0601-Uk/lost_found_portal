import { useState } from 'react';
import { LogIn, PackageSearch, FilePlus2, Search, UserRound, ShieldCheck, UsersRound } from 'lucide-react';
import { api } from '../api';

export default function Login({ onLogin, goRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const result = await api.login(form);
      onLogin(result.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-hero">
        <div className="campus-panel">
          <div className="campus-overlay">
            <div className="campus-brand"><span className="campus-brand-icon"><PackageSearch size={20} /></span><span><strong>Campus Lost &amp; Found</strong><small>Lost Today &nbsp;•&nbsp; Found Tomorrow</small></span></div>
            <h1>Find what matters.<br /><i>Reunite what&apos;s lost.</i></h1>
            <p>The campus lost &amp; found platform that helps you find missing belongings and reunite with what&apos;s important.</p>
            <div className="campus-benefits">
              <span><Search /><b>Report Lost Items<small>Quickly add details about your lost belongings.</small></b></span>
              <span><PackageSearch /><b>Find Lost Items<small>Browse and search for items found on campus.</small></b></span>
              <span><ShieldCheck /><b>Safe &amp; Secure<small>Trusted by students, faculty and staff.</small></b></span>
              <span><UsersRound /><b>A Helpful Community<small>Together we keep campus connected.</small></b></span>
            </div>
            <div className="campus-illustration" aria-hidden="true"><span className="illustration-handle" /><span className="illustration-lens" /><span className="illustration-bag" /></div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-card">
            <div className="card-logo"><PackageSearch size={40} /></div>
            <h2>Welcome Back!</h2>
            <p>Log in to report and track your items</p>
            <form onSubmit={submit}>
              {error && <div className="error">{error}</div>}
              <label>Email address<input name="email" type="email" required placeholder="Enter your email" value={form.email} onChange={update} /></label>
              <label>Password<input name="password" type="password" required placeholder="Enter your password" value={form.password} onChange={update} /></label>
              <div className="login-options">
                <label className="remember"><input type="checkbox" /> Remember me</label>
                <button type="button">Forgot password?</button>
              </div>
              <button className="primary full" type="submit"><LogIn size={16} /> Login</button>
            </form>
            <div className="new-user">Don&apos;t have an account?</div>
            <button className="create-account" onClick={goRegister}><UserRound size={15} /> Register</button>
          </div>
        </div>
      </section>

    </main>
  );
}
