import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRef } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [captchaToken, setCaptchaToken] = useState()
  const captcha = useRef()

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });

    if (error) setError(error.message);
    else window.location.href = "#/admin";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white shadow p-8 rounded" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input type="email" placeholder="Email" className="border p-2 w-full mb-3"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="border p-2 w-full mb-3"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
<HCaptcha
  ref={captcha}
  sitekey="adfe136e-23c2-4a10-a30a-7b5610dcc9ca"
  onVerify={(token) => {
    setCaptchaToken(token)
  }}
/>

      </form>
    </div>
  );
}
