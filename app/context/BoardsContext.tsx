"use client"

import React, {createContext, ReactNode, useContext, useState} from "react";
import {Board, BoardsContextType} from "@/app/shared/types";

export const BoardsContext = createContext<BoardsContextType>({boards:[], setBoards: () => null});

export const BoardContextProvider = ({children}: {children: ReactNode}) => {
    const [boards, setBoards]  = useState<Board[]>([]);

    return (
        <BoardsContext.Provider value={{ boards, setBoards }}>
            {children}
        </BoardsContext.Provider>
    );

};

export const useBoardsContext = () => {
    return useContext(BoardsContext);
}