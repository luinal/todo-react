// src/components/TodoItem.jsx
// Componente que renderiza um item individual da lista de tarefas
// Props:
// - todo: objeto com os dados da tarefa (id, text, completed)
// - toggleComplete: função para marcar/desmarcar a tarefa como concluída
// - deleteTodo: função para excluir a tarefa
const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`} 
      onClick={() => toggleComplete(todo.id)}
    >
      <span className="todo-text">{todo.text}</span>
      <button 
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // Previne que o evento de clique seja propagado para o componente pai
          deleteTodo(todo.id);
        }}
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;