// src/components/UserProfile.jsx
const UserProfile = (props) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "16px",
      maxWidth: "250px",
      margin: "16px auto",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2>{props.name}</h2>
      <p><strong>Age:</strong> {props.age}</p>
       <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
