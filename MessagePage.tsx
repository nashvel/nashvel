import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MessagePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // Simulated user data (replace with API call)
  const username = "YourUsername"; 
  const profilePic = null; // Replace with user's stored profile picture
  const socialLinks = [
    { platform: "Twitter", url: "https://twitter.com/username" },
    { platform: "Instagram", url: "https://instagram.com/username" },
  ]; // Replace with real data

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Sending message to ${userId}: ${message}`);
    setSent(true);
  };

  return (
    <div>
      <h2>{username}'s Profile</h2>
      {profilePic ? <img src={profilePic} alt="Profile" width="100" /> : <p>No Profile Picture</p>}
      
      {socialLinks.length > 0 && (
        <div>
          <h4>Connect with {username}:</h4>
          {socialLinks.map((link, index) => (
            <p key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.platform}</a>
            </p>
          ))}
        </div>
      )}

      <h2>Send an Anonymous Message</h2>
      {sent ? (
        <div>
          <p>Message sent! 🎉</p>
          <p>Would you like to try the app?</p>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." required />
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}
