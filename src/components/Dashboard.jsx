// // // export default Dashboard;

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import logo from "../assets/C.png";
// // import style from "../style/Dashboard.module.css";
// // import { FaRegEnvelopeOpen } from "react-icons/fa";
// // import { LuLink } from "react-icons/lu";
// // import { HiMiniArrowTrendingUp } from "react-icons/hi2";
// // import { IoSettingsOutline } from "react-icons/io5";
// // import { FiPlus } from "react-icons/fi";
// // import { CiSearch } from "react-icons/ci";
// // import Modal from "./Modal";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // function Dashboard() {
// //   const [userData, setUserData] = useState(null);
// //   const [bgColor, setBgColor] = useState("#adb5bd");
// //   const [activeMenu, setActiveMenu] = useState("Dashboard");
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const [links, setLinks] = useState([]); // Your list of links
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showPopup, setShowPopup] = useState(false); // State for popup visibility
// //   const [greeting, setGreeting] = useState("");
// //   const [emoji, setEmoji] = useState("");
// //   const [date, setDate] = useState("");
// //   const [clicks, setClicks] = useState("0");

// //   const [dateWiseClicks, setDateWiseClicks] = useState([]); // Store date-wise clicks
// //   const [deviceWiseClicks, setDeviceWiseClicks] = useState([]); // Store device-wise clicks

// //   const [dateChartData, setDateChartData] = useState({});
// //   const [deviceChartData, setDeviceChartData] = useState({});

// //   useEffect(() => {
// //     // Date-wise clicks chart data
// //     const dateLabels = dateWiseClicks.map((item) => item.date);
// //     const dateClicks = dateWiseClicks.map(
// //       (item) => item.cumulativeClicksForDay
// //     );

// //     setDateChartData({
// //       labels: dateLabels,
// //       datasets: [
// //         {
// //           label: "Clicks",
// //           data: dateClicks,
// //           backgroundColor: "#1B48DA", // Blue color for bars
// //           borderColor: "rgba(54, 162, 235, 1)", // Darker blue for borders
// //           borderWidth: 1,
// //         },
// //       ],
// //     });

// //     // Device-wise clicks chart data
// //     const deviceLabels = deviceWiseClicks.map((item) => item.device);
// //     const deviceClicks = deviceWiseClicks.map((item) => item.clicks);

// //     setDeviceChartData({
// //       labels: deviceLabels,
// //       datasets: [
// //         {
// //           label: "Clicks",
// //           data: deviceClicks,
// //           backgroundColor: "#1B48DA", // Red color for bars
// //           borderColor: "rgba(54, 162, 235, 1)", // Darker red for borders
// //           borderWidth: 1,
// //         },
// //       ],
// //     });
// //   }, [dateWiseClicks, deviceWiseClicks]);

// //   useEffect(() => {
// //     // Get the current hour
// //     const currentHour = new Date().getHours();

// //     // Set greeting and emoji based on the time of day
// //     if (currentHour >= 5 && currentHour < 12) {
// //       setGreeting("Good morning");
// //       setEmoji("🌞"); // Morning sun
// //     } else if (currentHour >= 12 && currentHour < 18) {
// //       setGreeting("Good afternoon");
// //       setEmoji("🌞"); // Afternoon sun
// //     } else if (currentHour >= 18 && currentHour < 21) {
// //       setGreeting("Good evening");
// //       setEmoji("🌅"); // Evening sun
// //     } else {
// //       setGreeting("Good night");
// //       setEmoji("🌙"); // Night moon
// //     }

// //     // Get current date, month, and day
// //     const options = { weekday: "short", month: "short", day: "numeric" };
// //     const formattedDate = new Date().toLocaleDateString("en-US", options);
// //     setDate(formattedDate);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // Remove user token
// //     navigate("/login"); // Redirect to login page
// //   };

// //   const navigate = useNavigate();

// //   const fetchUserDetails = async (token) => {
// //     try {
// //       const response = await fetch(
// //         "https://short-url-back-48bn.onrender.com/api/user/details",
// //         {
// //           method: "GET",
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (!response.ok) throw new Error("Failed to fetch user details");
// //       const data = await response.json();
// //       setUserData(data);
// //       localStorage.setItem("userEmail", data.email); // Save email in localStorage
// //     } catch (error) {
// //       console.error("Error fetching user details:", error);
// //     }
// //   };

