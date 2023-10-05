import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  /*faTrashCanArrowUp*/ faBan,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "../auth/auth";
import "./footer.css";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

import PropTypes from "prop-types";

function FooterBar({ setItems, items }) {
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isHide, setIsHide] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  }, [items]);

  const logout = async () => {
    // setIsHide(true);
    try {
      await signOut(auth);
      setIsLogged(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="total">
        {isLogged ? (
          <>
            <button className="btn-footer" onClick={logout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Log Out</span>
            </button>
          </>
        ) : (
          <>
            <button className="btn-footer" onClick={() => setIsHide(false)}>
              <FontAwesomeIcon icon={faArrowRightToBracket} />
              <span>Log In</span>
            </button>
            <Auth
              className={isHide ? `auth-wrapper hide` : "auth-wrapper"}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
            />
          </>
        )}

        <button className="btn-footer" onClick={() => setItems([])}>
          <FontAwesomeIcon icon={faBan} />
          <span>Clear All</span>
        </button>
        <div className="">Total: {totalItemCount}</div>
      </div>
    </>
  );
}

export default FooterBar;

FooterBar.propTypes = {
  setItems: PropTypes.func,
  items: PropTypes.array,
};
