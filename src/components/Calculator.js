const Calculator = ({ transaction }) => {
  // This function reduces the transaction into an array of objects containing the name and total amount spent by each member
  const reduceTransactions = (transaction) =>
    transaction.reduce((acc, cur) => {
      const { memberName, price } = cur; // Get name and price from current item
      const item = acc.find((it) => it.memberName === memberName); // Find in our accumulator the desired object
      item ? (item.price += price) : acc.push({ memberName, price }); // Update object or create a new object if it doesn't exist
      return acc; // Return accumulator
    }, []);

  // Calculate the total amount spent in the transactions
  const sumTransactions = transaction.reduce(
    (acc, value) => acc + value.price,
    0,
  );

  // Calculate the amount that each member should pay to balance the expenses
  const split = (
    sumTransactions / reduceTransactions(transaction).length
  ).toFixed(2);

  // Use map to create a list of JSX elements showing the name and total amount spent by each member
  const memberList = reduceTransactions(transaction).map((trx, index) => (
    <article key={index}>
      <p>{trx.memberName}:</p>
      <p>${trx.price.toFixed(2)}</p>
    </article>
  ));

  const balances = reduceTransactions(transaction).map((trx) => {
    return {
      payee: trx.memberName,
      amount: (split - trx.price).toFixed(2),
    };
  });

  const payeeList = balances.map((balance, index) => (
    <article key={index}>
      <p>{balance.payee}:</p>
      <p>${balance.amount}</p>
    </article>
  ));

  // Check if transaction is null or an empty array
  if (!transaction || !transaction.length) {
    return <p>No transactions to display</p>;
  }

  return (
    <div>
      <h1>Calculator</h1>

      <h1>{payeeList}</h1>

      <h2>Total: ${sumTransactions.toFixed(2)}</h2>
      <h2>Each member should pay: ${split}</h2>
    </div>
  );
};

export default Calculator;