// //   const fetchLinksByEmail = async (
// //     email,
// //     page = 1,
// //     limit = 8,
// //     searchTerm = ""
// //   ) => {
// //     try {
// //       const response = await fetch(
// //         `https://short-url-back-48bn.onrender.com/api/url?email=${email}&page=${page}&limit=${limit}&search=${searchTerm}`,
// //         {
// //           method: "GET",
// //         }
// //       );
// //       if (!response.ok) throw new Error("Error fetching links");

// //       const data = await response.json();
// //       setLinks(data.data);
// //     } catch (error) {
// //       console.error("Error fetching URLs:", error);
// //     }
// //   };

//   // const fetchClicksData = async (email) => {
//   //   try {
//   //     const response = await fetch(
//   //       `https://short-url-back-48bn.onrender.com/api/dash/clicks?email=${email}`,
//   //       {
//   //         method: "GET",
//   //       }
//   //     );

//   //     // Read the response body as text first, for logging
//   //     const rawResponseBody = await response.text();
//   //     console.log("Raw Response Bod:", rawResponseBody);

//   //     if (!response.ok) throw new Error("Error fetching clicks data");

//   //     // Parse the raw response body into JSON
//   //     const data = JSON.parse(rawResponseBody); // Use JSON.parse to avoid consuming the stream twice

//   //     console.log("Parsed Data:", data); // Check if data is being parsed correctly

//   //     setClicks(data.totalClicks); // Set total clicks
//   //     setDateWiseClicks(data.dailyClicks); // Set date-wise clicks
//   //     setDeviceWiseClicks(data.totalDeviceClicks); // Correctly set device-wise clicks

//   //     console.log("Device Wise Clicks:", data.totalDeviceClicks); // This should now log the correct data
//   //     console.log("date wise clicks", data.dailyClicks);
//   //   } catch (error) {
//   //     console.error("Error fetching clicks data:", error);
//   //   }
//   // };

// //   useEffect(() => {
// //     if (userData) {
// //       setBgColor(generateColorFromString(userData.name));
// //       fetchLinksByEmail(userData.email); // Fetch links on user data load
// //       fetchClicksData(userData.email); // Fetch clicks data for the user
// //     }
// //   }, [userData]);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       alert("You are not logged in!");
// //       navigate("/login");
// //     } else {
// //       fetchUserDetails(token);
// //     }
// //   }, [navigate]);

// //   useEffect(() => {
// //     if (userData) {
// //       setBgColor(generateColorFromString(userData.name));
// //       fetchLinksByEmail(userData.email); // Fetch links on user data load
// //     }
// //   }, [userData]);

// //   const generateColorFromString = (str) => {
// //     let hash = 0;
// //     for (let i = 0; i < str.length; i++) {
// //       hash = str.charCodeAt(i) + ((hash << 5) - hash);
// //     }
// //     return `hsl(${hash % 360}, 70%, 80%)`;
// //   };

// //   if (!userData) return <p>Loading...</p>;

// //   return (
// //     <>
// //       <div className={style.container}>
// //         <nav className={style.sidebar}>
// //           <img src={logo} alt="logo" className={style.logo} />
// //           <div className={style.menuItems}>
// //             {["Dashboard", "Links", "Analytics", "Settings"].map((menu) => (
// //               <div key={menu}>
// //                 <button
// //                   className={`${style.sidebarButton} ${
// //                     activeMenu === menu ? style.active : ""
// //                   }`}
// //                   onClick={() => {
// //                     setActiveMenu(menu);
// //                     navigate(`/${menu.toLowerCase()}`);
// //                   }}
// //                 >
// //                   {menu === "Dashboard" && (
// //                     <FaRegEnvelopeOpen className={style.ic} />
// //                   )}
// //                   {menu === "Links" && <LuLink className={style.ic} />}
// //                   {menu === "Analytics" && (
// //                     <HiMiniArrowTrendingUp className={style.ic} />
// //                   )}
// //                   {menu === "Settings" && (
// //                     <IoSettingsOutline className={style.ic} />
// //                   )}
// //                   &nbsp; {menu}
// //                 </button>
// //                 {menu === "Analytics" && <hr className={style.divider} />}
// //               </div>
// //             ))}
// //           </div>
// //         </nav>

