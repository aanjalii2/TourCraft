import { useEffect, useState } from "react";
import { Person as ProfileIcon } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "../app/slices/authSlice";
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/api/Customuser/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response Data:", response.data); // Log response data
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error); // Log error
      toast.error("Error fetching profile data");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Token:", token); // Log token
    if (token && userId) {
      fetchProfileData();
    }
  }, [token, userId]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : profileData ? (
          <div className="profile-content">
            <div className="profile-info">
              <ProfileIcon
                sx={{
                  width: 80,
                  height: 80,
                  marginRight: 4,
                  backgroundColor: "#146190",
                }}
              />
              <div>
                <div className="info-row">
                  <span className="info-label">Name:</span> {profileData.name}
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span> {profileData.email}
                </div>
              </div>
            </div>
            <div className="additional-info">
              <div className="info-row">
                <span className="info-label">Nationality:</span>{" "}
                {profileData.nationality}
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span> {profileData.phonenumber}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data-message">No profile data available</div>
        )}
      </div>
    </div>
  );
};

export default Profile;