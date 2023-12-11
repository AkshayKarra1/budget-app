import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Services from "../../util/Services";
import * as style from "./Budgets.module.css";
import Swal from "sweetalert2";

const Budgets = () => {
  const [category, setCategory] = useState("");
  const [budgetList, setBudgeList] = useState([]);

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    let resp = await Services.getCategories();
    if (resp && resp.success && resp.data) {
      let listRows = resp.data.map((item, index) => {
        return (
          <tr key={`category_row_${item.id}`}>
            <th scope="row">{index + 1}</th>
            <td>{item.category}</td>
          </tr>
        );
      });

      setBudgeList(listRows);
    }
  }

  //let listRows = [];

  const createCategory = async (event) => {
    event.preventDefault();
    if (!category) {
      Swal.fire({
        title: "Error!",
        text: "Category can not be empty",
        icon: "error",
      });
    }

    let resp = await Services.createCategory({ category: category });
    if (resp && resp.data && resp.data.success) {
      Swal.fire({
        title: "Success!",
        text: resp.data.message,
        icon: "success",
      });
      setCategory("");
      await fetchData();
    } else if (resp && resp.data.message) {
      Swal.fire({
        title: "Error!",
        text: resp.data.message,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Budget creation failed",
        icon: "error",
      });
    }
  };
  return (
    <>
      <Navbar activeTab="budgets"></Navbar>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h5>Budget List</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>{budgetList}</tbody>
          </table>
        </div>
        <div style={{ width: "30%" }}>
          <div>
            <main className={`${style["form-signin"]} "text-center" "mt-5"`}>
              <form onSubmit={createCategory}>
                <h5 className="h5 mb-3 fw-normal">Create new category</h5>
                <div className="form-floating">
                  <input
                    type="text"
                    className="input-sm form-control form-control-sm"
                    id="floatingInput"
                    placeholder="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Category</label>
                </div>

                <button className="w-100 btn btn-md btn-primary" type="submit">
                  Create
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Budgets;