// //         <div className={style.mainContent}>
// //           <div className={style.navbar}>
// //             <div className={style.navTitle}>
// //               <div>
// //                 {emoji} {greeting}, {userData.name}
// //               </div>
// //               <div style={{ color: "#6c757d" }}>{date}</div>
// //             </div>
// //             <div className={style.userInfo}>
// //               <div className={style.bands}>
// //                 <button
// //                   className={style.createNewButton}
// //                   onClick={() => setIsModalVisible(true)}
// //                 >
// //                   <FiPlus /> &nbsp;Create New
// //                 </button>
// //                 <div className={style.searchContainer}>
// //                   <CiSearch className={style.searchIcon} />
// //                   <input
// //                     type="search"
// //                     placeholder="Search by remarks"
// //                     className={style.searchInput}
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                   />
// //                 </div>
// //               </div>
// //               <button className={style.logoutButton} onClick={handleLogout}>
// //                 Logout
// //               </button>
// //             </div>
// //           </div>

// //           <div className={style.dashboardContent}>
// //             <div className={style.section}>
// //               <h2>Overview</h2>
// //               <p>Total Clicks: {clicks}</p>
// //             </div>

// //             <div className={style.section}>
// //               <h3>Date-wise Clicks</h3>
// //               <Bar data={dateChartData} />
// //             </div>

// //             <div className={style.section}>
// //               <h3>Device-wise Clicks</h3>
// //               <Bar data={deviceChartData} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {isModalVisible && (
// //         <Modal onClose={() => setIsModalVisible(false)}>
// //           <h2>Create a New Link</h2>
// //           {/* Modal content goes here */}
// //         </Modal>
// //       )}
// //     </>
// //   );
// // }

// // export default Dashboard;

// // Dashboard Component
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/C.png";
// import style from "../style/Dashboard.module.css";
// import { FaRegEnvelopeOpen } from "react-icons/fa";
// import { LuLink } from "react-icons/lu";
// import { HiMiniArrowTrendingUp } from "react-icons/hi2";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FiPlus } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
// import Modal from "./Modal";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [userData, setUserData] = useState(null);
//   const [bgColor, setBgColor] = useState("#adb5bd");
//   const [activeMenu, setActiveMenu] = useState("Dashboard");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [links, setLinks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [greeting, setGreeting] = useState("");
//   const [emoji, setEmoji] = useState("");
//   const [date, setDate] = useState("");
//   const [clicks, setClicks] = useState("0");

//   const [dateWiseClicks, setDateWiseClicks] = useState([]);
//   const [deviceWiseClicks, setDeviceWiseClicks] = useState([]);

//   const [dateChartData, setDateChartData] = useState({});
//   const [deviceChartData, setDeviceChartData] = useState({});

//   useEffect(() => {
//     const dateLabels = dateWiseClicks.map((item) => item.date);
//     const dateClicks = dateWiseClicks.map(
//       (item) => item.clicks
//     );

//     setDateChartData({
//       labels: dateLabels,
//       datasets: [
//         {
//           label: "Clicks",
//           data: dateClicks,
//           backgroundColor: "#1B48DA",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });

//     const deviceLabels = deviceWiseClicks.map((item) => item.device);
//     const deviceClicks = deviceWiseClicks.map((item) => item.clicks);

//     setDeviceChartData({
//       labels: deviceLabels,
//       datasets: [
//         {
//           label: "Clicks",
//           data: deviceClicks,
//           backgroundColor: "#1B48DA",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//   }, [dateWiseClicks, deviceWiseClicks]);

//   useEffect(() => {
//     const currentHour = new Date().getHours();

