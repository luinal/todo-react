import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/form';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';

function App() {
  // Estado que armazena todas as listas de tarefas
  // Inicializa com uma lista padrão se não houver dados salvos
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('todoLists');
    return savedLists ? JSON.parse(savedLists) : [
      { id: 'default', name: 'Minha Lista', todos: [] }
    ];
  });

  // Estado que controla qual lista está atualmente selecionada
  const [activeList, setActiveList] = useState('default');
  // Estado que controla se o título está sendo editado
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  // Estado que armazena o título temporário durante a edição
  const [editingTitle, setEditingTitle] = useState('');

  // Efeito que salva as listas no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }, [lists]);

  // Função que retorna as tarefas da lista atualmente selecionada
  const getActiveListTodos = () => {
    const list = lists.find(l => l.id === activeList);
    return list ? list.todos : [];
  };

  // Função para adicionar uma nova tarefa à lista ativa
  const addTodo = (text) => {
    if (text.trim() !== '') {
      setLists(lists.map(list => {
        if (list.id === activeList) {
          return {
            ...list,
            todos: [...list.todos, { id: Date.now(), text: text, completed: false }]
          };
        }
        return list;
      }));
    }
  };

  // Função para marcar/desmarcar uma tarefa como concluída
  const toggleComplete = (id) => {
    setLists(lists.map(list => {
      if (list.id === activeList) {
        return {
          ...list,
          todos: list.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        };
      }
      return list;
    }));
  };

  // Função para excluir uma tarefa da lista ativa
  const deleteTodo = (id) => {
    setLists(lists.map(list => {
      if (list.id === activeList) {
        return {
          ...list,
          todos: list.todos.filter(todo => todo.id !== id)
        };
      }
      return list;
    }));
  };

  // Função para criar uma nova lista de tarefas
  const createList = (name) => {
    const newList = {
      id: Date.now().toString(),
      name: name,
      todos: []
    };
    setLists([...lists, newList]);
    setActiveList(newList.id);
  };

  // Função para excluir uma lista de tarefas
  // Não permite excluir a última lista
  const deleteList = (id) => {
    if (lists.length > 1) {
      setLists(lists.filter(list => list.id !== id));
      if (activeList === id) {
        setActiveList(lists[0].id);
      }
    }
  };

  // Função para atualizar o nome de uma lista
  const updateListName = (id, newName) => {
    setLists(lists.map(list =>
      list.id === id ? { ...list, name: newName } : list
    ));
  };

  // Função que inicia a edição do título
  const startEditingTitle = () => {
    const currentList = lists.find(l => l.id === activeList);
    const currentName = currentList?.name || 'Nova Lista';
    
    setIsEditingTitle(true);
    // Limpa o título apenas se for "Nova Lista"
    setEditingTitle(currentName === 'Nova Lista' ? '' : currentName);
  };

  // Função que finaliza a edição do título
  const finishEditingTitle = () => {
    const currentList = lists.find(l => l.id === activeList);
    const currentName = currentList?.name || 'Nova Lista';
    
    if (editingTitle.trim() === '') {
      // Se o campo estiver vazio e o título atual for "Nova Lista", restaura o nome padrão
      if (currentName === 'Nova Lista') {
        setEditingTitle('Nova Lista');
        updateListName(activeList, 'Nova Lista');
      } else {
        // Se o título atual não for "Nova Lista", mantém o título atual
        setEditingTitle(currentName);
      }
    } else {
      // Se houver texto, atualiza o nome da lista
      updateListName(activeList, editingTitle);
    }
    setIsEditingTitle(false);
  };

  // Função que manipula as teclas durante a edição do título
  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      finishEditingTitle();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      const currentList = lists.find(l => l.id === activeList);
      setEditingTitle(currentList?.name || 'Nova Lista');
    }
  };

  // Ordena as tarefas: não completadas primeiro, depois as completadas
  const sortedTodos = [...getActiveListTodos()].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="App">
      <Sidebar
        lists={lists}
        activeList={activeList}
        onSelectList={setActiveList}
        onCreateList={createList}
        onDeleteList={deleteList}
        onUpdateListName={updateListName}
      />
      <div className="main-content">
        {isEditingTitle ? (
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={finishEditingTitle}
            onKeyDown={handleTitleKeyPress}
            autoFocus
            className="title-input"
          />
        ) : (
          <h1 onClick={startEditingTitle}>
            {lists.find(l => l.id === activeList)?.name || 'Minha Lista'}
          </h1>
        )}
        <Form addTodo={addTodo} />
        <div className="todo-container">
          <TodoList
            todos={sortedTodos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
