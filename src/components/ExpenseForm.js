import { useEffect, useState } from "react";

const ExpenseForm = ({
  expName,
  expAmt,
  expDate,
  setExpName,
  setExpAmt,
  setExpDate,
  expData,
  setExpenseData,
  isEditing,
  saveData,
  editData,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const maxDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    expName.trim() !== "" && expAmt.length !== 0 && expDate.length !== 0
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [expName, expAmt, expDate, isDisabled]);

  const formHandler = (e) => {
    e.preventDefault();
    const newExpData = { expName, expAmt, expDate };
    isEditing ? editData(newExpData) : saveData(newExpData);
    // Use below line only when not fetching data from server.
    // Below line will update the prevState with the new User Obj and also trigger UI re-render
    // !isEditing && setExpenseData([...expData, newExpData]);
    clearFields();
  };

  const clearFields = () => {
    setExpName("");
    setExpAmt("");
    setExpDate("");
  };

  const expNameHandler = (e) => {
    setExpName(e.target.value);
  };

  const expAmtHandler = (e) => {
    setExpAmt(e.target.value);
  };

  const expDateHandler = (e) => {
    setExpDate(e.target.value);
  };

  return (
    <form className="text-center" onSubmit={formHandler}>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Expense Name"
          onChange={expNameHandler}
          value={expName}
        />
      </div>
      <div className="my-4">
        <input
          type="number"
          className="form-control"
          placeholder="Enter your Expense Amount"
          onChange={expAmtHandler}
          value={expAmt}
        />
      </div>
      <div>
        <input
          type="date"
          className="form-control"
          onChange={expDateHandler}
          value={expDate}
          min="2000-01-01"
          max={maxDate}
        />
      </div>
      <div className="d-grid gap-2 mt-4">
        <button
          type="submit"
          className={`btn ${isDisabled ? "btn-secondary" : "btn-success"}`}
          disabled={isDisabled}
          style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          {isEditing ? "Edit" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
