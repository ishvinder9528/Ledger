import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShopContext from "../contexts/shop/shopContext";
import BillContext from "../contexts/bill/billContext";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(ShopContext);
  const { isEdit, setIsEdit, setLoaded } = context;
  const billContext = useContext(BillContext);
  const { setShopId, shopId } = billContext;
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop");
  };
  // console.log(shopId);
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
                <Link
                  className="nav-link"
                  to="/shop"
                  onClick={() => setShopId("")}
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/all"
                  onClick={() => setShopId("")}
                >
                  All Bills
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSubmit}>
              {location.pathname === "/" && (
                <button
                  className="btn btn-warning mx-1"
                  type="submit"
                  onClick={() => {
                    setLoaded(false);
                  }}
                >
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
