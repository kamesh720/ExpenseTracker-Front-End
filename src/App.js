import "./App.css";
import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseView from "./components/ExpenseView";

function App() {
  const [expData, setExpData] = useState([]);
  const [expName, setExpName] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [expDate, setExpDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editRowId, setEditRowId] = useState("");
  const [total, setTotal] = useState(0);

  async function fetchExpenses() {
    async function getData() {
      const resp = await fetch(`http://localhost:3111/`);
      const data = await resp.text();
      console.log(data);
    }
    getData();

    const responseObj = await fetch(`${process.env.REACT_APP_BASE_URL}`);
    const responseData = await responseObj.json();
    console.log(responseData);

    const totalAmt = responseData.expData.reduce(
      (totalVal, currVal) => (totalVal = totalVal + currVal.expAmt),
      0
    );
    console.log(totalAmt);
    setTotal(totalAmt);
    setExpData(responseData.expData);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const setExpenseData = (data) => {
    setExpData(data);
  };

  const editExpenseData = (editRowData) => {
    console.log(editRowData);
    setExpName(editRowData.expName);
    setExpAmt(editRowData.expAmt);
    setExpDate(editRowData.expDate.split("T")[0]);
    setIsEditing(true);
    setEditRowId(editRowData._id);
  };

  const saveData = async (newExpData) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/saveExpense`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(newExpData),
      }
    );
    const res = await response.json();
    console.log(res, "response received from server");
    if (res.code === 1) {
      fetchExpenses();
    }
  };

  const deleteExpRow = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/deleteExpense/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.code === 1) {
      fetchExpenses();
    }
  };

  const editData = async (editedData) => {
    console.log("data===>>>", editedData);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/editExpense/${editRowId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editedData),
      }
    );
    const data = await response.json();
    console.log(data);
    setIsEditing(false);
    if (data.code === 1) {
      fetchExpenses();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-5">
          <h1 className="my-5 text-center text-warning bg-light p-3 rounded">
            Expense Tracker App
          </h1>
          <ExpenseForm
            expName={expName}
            expAmt={expAmt}
            expDate={expDate}
            setExpName={setExpName}
            setExpAmt={setExpAmt}
            setExpDate={setExpDate}
            expData={expData}
            setExpenseData={setExpenseData}
            isEditing={isEditing}
            saveData={saveData}
            editData={editData}
          />
          <ExpenseView
            expData={expData}
            editExpRow={editExpenseData}
            deleteExpHandler={deleteExpRow}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
