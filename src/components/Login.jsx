// import { useState } from "react";
// import style from '../style/LR.module.css';
// import logo from '../assets/C.png'

// function Login() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     Phone:'',
//     password: "",
//     ConfirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`email is ${data.email} and password is ${data.password}`);
//   };

//   return (
//     <>
//       <div className={style.container}>
//         <div className={style.leftSide}>
//           {/* This is where your background image will be */}
//         </div>
//         <div className={style.mid}>
//             <img src={logo} alt="logo"/>
//             <div>
//                 <button className={style.sign}><a href="/register">Sign Up</a></button>
//                 <button className={style.log}><a href="/login">Log in</a></button>
//             </div>
//         </div>
//         <div className={style.rightSide}>
//             <p3>Login</p3>
//           <form onSubmit={handleSubmit} className={style.registerForm}>

//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email id"
//               value={data.email}
//               onChange={handleChange}
//             />
//             <br />

//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={data.password}
//               onChange={handleChange}
//             />

//             <br />
//             <br/>
//             <button type="submit">Login</button>
//           </form>
//             <p className={style.registerText}>
//                 Already have an account? <a href="/Register">&nbsp;SignUp</a>
//             </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;













import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import style from '../style/LR.module.css';
import logo from '../assets/C.png';

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const responseData = await response.json();
      console.log("Login successful:", responseData);
      alert("Login successful!");

      // Store the JWT token in localStorage (or cookies)
      localStorage.setItem("token", responseData.token);

      // Redirect to the dashboard
      navigate("/dashboard");  // Redirect to the Dashboard page
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.leftSide}>
          {/* This is where your background image will be */}
        </div>
        <div className={style.mid}>
            <img src={logo} alt="logo"/>
            <div>
                <button className={style.sign}><a href="/register">Sign Up</a></button>
                <button className={style.log}><a href="/login">Log in</a></button>
            </div>
        </div>
        <div className={style.rightSide}>
            <p>Login</p>
          <form onSubmit={handleSubmit} className={style.registerForm}>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email id"
              value={data.email}
              onChange={handleChange}
            />
            <br />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />

            <br />
            <br/>
            <button type="submit">Login</button>
          </form>
            <h5 className={style.registerText}>
                Already have an account? <a href="/register">&nbsp;SignUp</a>
            </h5>
        </div>
      </div>
    </>
  );
}

export default Login;
