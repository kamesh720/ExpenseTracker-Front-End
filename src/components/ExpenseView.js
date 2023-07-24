import "./ExpenseView.css";

const ExpenseView = (props) => {
  const expData = props.expData;

  return (
    <div className="table-responsive my-4 expense--table_container">
      <table className="table table-light mb-0 table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Expense Name</th>
            <th scope="col">Expense Date</th>
            <th scope="col">Expense Amt</th>
            <th scope="col" className="text-center">
              <span
                className="material-icons"
                style={{ verticalAlign: "middle" }}
              >
                settings
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {expData !== [] &&
            expData.map((d, i) => (
              <tr key={d._id || Math.random() * i}>
                <th scope="row">{i + 1}</th>
                <td>{d.expName}</td>
                <td>{d.expDate.split("T")[0]}</td>
                <td>{d.expAmt}</td>
                <td className="action-icons">
                  <span
                    className="material-icons"
                    onClick={() => props.editExpRow(d)}
                  >
                    edit
                  </span>
                  <span
                    className="material-icons"
                    onClick={() => props.deleteExpHandler(d._id)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className="table-dark">
          <tr>
            <th scope="row" colSpan="3">
              Total Expense:
            </th>
            <td colSpan="2">{props.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default ExpenseView;
