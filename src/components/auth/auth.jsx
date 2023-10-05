import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import "./auth.css";
import PropTypes from "prop-types";

function Auth({ className, setIsLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (err) {
      console.error(err);
      setError(err.code);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLogged(true);
    } catch (err) {
      console.error(err);
      setError(err.code);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (err) {
      console.error(err);
      setError(err.code);
    }
  };

  return (
    <>
      <div className={className}>
        <>
          <input
            className="auth-input-field"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input-field"
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-group">
            <button className="auth-btn" onClick={signIn}>
              Sign In
            </button>
            <span>or</span>
            <button className="auth-btn" onClick={logIn}>
              Log In
            </button>
          </div>

          <button className="auth-btn" onClick={signInWithGoogle}>
            Sign In with Google+
          </button>
          {error ? <p className="error-message">{error}</p> : ""}
        </>
      </div>
    </>
  );
}

export default Auth;

Auth.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  setIsLogged: PropTypes.func,
};
