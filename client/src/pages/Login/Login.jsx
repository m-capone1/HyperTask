import "./Login.scss";
import axios from "axios";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/auth-context';

function Login() {
  const [error, setError] = useState(null);
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8080';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      const token = response.data.token;
      sessionStorage.setItem("token", token);

      login(token);

      navigate("/board/1");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>

        <Input type="text" name="email" label="Email" autoComplete="email"/>
        <Input type="password" name="password" label="Password" autoComplete="current-password"/>

        <button className="login__button">Log in</button>

        {error && <div className="login__message">{error}</div>}
      </form>

      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}

export default Login;