//     if (currentHour >= 5 && currentHour < 12) {
//       setGreeting("Good morning");
//       setEmoji("🌞");
//     } else if (currentHour >= 12 && currentHour < 18) {
//       setGreeting("Good afternoon");
//       setEmoji("🌞");
//     } else if (currentHour >= 18 && currentHour < 21) {
//       setGreeting("Good evening");
//       setEmoji("🌅");
//     } else {
//       setGreeting("Good night");
//       setEmoji("🌙");
//     }

//     const options = { weekday: "short", month: "short", day: "numeric" };
//     const formattedDate = new Date().toLocaleDateString("en-US", options);
//     setDate(formattedDate);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const navigate = useNavigate();

//   const fetchUserDetails = async (token) => {
//     try {
//       const response = await fetch("https://short-url-back-48bn.onrender.com/api/user/details", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error("Failed to fetch user details");
//       const data = await response.json();
//       setUserData(data);
//       localStorage.setItem("userEmail", data.email);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const fetchLinksByEmail = async (
//     email,
//     page = 1,
//     limit = 8,
//     searchTerm = ""
//   ) => {
//     try {
//       const response = await fetch(
//         `https://short-url-back-48bn.onrender.com/api/url?email=${email}&page=${page}&limit=${limit}&search=${searchTerm}`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) throw new Error("Error fetching links");

//       const data = await response.json();
//       setLinks(data.data);
//     } catch (error) {
//       console.error("Error fetching URLs:", error);
//     }
//   };

//   // const fetchClicksData = async (email) => {
//   //   try {
//   //     const response = await fetch(
//   //       `https://short-url-back-48bn.onrender.com/api/url/clicks?email=${email}`,
//   //       {
//   //         method: "GET",
//   //       }
//   //     );

//   //     if (!response.ok) throw new Error("Error fetching clicks data");
//   //     const data = await response.json();
//   //     setClicks(data.totalClicks);
//   //     setDateWiseClicks(data.dailyClicks);
//   //     setDeviceWiseClicks(data.totalDeviceClicks);
//   //   } catch (error) {
//   //     console.error("Error fetching clicks data:", error);
//   //   }
//   // };

//   const fetchClicksData = async (email) => {
//     try {
//       const response = await fetch(
//         `https://short-url-back-48bn.onrender.com/api/dash/clicks?email=${email}`,
//         {
//           method: "GET",
//         }
//       );
  
//       // Read the response body as text first, for logging
//       const rawResponseBody = await response.text();
//       console.log("Raw Response Bod:", rawResponseBody);
  
//       if (!response.ok) throw new Error("Error fetching clicks data");
  
//       // Parse the raw response body into JSON
//       const data = JSON.parse(rawResponseBody); // Use JSON.parse to avoid consuming the stream twice
  
//       console.log("Parsed Data:", data); // Check if data is being parsed correctly
  
//       // Use correct keys based on the response structure
//       setClicks(data.totalClicks || 0);
//       setDateWiseClicks(data.dateWiseClicks || []); // Use 'dateWiseClicks'
//       setDeviceWiseClicks(data.deviceWiseClicks || []); // Use 'deviceWiseClicks'
  
//       console.log("Total Clicks:", data.totalClicks);
//       console.log("Device Wise Clicks:", data.deviceWiseClicks); // Log the correct data
//       console.log("Date Wise Clicks:", data.dateWiseClicks); // Log the correct data
//     } catch (error) {
//       console.error("Error fetching clicks data:", error);
//     }
//   };
  

//   useEffect(() => {
//     if (userData) {
//       setBgColor(generateColorFromString(userData.name));
//       fetchLinksByEmail(userData.email);
//       fetchClicksData(userData.email);
//     }
//   }, [userData]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You are not logged in!");
//       navigate("/login");
//     } else {
//       fetchUserDetails(token);
//     }
//   }, [navigate]);

//   const generateColorFromString = (str) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return `hsl(${hash % 360}, 70%, 80%)`;
//   };

//   if (!userData) return <p>Loading...</p>;

