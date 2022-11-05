import {useState, useEffect } from "react";
import './styles.css';
import { Card } from "../../components/card";


export function Home() {

  const [studentName, setstudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar:''});

  function handleAddStudent(){
    const newStudent ={
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); 
    //Pega o estado anterior do vetor e acrescenta o novo estado.
    //sem o prevState vai sempre substituindo ao Add novo.
  }
  
  useEffect(() => {
    fetch('https://api.github.com/users/Celso-jr15')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    });
  }, []);

  return (
    <div className="container">  
      <header>
        <h1>Lista de Estudantes</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setstudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
          students.map(student => 
            <Card 
              key={student.time} // usa-se a chave para ser o ID de cada card criado
              name={student.name} 
              time={student.time}
            />
          )
      }
      
   </div>
  )
}

