import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", form);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
}
