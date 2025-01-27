import { useState } from "react";
import style from '../style/LR.module.css';
import logo from '../assets/C.png'
import { useNavigate } from "react-router-dom";


function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone:'',
    password: "",
    ConfirmPassword: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://short-url-back-48bn.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert the form data to a JSON string
      });
  
      if (!response.ok) {
        // If the response status is not OK (e.g., 400 or 500), handle the error
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred during registration");
      }
  
      const responseData = await response.json();
      console.log("Registration successful:", responseData);
      alert("Registration successful! Please log in.");
      navigate("/login");


    } catch (error) {
      console.error("Registration error:", error.message);
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
            <p2>Join us Today!</p2>
          <form onSubmit={handleSubmit} className={style.registerForm}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
            />
            <br />
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
                type="number"
                id="phone"
                name="phone"
                placeholder="Mobile no."
                value={data.phone}
                onChange={handleChange}
            />
            <br/>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={data.ConfirmPassword}
              onChange={handleChange}
            />
            <br />
            <br/>
            <button type="submit">Register</button>
          </form>
            <p className={style.registerText}>
                Already have an account? <a href="/login">&nbsp;Login</a>
            </p>
        </div>
      </div>
    </>
  );
}

export default Register;
