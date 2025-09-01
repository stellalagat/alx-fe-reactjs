// src/components/UserProfile.jsx
const UserProfile = (props) => {
  return (
    <div style={{
    border: '1px solid gray', padding: '15px', margin: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' 
    }}>
      <h2 style={{ color: 'blue', marginBottom: '10px' }}>{props.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold', color: 'darkgreen' }}>{props.age}</span></p>
       <p>Bio:style={{ fontStyle: 'italic', color: 'gray' }} {props.bio}</p>
    </div>
  );
};

export default UserProfile;
