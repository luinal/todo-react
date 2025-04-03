import { useState } from 'react';

// Componente que renderiza a barra lateral com a lista de listas de tarefas
// Props:
// - lists: array com todas as listas de tarefas
// - activeList: id da lista atualmente selecionada
// - onSelectList: função para selecionar uma lista
// - onCreateList: função para criar uma nova lista
// - onDeleteList: função para excluir uma lista
// - onUpdateListName: função para atualizar o nome de uma lista
function Sidebar({ lists, activeList, onSelectList, onCreateList, onDeleteList, onUpdateListName }) {
  // Estado que controla qual lista está sendo editada
  const [editingListId, setEditingListId] = useState(null);
  // Estado que armazena o nome temporário durante a edição
  const [editingName, setEditingName] = useState('');

  // Função que inicia a edição do nome de uma lista
  const startEditing = (list) => {
    setEditingListId(list.id);
    setEditingName(list.name);
  };

  // Função que finaliza a edição do nome de uma lista
  const finishEditing = (listId) => {
    if (editingName.trim()) {
      onUpdateListName(listId, editingName.trim());
    }
    setEditingListId(null);
  };

  // Função que manipula a tecla Enter durante a edição
  const handleKeyPress = (e, listId) => {
    if (e.key === 'Enter') {
      finishEditing(listId);
    } else if (e.key === 'Escape') {
      setEditingListId(null);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Minhas Listas</h2>
        {/* Botão para criar uma nova lista automaticamente */}
        <button onClick={() => onCreateList('Nova Lista')} className="create-list-btn">
          + Nova Lista
        </button>
      </div>
      {/* Lista de todas as listas de tarefas */}
      <ul className="lists-menu">
        {lists.map((list) => (
          <li
            key={list.id}
            className={`list-item ${list.id === activeList ? 'active' : ''}`}
          >
            {/* Nome da lista com funcionalidade de edição */}
            {editingListId === list.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => finishEditing(list.id)}
                onKeyDown={(e) => handleKeyPress(e, list.id)}
                autoFocus
                className="list-name-input"
              />
            ) : (
              <span 
                onClick={() => onSelectList(list.id)}
                onDoubleClick={() => startEditing(list)}
                className="list-name"
              >
                {list.name}
              </span>
            )}
            {/* Botão para excluir a lista */}
            <button
              className="delete-list-btn"
              onClick={() => onDeleteList(list.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar; 