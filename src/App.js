import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() { //Component
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function getUsers() {
    axios.get("http://localhost:8080/users")
    .then(function(response){
      setUsers(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function createUser(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    }
    axios.post("http://localhost:8080/users", data)
    .then(function(response) { 
      getUsers();
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
}

  return (
    <div className="App">
      <button type="button" onClick={getUsers}>Get Users</button>
      {users && users.map((row) => (
<div key={row.id}>
  {row.username} - {row.email}
  </div>
      ))
    }
    <h2>
      Create User 
    </h2>
    <form onSubmit={createUser}>
      <div>
      <label>Username</label>
      <input type="text" onChange={handleUsername} required/>
      </div>

<div>
  <label>Password</label>
  <input type="password" onChange={handlePassword} required/>
</div>

<div>
  <label>Email</label>
  <input type="email" onChange={handleEmail} required/>
</div>

<button type="submit">Create User</button>




    </form>
      </div>
  );
}
export default App;
