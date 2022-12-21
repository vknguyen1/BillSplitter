import { useState } from 'react';
import { Link } from 'react-router-dom';

function Index({ createPeople, people, createTransaction, transaction }) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: '',
    image: '',
    title: '',
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    createPeople(newForm);
    setNewForm({
      memberName: '',
    });
  };

  // loaded function
  const loaded = () => {
    return people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.memberName}</h1>
        </Link>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section className="person-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="memberName"
          placeholder="name"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {/* {people ? loaded() : loading()} */}
    </section>
  );
}

export default Index;
