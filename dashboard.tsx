import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [messages, setMessages] = useState<{ id: string; content: string; sender: string }[]>([]);
  const [username, setUsername] = useState("YourUsername");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const userId = "user123"; // Replace with actual user ID from authentication
  const profileLink = `${window.location.origin}/message/${userId}`;

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { id: "1", content: "Hey there!", sender: "Anonymous" },
        { id: "2", content: "You're amazing!", sender: "Anonymous" },
      ]);
    }, 1000);
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const updateSocialLink = (index: number, key: string, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [key]: value };
    setSocialLinks(updatedLinks);
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        {profilePic ? <img src={profilePic} alt="Profile" width="100" /> : <p>No Profile Picture</p>}
        {editing ? (
          <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            
            <h3>Social Links</h3>
            {socialLinks.map((link, index) => (
              <div key={index}>
                <input type="text" value={link.platform} onChange={(e) => updateSocialLink(index, "platform", e.target.value)} placeholder="Platform (e.g., Twitter)" />
                <input type="url" value={link.url} onChange={(e) => updateSocialLink(index, "url", e.target.value)} placeholder="URL" />
              </div>
            ))}
            <button onClick={addSocialLink}>Add Social Link</button>
            
            <button onClick={() => setEditing(false)}>Save</button>
          </div>
        ) : (
          <div>
            <h3>{username}</h3>
            {socialLinks.length > 0 && (
              <div>
                <h4>Social Links:</h4>
                {socialLinks.map((link, index) => (
                  <p key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.platform}</a>
                  </p>
                ))}
              </div>
            )}
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>

      <button onClick={() => navigator.clipboard.writeText(profileLink)}>
        Share Your Link
      </button>
      <p>Share this link to receive anonymous messages: <a href={profileLink} target="_blank">{profileLink}</a></p>

      <h2>Your Messages</h2>
      {messages.length === 0 ? <p>Loading...</p> : (
        messages.map((msg) => (
          <div key={msg.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <p><strong>{msg.sender}:</strong> {msg.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
