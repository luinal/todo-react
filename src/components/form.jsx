// src/components/Form.jsx
import { useState } from 'react';

function Form({ addTodo }) {
    //Usamos a função USESTATE para criar um estado chamado INPUT e uma função SETINPUT para atualizar esse estado. Inicialmente, o valor de INPUT é uma string vazia.
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página.
    addTodo(input); // Adiciona a nova tarefa por meio da função `addTodo`.
    setInput(''); // Limpa o campo de entrada após enviar.
};

  return (
    //Renderiza um elemento FORM e atribui a função HANDLE ao evento .
    <form onSubmit={handleSubmit}>  
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;