import React, { useContext } from "react";
import ShopTable from "./shop/ShopTable";
import { useNavigate } from "react-router-dom";
import ShopContext from "../contexts/shop/shopContext";
const Home = () => {
  const context = useContext(ShopContext);
  const { setLoaded } = context;

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <h1 className="my-5">
              Welcome to Guru
              <span style={{ color: "orange" }}>
                <strong>Kirpa</strong>
              </span>{" "}
              Collection Ledger
            </h1>
            <h5 className="mx-3 mb-5">A Perfect Database</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <button
              className="btn btn-warning btn-lg btn-block"
              onClick={() => {
                navigate("/shop");
                setLoaded(false);
              }}
            >
              Press to Start
            </button>
          </div>

          <div className=" border border-warning w-75 p-4 mx-auto my-4">
            <ShopTable value={2} />
            <table className="table">
              <tbody>
                <tr>
                  <td>....</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>..</td>
                </tr>
                <tr>
                  <td>....</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>..</td>
                </tr>
                <tr>
                  <td>....</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>..</td>
                </tr>
              </tbody>
            </table>
            <button
              className="col-span-5 container mt-4 btn btn-outline-warning btn-lg"
              onClick={() => {
                navigate("/shop");
                setLoaded(false);
              }}
            >
              Go to Access The Ledger
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
