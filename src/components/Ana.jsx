import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/C.png";
import style from "../style/Dashboard.module.css";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { LuLink } from "react-icons/lu";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import Modal from "./Modal";


function Ana() {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState("#adb5bd");
  const [activeMenu, setActiveMenu] = useState("Analytics");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [links, setLinks] = useState([]); // Your list of links
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
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

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    navigate("/login"); // Redirect to login page
  };

  const filteredLinks = links.filter((link) =>
    link.remarks?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedLinks = [...links].sort((a, b) => {
      if (key === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return direction === "ascending" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setLinks(sortedLinks); // Update the table with sorted links
  };

  const navigate = useNavigate();

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("https://short-url-back-48bn.onrender.com/api/user/details", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        // Capture status and body for debugging
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setUserData(data);

      // Save email in localStorage (only if data.email exists)
      if (data.email) {
        localStorage.setItem("userEmail", data.email);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message || error);
    }
  };

  const fetchLinksByEmail = async (
    email,
    page = 1,
    limit = 8,
    searchTerm = "",
    pageType = "Analytics"
  ) => {
    try {
      const response = await fetch(
        `https://short-url-back-48bn.onrender.com/api/url?email=${email}&pageType=${pageType}&page=${page}&limit=${limit}&search=${searchTerm}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Error fetching links");

      const data = await response.json();
      console.log(data.data);
      setLinks(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  // Update the useEffect to call fetch with searchTerm
  useEffect(() => {
    if (userData?.email) {
      fetchLinksByEmail(userData.email, currentPage, 8, searchTerm);
    }
  }, [userData, currentPage, searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      setBgColor(generateColorFromString(userData.name));
      fetchLinksByEmail(userData.email); // Fetch links on user data load
    }
  }, [userData]);

  const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 80%)`;
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const datePart = new Date(dateString).toLocaleDateString("en-US", options);
    const timePart = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    });
    return `${datePart} ${timePart}`;
  };


  // Function to handle the deletion

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
        {/* Main Content */}
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
                <button
                  className={style.createNewButton}
                  onClick={() => setIsModalVisible(true)}
                >
                  <FiPlus /> &nbsp;Create New
                </button>
                <div className={style.searchContainer}>
                  <CiSearch className={style.searchIcon} />
                  <input
                    type="search"
                    placeholder="Search by remarks"
                    className={style.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div
                className={style.userAvatar}
                style={{ backgroundColor: bgColor, position: "relative" }}
                onClick={() => setShowPopup(!showPopup)} // Toggle popup
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

          <div className={style.linksContainer}>
          <div className={style.tableWrapper}>
    <table className={style.table}>
      <thead>
        <tr>
          <th onClick={() => sortData("createdAt")}>TimeStamp</th>
          <th>Original Link</th>
          <th style={{ width: "20%" }}>Short Link</th>
          <th>IP Address</th>
          <th>User Device</th>
        </tr>
      </thead>
      <tbody>
        {filteredLinks.map((link) => (
          <tr key={link._id}>
            <td>{formatDate(link.timestamp)}</td>
            <td>
              <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                {link.originalUrl}
              </a>
            </td>
            <td><a>{link.shortUrl}</a></td>
            <td>{link.ip}</td>
            <td>{link.device || "Unknown Device"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>            {/* Pagination */}
            <div className={style.paginationContainer}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={style.pageButton}
              >
                &lt;
              </button>

              {currentPage > 2 && (
                <button
                  className={style.pageButton}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
              )}

              {currentPage > 3 && <span className={style.dots}>...</span>}

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (pageNumber) =>
                    pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1
                )
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`${style.pageButton} ${
                      pageNumber === currentPage ? style.active : ""
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

              {currentPage < totalPages - 2 && (
                <span className={style.dots}>...</span>
              )}

              {currentPage < totalPages - 1 && (
                <button
                  className={style.pageButton}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={style.pageButton}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && <Modal closeModal={() => setIsModalVisible(false)} />}
      {showPopup && (
        <div className={style.popup}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Ana;
