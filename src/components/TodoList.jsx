import TodoItem from './TodoItem';

// Componente que renderiza a lista de tarefas
// Props:
// - todos: array com as tarefas a serem exibidas
// - toggleComplete: função para marcar/desmarcar uma tarefa como concluída
// - deleteTodo: função para excluir uma tarefa
function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;