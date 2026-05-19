import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="profile"
          />

          <h1>My Profile 👤</h1>
        </div>

        <div className="profile-info">
          <p>
            <span>Name</span>
            {user.name}
          </p>

          <p>
            <span>Email</span>
            {user.email}
          </p>

          <p>
            <span>Account Type</span>
            {user.isAdmin ? "Admin" : "Customer"}
          </p>
        </div>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;