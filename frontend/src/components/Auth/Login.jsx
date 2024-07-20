import React, { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    const images = document.querySelectorAll('.transition-image');
    let currentImageIndex = 0;

    const showNextImage = () => {
      images[currentImageIndex].style.opacity = 0;
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].style.opacity = 1;
    };

    const intervalId = setInterval(showNextImage, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://helping-hands-job.onrender.com/api/v1/user/login",
        { email, password, role },
        {

          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>

        <div className="transition-container">
          <img className="transition-image" src="/registerpage/img1.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img2.png" alt="login" />
          <img className="transition-image" src="/registerpage/img3.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img4.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img5.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img6.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img7.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img8.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img9.jpg" alt="login" />
          <img className="transition-image" src="/registerpage/img10.jpg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;