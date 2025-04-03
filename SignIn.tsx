const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Logging in:", form);
  navigate("/dashboard"); // Redirect after login
};
