import { useState, useEffect } from 'react';
import moment from 'moment';

export default function Transaction({
  people,
  transaction,
  createTransaction,
}) {
  const [input, setInput] = useState({
    // date: '',
    memberName: '',
    description: '',
    price: '',
  }); // for input fields

  const [selectOption, setSelectOption] = useState(''); // for the item selected in the drop dow
  const [option, setOption] = useState([people]); // for drop down menu options
  const [newTransactions, setTransactions] = useState([]); // to handle submit of transaction form
  const [transactionList, setTransactionList] = useState([transaction]);

  let nextId = 0;

  const handleDropDown = (event) => {
    setSelectOption(event.target.value);
    setInput({ ...input, memberName: event.target.value });
  };

  console.log(selectOption);
  const handleChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const date = new Date(input.date);
    // input.date = moment(date).format('MM-DD-YYYY');

    createTransaction(input);
    setTransactions([
      ...newTransactions,
      {
        id: nextId++,
        // date: input.date,
        memberName: input.memberName,
        description: input.description,
        price:
          typeof input.price === 'string' ? parseInt(input.price) : input.price,
      },
    ]);
  };

  useEffect(() => {
    setOption([people]);
    setTransactionList([transaction]);
    if (people && people.length > 0) {
      setSelectOption(people[0].memberName);
    }
  }, [people, transaction]);

  return (
    <>
      <div className="form">
        <div className="transaction">
          <h1>Enter Transaction</h1>
          <form onSubmit={handleSubmit}>
            {/* <label>
              Enter Date
              <input
                type="date"
                value={input.date}
                name="date"
                onChange={handleChange}
              />
            </label> */}
            <label>
              Name
              <select
                id="myDropDown"
                value={selectOption}
                name="memberName"
                onChange={handleDropDown}
              >
                {people && people.length > 0
                  ? people.map((person, index) => (
                      <option key={index} value={person.memberName}>
                        {person.memberName}
                      </option>
                    ))
                  : 'empty'}
              </select>
            </label>
            <label>
              What was the purchase?
              <input
                type="text"
                value={newTransactions.description}
                name="description"
                onChange={handleChange}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                step=".01"
                value={newTransactions.price}
                name="price"
                onChange={handleChange}
              />
            </label>
            <input type="submit" value="submit" />
          </form>
        </div>

        <div className="transaction-container">
          <div className="transaction-table">
            <table className="table">
              <thead className="table-head">
                <tr>
                  {/* <th>Date</th> */}
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transaction && transaction.length > 0 ? (
                  transaction.map((t, index) => (
                    <tr key={index}>
                      {/* <td>{t.date}</td> */}
                      <td>{t.memberName}</td>
                      <td>{t.description}</td>
                      <td>{t.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
