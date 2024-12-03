'use client'

import "./boardModal.css";
import {useState} from "react";
import Button from "@/app/components/buttons/button";
import Input from "@/app/components/inputs/input";
import {useBoardsContext} from "@/app/context/BoardsContext";
import {BoardModalType, Column} from "@/app/shared/types";

const BoardModal = ({open, onClose}: BoardModalType) => {
    let [columns, setColumns] = useState<Column[]>([]);
    let [boardName, setBoardName] = useState<string>('');
    const { boards, setBoards } = useBoardsContext();

    const addColumn = () => {
        setColumns([...columns, {title: ''}]);
    }
    const deleteColumn = (id: number) => {
        setColumns(columns.filter((column, index) => index !== id));
    }
    const handleColumnTitleChanges = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setColumns(
            columns.map((column, i) => index === i ? {title: event.target.value} : column)
        );
    }
    const createBoard = () => {
        setBoards([...boards, {name: boardName, columns: columns}]);
        onClose();
    }

    if (!open) return null;

    return (
        open && <div>
            <div className={'darkBG'} onClick={onClose}></div>
            <div className={'centered'}>
                <div className={'modal'}>
                    <div className={'modalHeader'}>
                        <div className={'h2'}>Add New Board</div>
                    </div>
                    <div className={'modalContent'}>
                        <div className={'modalField'}>
                            <Input
                                placeholder={'e.g. Web Design'}
                                label={'Name'}
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}>
                            </Input>
                        </div>
                        <div className={'modalField'}>
                            <div className={'my-input_label-wrapper'}>
                                <label className={'my-input_label'} htmlFor="Columns">Columns</label>
                            </div>
                            <div className={'inputList'} id='Columns'>
                            {columns.map((column, index) =>
                                    <div key={index} className={'inputListItem'}>
                                        <Input value={column.title}
                                               onChange={(event)=> handleColumnTitleChanges(index, event)}>
                                        </Input>
                                        <button className={'closeBtn'} onClick={() => {deleteColumn(index)}}>X</button>
                                    </div>
                                )}
                            <Button fullWidth={true} view={'secondary'} onClick={addColumn}>
                                + Add New Column
                            </Button>
                            </div>
                        </div>
                    </div>
                    <div className={'modalActions'}>
                        <div className={'actionsContainer'}>
                            <Button fullWidth={true} view={'main'} onClick={createBoard}>
                                Create New Board
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BoardModal;