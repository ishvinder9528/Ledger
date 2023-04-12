import React from "react";
import ShopTable from "./ShopTable";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <br />
      <br />

      <br />
      <div className="mt-5 text-center container">
        <h1>Welocome to Gurukirpa Collection Ledger</h1>
        <h5 className="mx">A PerFect DataBase</h5>
        <div className="d-grid gap-2 col-6 mx-auto my-5">
          <button
            className=" btn btn-warning btn-lg"
            onClick={() => navigate("/shop")}
          >
            {" "}
            Press to Start
          </button>
        </div>
        <br />
        <br />
        <div className="container border border-warning w-74 p-4">
          <ShopTable value={2} />
          <table class="table">
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
            onClick={() => navigate("/shop")}
          >
            Go to Access The Ledger
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
