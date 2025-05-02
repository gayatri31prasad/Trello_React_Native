import React, { createContext, useState, useContext } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [data, setData] = useState({
    columns: [
      {
        id: 'col-1',
        title: 'To Do',
        cards: [{ id: 'card-1', title: 'Set up project repo' }],
      },
      {
        id: 'col-2',
        title: 'In Progress',
        cards: [{ id: 'card-2', title: 'Build UI' }],
      },
    ],
    modal: { visible: false, mode: 'card', action: 'add', colId: null, cardId: null },
  });

  return (
    <BoardContext.Provider value={{ data, setData }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
