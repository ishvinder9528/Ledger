import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../contexts/shop/shopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(ShopContext);
  const { isEdit, setIsEdit } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Guru
            <span style={{ color: "orange" }}>
              <strong>Kirpa</strong>
            </span>{" "}
            Collection
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
            </ul>
            <>
              <form className="d-flex " role="search" onSubmit={handleSubmit}>
                {location.pathname === "/" && (
                  <button className="btn btn-warning mx-1" type="submit">
                    Database
                  </button>
                )}
                {location.pathname === "/shop" && isEdit.value && (
                  <button
                    className="btn btn-warning mx-1"
                    type="submit"
                    onClick={() =>
                      setIsEdit({
                        value: false,
                        id: null,
                      })
                    }
                  >
                    Add New Shop
                  </button>
                )}
              </form>
            </>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