//   return (
//     <>
//       <div className={style.container}>
//         <nav className={style.sidebar}>
//           <img src={logo} alt="logo" className={style.logo} />
//           <div className={style.menuItems}>
//             {["Dashboard", "Links", "Analytics", "Settings"].map((menu) => (
//               <div key={menu}>
//                 <button
//                   className={`${style.sidebarButton} ${
//                     activeMenu === menu ? style.active : ""
//                   }`}
//                   onClick={() => {
//                     setActiveMenu(menu);
//                     navigate(`/${menu.toLowerCase()}`);
//                   }}
//                 >
//                   {menu === "Dashboard" && <FaRegEnvelopeOpen className={style.ic}/>}
//                   {menu === "Links" && <LuLink className={style.ic}/>}
//                   {menu === "Analytics" && <HiMiniArrowTrendingUp className={style.ic}/>}
//                   {menu === "Settings" && <IoSettingsOutline className={style.ic}/>}
//                   &nbsp; {menu}
//                 </button>
//                 {menu === "Analytics" && <hr className={style.divider} />}
//               </div>
//             ))}
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className={style.mainContent}>
//           <div className={style.navbar}>
//             {/* <div className={style.navTitle}>Good morning, {userData.name}</div> */}
//             <div className={style.navTitle}>
//               <div>
//                 {emoji} {greeting}, {userData.name}
//               </div>
//               <div style={{ color: "#6c757d" }}>{date}</div>
//             </div>
//             <div className={style.userInfo}>
//               <div className={style.bands}>
//                 <button
//                   className={style.createNewButton}
//                   onClick={() => setIsModalVisible(true)}
//                 >
//                   <FiPlus /> &nbsp;Create New
//                 </button>
//                 <div className={style.searchContainer}>
//                   <CiSearch className={style.searchIcon} />
//                   <input
//                     type="search"
//                     placeholder="Search by remarks"
//                     className={style.searchInput}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div
//                 className={style.userAvatar}
//                 style={{ backgroundColor: bgColor, position: "relative" }}
//                 onClick={() => setShowPopup(!showPopup)} // Toggle popup
//               >
//                 {userData.name
//                   .split(" ")
//                   .map((word, index) =>
//                     index === 0 || index === userData.name.split(" ").length - 1
//                       ? word.charAt(0).toUpperCase()
//                       : ""
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>

//           <div className={style.das}>
//             <p>
//               Total Clicks &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <span style={{ color: "#1B48DA" }}>{clicks}</span>
//             </p>
//             <div className={style.graph}>
//               <div className={style.card}>
//                 <h3 className={style.cardTitle}>Date-wise Clicks</h3>

//                 <Bar
//                   data={dateChartData}
//                   options={{
//                     indexAxis: "y",
//                     responsive: true,
//                     scales: {
//                       x: {
//                         beginAtZero: true,
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               {/* Device-wise Clicks */}
//               <div className={style.card}>
//                 <h3 className={style.cardTitle}>Device-wise Clicks</h3>

//                 <Bar
//                   data={deviceChartData}
//                   options={{
//                     indexAxis: "y",
//                     responsive: true,
//                     scales: {
//                       x: {
//                         beginAtZero: true,
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalVisible && <Modal closeModal={() => setIsModalVisible(false)} />}
//       {showPopup && (
//         <div className={style.popup}>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard;























































// // export default Dashboard;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/C.png";
// import style from "../style/Dashboard.module.css";
// import { FaRegEnvelopeOpen } from "react-icons/fa";
// import { LuLink } from "react-icons/lu";
// import { HiMiniArrowTrendingUp } from "react-icons/hi2";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FiPlus } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
// import Modal from "./Modal";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [userData, setUserData] = useState(null);
//   const [bgColor, setBgColor] = useState("#adb5bd");
//   const [activeMenu, setActiveMenu] = useState("Dashboard");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [links, setLinks] = useState([]); // Your list of links
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPopup, setShowPopup] = useState(false); // State for popup visibility
//   const [greeting, setGreeting] = useState("");
//   const [emoji, setEmoji] = useState("");
//   const [date, setDate] = useState("");
//   const [clicks, setClicks] = useState("0");

//   const [dateWiseClicks, setDateWiseClicks] = useState([]); // Store date-wise clicks
//   const [deviceWiseClicks, setDeviceWiseClicks] = useState([]); // Store device-wise clicks

//   const [dateChartData, setDateChartData] = useState({});
//   const [deviceChartData, setDeviceChartData] = useState({});

