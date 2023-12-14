import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import PageNav from "../../components/PageNav";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const Login = ()=> 
{
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (e)=>
  {
    e.preventDefault();
    if(email && password)
    {
      login(email, password);
    }
  }

  useEffect(()=>
  {
    if(isAuthenticated)
    {
      navigate("/app");
    }
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;