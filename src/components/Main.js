import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Calculator from './Calculator';
import Transaction from './Transaction';

function Main(props) {
  const [people, setPeople] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const API_URL = 'http://localhost:4001/api/members/';
  const API_URL_TRANSACTIONS = 'http://localhost:4001/api/transactions/';

  // Getting member API

  const getPeople = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  };

  const createPeople = async (person) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person),
      });
      getPeople();
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  };

  // Getting Transaction List Api

  const getTransaction = async () => {
    try {
      const response = await fetch(API_URL_TRANSACTIONS);
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  };

  const createTransaction = async (person) => {
    try {
      await fetch(API_URL_TRANSACTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person),
      });
      getTransaction();
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  };

  useEffect(() => {
    getPeople();
    getTransaction();
  }, []);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Index
              people={people}
              createPeople={createPeople}
              transaction={transaction}
              createTransaction={createTransaction}
            />
          }
        />
        <Route path="/people/:id" element={<Show />} />
      </Routes>
      <Transaction
        people={people}
        transaction={transaction}
        createTransaction={createTransaction}
      />
      {transaction && <Calculator transaction={transaction} />}
      {/* Calculator will only render when there is a value now. */}
    </main>
  );
}

export default Main;