//   useEffect(() => {
//     // Date-wise clicks chart data
//     const dateLabels = dateWiseClicks.map((item) => item.date);
//     const dateClicks = dateWiseClicks.map(
//       (item) => item.cumulativeClicksForDay
//     );

//     setDateChartData({
//       labels: dateLabels,
//       datasets: [
//         {
//           label: "Clicks",
//           data: dateClicks,
//           backgroundColor: "#1B48DA", // Blue color for bars
//           borderColor: "rgba(54, 162, 235, 1)", // Darker blue for borders
//           borderWidth: 1,
//         },
//       ],
//     });

//     // Device-wise clicks chart data
//     const deviceLabels = deviceWiseClicks.map((item) => item.device);
//     const deviceClicks = deviceWiseClicks.map((item) => item.clicks);

//     setDeviceChartData({
//       labels: deviceLabels,
//       datasets: [
//         {
//           label: "Clicks",
//           data: deviceClicks,
//           backgroundColor: "#1B48DA", // Red color for bars
//           borderColor: "rgba(54, 162, 235, 1)", // Darker red for borders
//           borderWidth: 1,
//         },
//       ],
//     });
//   }, [dateWiseClicks, deviceWiseClicks]);

//   useEffect(() => {
//     // Get the current hour
//     const currentHour = new Date().getHours();

//     // Set greeting and emoji based on the time of day
//     if (currentHour >= 5 && currentHour < 12) {
//       setGreeting("Good morning");
//       setEmoji("🌞"); // Morning sun
//     } else if (currentHour >= 12 && currentHour < 18) {
//       setGreeting("Good afternoon");
//       setEmoji("🌞"); // Afternoon sun
//     } else if (currentHour >= 18 && currentHour < 21) {
//       setGreeting("Good evening");
//       setEmoji("🌅"); // Evening sun
//     } else {
//       setGreeting("Good night");
//       setEmoji("🌙"); // Night moon
//     }

//     // Get current date, month, and day
//     const options = { weekday: "short", month: "short", day: "numeric" };
//     const formattedDate = new Date().toLocaleDateString("en-US", options);
//     setDate(formattedDate);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove user token
//     navigate("/login"); // Redirect to login page
//   };

//   const navigate = useNavigate();

