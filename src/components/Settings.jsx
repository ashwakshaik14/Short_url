import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/C.png";
import style from "../style/Settings.module.css";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

function Settings() {
  const [userData, setUserData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Settings");
  const [bgColor, setBgColor] = useState("#adb5bd");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Get the current hour
    const currentHour = new Date().getHours();

    // Set greeting and emoji based on the time of day
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
      setEmoji("🌞"); // Morning sun
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
      setEmoji("🌞"); // Afternoon sun
    } else if (currentHour >= 18 && currentHour < 21) {
      setGreeting("Good evening");
      setEmoji("🌅"); // Evening sun
    } else {
      setGreeting("Good night");
      setEmoji("🌙"); // Night moon
    }

    // Get current date, month, and day
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options);
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/user/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes to user details
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Changes saved successfully!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Failed to save changes: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to save changes.");
    }
  };

  // Delete the user account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/user/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.removeItem("token");
          // Redirect to login or homepage
          window.location.href = "/";
          navigate("/login");
        } else {
          const errorData = await response.json();
          alert(`Failed to delete account: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    navigate("/login"); // Redirect to login page
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setBgColor(generateColorFromString(userData.name));
    }
  }, [userData]);

  const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 80%)`;
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/details", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userEmail", data.email); // Save email in localStorage
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {/* Sidebar */}
        <nav className={style.sidebar}>
          <img src={logo} alt="logo" className={style.logo} />
          <div className={style.menuItems}>
            {["Dashboard", "Links", "Analytics", "Settings"].map((menu) => (
              <div key={menu}>
                <button
                  className={`${style.sidebarButton} ${
                    activeMenu === menu ? style.active : ""
                  }`}
                  onClick={() => {
                    setActiveMenu(menu);
                    navigate(`/${menu.toLowerCase()}`);
                  }}
                >
                  {menu === "Dashboard" && <FaRegEnvelopeOpen className={style.ic}/>}
                  {menu === "Links" && <LuLink className={style.ic}/>}
                  {menu === "Analytics" && <HiMiniArrowTrendingUp className={style.ic}/>}
                  {menu === "Settings" && <IoSettingsOutline className={style.ic}/>}
                  &nbsp; {menu}
                </button>
                {menu === "Analytics" && <hr className={style.divider} />}
              </div>
            ))}
          </div>
        </nav>
        <div className={style.mainContent}>
          <div className={style.navbar}>
            <div className={style.navTitle}>
              <div>
                {emoji} {greeting}, {userData.name}
              </div>
              <div style={{ color: "#6c757d" }}>{date}</div>
            </div>
            <div className={style.userInfo}>
              <div className={style.bands}>
                <button className={style.createNewButton}>
                  <FiPlus /> &nbsp;Create New
                </button>
                <div className={style.searchContainer}>
                  <CiSearch className={style.searchIcon} />
                  <input
                    type="search"
                    placeholder="Search by remarks"
                    className={style.searchInput}
                  />
                </div>
              </div>
              <div
                className={style.userAvatar}
                style={{
                  backgroundColor: bgColor,
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => setShowPopup(!showPopup)}
              >
                {userData.name
                  .split(" ")
                  .map((word, index) =>
                    index === 0 || index === userData.name.split(" ").length - 1
                      ? word.charAt(0).toUpperCase()
                      : ""
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <div className={style.das}>
            <div className={style.formRow}>
              <label className={style.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={style.inputField}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={style.inputField}
              />
            </div>
            <div className={style.formRow}>
              <label className={style.label}>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={style.inputField}
              />
            </div>
            <button onClick={handleSaveChanges} className={style.saveButton}>
              Save Changes
            </button>
            <button
              onClick={handleDeleteAccount}
              className={style.deleteButton}
            >
              Delete Account
            </button>
          </div>

          {showPopup && (
            <div className={style.popup}>
              <button onClick={handleLogout} className={style.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
