import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";
import Axios from "axios";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then((response)=>setRepositories(response.data));
  },[]);

  async function handleAddRepository() {
    api.post('/repositories',{
      id: Date.now(),
      title: 'Projeto ' + Date.now()
    }).then((response)=>setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) =>{
      const newRepositories = repositories.filter(repo=> repo.id != id);
      setRepositories(newRepositories);
    }
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo)=>{
          return (
              <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
              </li>
            )})
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