//   const fetchUserDetails = async (token) => {
//     try {
//       const response = await fetch(
//         "https://short-url-back-48bn.onrender.com/api/user/details",
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch user details");
//       const data = await response.json();
//       setUserData(data);
//       localStorage.setItem("userEmail", data.email); // Save email in localStorage
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const fetchLinksByEmail = async (
//     email,
//     page = 1,
//     limit = 8,
//     searchTerm = ""
//   ) => {
//     try {
//       const response = await fetch(
//         `https://short-url-back-48bn.onrender.com/api/url?email=${email}&page=${page}&limit=${limit}&search=${searchTerm}`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) throw new Error("Error fetching links");

//       const data = await response.json();
//       setLinks(data.data);
//     } catch (error) {
//       console.error("Error fetching URLs:", error);
//     }
//   };

  // const fetchClicksData = async (email) => {
  //   try {
  //     const response = await fetch(
  //       `https://short-url-back-48bn.onrender.com/api/dash/clicks?email=${email}`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     // Read the response body as text first, for logging
  //     const rawResponseBody = await response.text();
  //     console.log("Raw Response Bod:", rawResponseBody);

  //     if (!response.ok) throw new Error("Error fetching clicks data");

  //     // Parse the raw response body into JSON
  //     const data = JSON.parse(rawResponseBody); // Use JSON.parse to avoid consuming the stream twice

  //     console.log("Parsed Data:", data); // Check if data is being parsed correctly

  //     setClicks(data.totalClicks); // Set total clicks
  //     setDateWiseClicks(data.dailyClicks); // Set date-wise clicks
  //     setDeviceWiseClicks(data.totalDeviceClicks); // Correctly set device-wise clicks

  //     console.log("Device Wise Clicks:", data.totalDeviceClicks); // This should now log the correct data
  //     console.log("date wise clicks", data.dailyClicks);
  //   } catch (error) {
  //     console.error("Error fetching clicks data:", error);
  //   }
  // };

//   useEffect(() => {
//     if (userData) {
//       setBgColor(generateColorFromString(userData.name));
//       fetchLinksByEmail(userData.email); // Fetch links on user data load
//       fetchClicksData(userData.email); // Fetch clicks data for the user
//     }
//   }, [userData]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You are not logged in!");
//       navigate("/login");
//     } else {
//       fetchUserDetails(token);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userData) {
//       setBgColor(generateColorFromString(userData.name));
//       fetchLinksByEmail(userData.email); // Fetch links on user data load
//     }
//   }, [userData]);

//   const generateColorFromString = (str) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return `hsl(${hash % 360}, 70%, 80%)`;
//   };

//   if (!userData) return <p>Loading...</p>;

//   return (
//     <>
//       <div className={style.container}>
//         <nav className={style.sidebar}>
//           <img src={logo} alt="logo" className={style.logo} />
//           <div className={style.menuItems}>
//             {["Dashboard", "Links", "Analytics", "Settings"].map((menu) => (
//               <div key={menu}>
//                 <button
//                   className={`${style.sidebarButton} ${
//                     activeMenu === menu ? style.active : ""
//                   }`}
//                   onClick={() => {
//                     setActiveMenu(menu);
//                     navigate(`/${menu.toLowerCase()}`);
//                   }}
//                 >
//                   {menu === "Dashboard" && (
//                     <FaRegEnvelopeOpen className={style.ic} />
//                   )}
//                   {menu === "Links" && <LuLink className={style.ic} />}
//                   {menu === "Analytics" && (
//                     <HiMiniArrowTrendingUp className={style.ic} />
//                   )}
//                   {menu === "Settings" && (
//                     <IoSettingsOutline className={style.ic} />
//                   )}
//                   &nbsp; {menu}
//                 </button>
//                 {menu === "Analytics" && <hr className={style.divider} />}
//               </div>
//             ))}
//           </div>
//         </nav>

//         <div className={style.mainContent}>
//           <div className={style.navbar}>
//             <div className={style.navTitle}>
//               <div>
//                 {emoji} {greeting}, {userData.name}
//               </div>
//               <div style={{ color: "#6c757d" }}>{date}</div>
//             </div>
//             <div className={style.userInfo}>
//               <div className={style.bands}>
//                 <button
//                   className={style.createNewButton}
//                   onClick={() => setIsModalVisible(true)}
//                 >
//                   <FiPlus /> &nbsp;Create New
//                 </button>
//                 <div className={style.searchContainer}>
//                   <CiSearch className={style.searchIcon} />
//                   <input
//                     type="search"
//                     placeholder="Search by remarks"
//                     className={style.searchInput}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button className={style.logoutButton} onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className={style.dashboardContent}>
//             <div className={style.section}>
//               <h2>Overview</h2>
//               <p>Total Clicks: {clicks}</p>
//             </div>

//             <div className={style.section}>
//               <h3>Date-wise Clicks</h3>
//               <Bar data={dateChartData} />
//             </div>

//             <div className={style.section}>
//               <h3>Device-wise Clicks</h3>
//               <Bar data={deviceChartData} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalVisible && (
//         <Modal onClose={() => setIsModalVisible(false)}>
//           <h2>Create a New Link</h2>
//           {/* Modal content goes here */}
//         </Modal>
//       )}
//     </>
//   );
// }

// export default Dashboard;

// Dashboard Component
import { useState, useEffect } from "react";
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState("#adb5bd");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState("");
  const [clicks, setClicks] = useState("0");

  const [dateWiseClicks, setDateWiseClicks] = useState([]);
  const [deviceWiseClicks, setDeviceWiseClicks] = useState([]);

  const [dateChartData, setDateChartData] = useState({});
  const [deviceChartData, setDeviceChartData] = useState({});

  useEffect(() => {
    const dateLabels = dateWiseClicks.map((item) => item.date);
    const dateClicks = dateWiseClicks.map(
      (item) => item.cumulativeClicks
    );

    setDateChartData({
      labels: dateLabels,
      datasets: [
        {
          label: "Clicks",
          data: dateClicks,
          backgroundColor: "#1B48DA",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });

    const deviceLabels = deviceWiseClicks.map((item) => item.device);
    const deviceClicks = deviceWiseClicks.map((item) => item.clicks);

    setDeviceChartData({
      labels: deviceLabels,
      datasets: [
        {
          label: "Clicks",
          data: deviceClicks,
          backgroundColor: "#1B48DA",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [dateWiseClicks, deviceWiseClicks]);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
      setEmoji("🌞");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
      setEmoji("🌞");
    } else if (currentHour >= 18 && currentHour < 21) {
      setGreeting("Good evening");
      setEmoji("🌅");
    } else {
      setGreeting("Good night");
      setEmoji("🌙");
    }

    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options);
    setDate(formattedDate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigate = useNavigate();

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("https://short-url-back-48bn.onrender.com/api/user/details", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      setUserData(data);
      localStorage.setItem("userEmail", data.email);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchLinksByEmail = async (
    email,
    page = 1,
    limit = 8,
    searchTerm = ""
  ) => {
    try {
      const response = await fetch(
        `https://short-url-back-48bn.onrender.com/api/url?email=${email}&page=${page}&limit=${limit}&search=${searchTerm}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Error fetching links");

      const data = await response.json();
      setLinks(data.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  // const fetchClicksData = async (email) => {
  //   try {
  //     const response = await fetch(
  //       `https://short-url-back-48bn.onrender.com/api/url/clicks?email=${email}`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     if (!response.ok) throw new Error("Error fetching clicks data");
  //     const data = await response.json();
  //     setClicks(data.totalClicks);
  //     setDateWiseClicks(data.dailyClicks);
  //     setDeviceWiseClicks(data.totalDeviceClicks);
  //   } catch (error) {
  //     console.error("Error fetching clicks data:", error);
  //   }
  // };

  const fetchClicksData = async (email) => {
    try {
      const response = await fetch(
        `https://short-url-back-48bn.onrender.com/api/dash/clicks?email=${email}`,
        {
          method: "GET",
        }
      );
  
      // Read the response body as text first, for logging
      const rawResponseBody = await response.text();
      console.log("Raw Response Bod:", rawResponseBody);
  
      if (!response.ok) throw new Error("Error fetching clicks data");
  
      // Parse the raw response body into JSON
      const data = JSON.parse(rawResponseBody); // Use JSON.parse to avoid consuming the stream twice
  
      console.log("Parsed Data:", data); // Check if data is being parsed correctly
  
      // Use correct keys based on the response structure
      setClicks(data.totalClicks || 0);
      setDateWiseClicks(data.dateWiseClicks || []); // Use 'dateWiseClicks'
      setDeviceWiseClicks(data.deviceWiseClicks || []); // Use 'deviceWiseClicks'
  
      console.log("Total Clicks:", data.totalClicks);
      console.log("Device Wise Clicks:", data.deviceWiseClicks); // Log the correct data
      console.log("Date Wise Clicks:", data.dateWiseClicks); // Log the correct data
    } catch (error) {
      console.error("Error fetching clicks data:", error);
    }
  };
  

  useEffect(() => {
    if (userData) {
      setBgColor(generateColorFromString(userData.name));
      fetchLinksByEmail(userData.email);
      fetchClicksData(userData.email);
    }
  }, [userData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      navigate("/login");
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 80%)`;
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <div className={style.container}>
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
            {/* <div className={style.navTitle}>Good morning, {userData.name}</div> */}
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

          <div className={style.das}>
            <p>
              Total Clicks &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "#1B48DA" }}>{clicks}</span>
            </p>
            <div className={style.graph}>
              <div className={style.card}>
                <h3 className={style.cardTitle}>Date-wise Clicks</h3>

                <Bar
                  data={dateChartData}
                  options={{
                    indexAxis: "y",
                    responsive: true,
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>

              {/* Device-wise Clicks */}
              <div className={style.card}>
                <h3 className={style.cardTitle}>Device-wise Clicks</h3>

                <Bar
                  data={deviceChartData}
                  options={{
                    indexAxis: "y",
                    responsive: true,
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
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

export default Dashboard;