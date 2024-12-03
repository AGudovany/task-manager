'use client'

import "./board.css";
import {Board, DraggedTask} from "@/app/shared/types";
import {useBoardsContext} from "@/app/context/BoardsContext";
import Task from "@/app/components/task/task";
import React, {useState} from "react";

const initialBoardState = {
    name: '',
    selected: true,
    columns: [],
}

const Board = () => {
    const { boards, setBoards } = useBoardsContext();
    const selectedBoard: Board = boards.find((board) => board.selected) || initialBoardState;
    const [draggedTask, setDraggedTask] = useState<DraggedTask>();
    const [hoveredColumn, setHoveredColumn] = useState<string>('');

    const handleDragStart = (draggedItem: DraggedTask) => {
        setDraggedTask(draggedItem);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (columnTitle: string) => {
        console.log(columnTitle);
        setHoveredColumn(columnTitle);
    };

    const handleDragLeave = () => {
        setHoveredColumn('');
    };

    const handleDrop = (columnTitle: string) => {
        if (!draggedTask || columnTitle === draggedTask.columnTitle) return;

        const newColumns = [...selectedBoard.columns].map((column) => {
            if (column.title === columnTitle) {
                if (column.tasks) {
                    column.tasks.push(draggedTask.task);
                } else {
                    column.tasks = [draggedTask.task];
                }
            }
            if (column.title === draggedTask.columnTitle) {
                const filteredTasks = column.tasks?.filter((task)=>{
                    return task.title !== draggedTask.task.title;
                });
                column.tasks = filteredTasks
            }
            return column
        });

        const updatedBoards = [...boards].map((board)=> {
            if (board.name === selectedBoard.name) {
                board.columns = [...newColumns];
            }
            return board;
        });

        setBoards(updatedBoards);
        setDraggedTask(undefined);
        setHoveredColumn('');
    };

    return (
        <div className={'board'}>
            <div className={'board-columns'}>
                {selectedBoard && selectedBoard.columns.map((column, index) =>
                    <div key={index}
                         style={{
                             borderRadius: '8px',
                             border: hoveredColumn === column.title ? '2px solid #007bff' : '2px solid transparent',
                             transition: 'border 0.2s ease',
                         }}
                         className={'board-column'}
                         onDrop={() => handleDrop(column.title)}
                         onDragEnter={() => handleDragEnter(column.title)}
                         onDragLeave={() => handleDragLeave()}
                         onDragOver={handleDragOver}>
                        <div className={'board-column-title'}>
                            <span className={'column-icon'}></span>
                            <h4>{column.title}</h4>
                        </div>
                        <div>
                            {column.tasks?.map((task, index) =>
                                <Task key={index}
                                      columnTitle={column.title}
                                      task={task}
                                      dragStartHandler={handleDragStart}
                                    />
                            )}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default Board;