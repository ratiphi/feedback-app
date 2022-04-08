import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <div className="admin-header">
      <h3>Admin Console</h3>
      <div className="home-link">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default AdminHeader;
