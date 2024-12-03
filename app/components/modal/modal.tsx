'use client'

import "./taskModal.css";
import {useEffect, useState} from "react";
import Button from "@/app/components/buttons/button";
import Input from "@/app/components/inputs/input";
import {useBoardsContext} from "@/app/context/BoardsContext";
import {Task, TaskModalType} from "@/app/shared/types";
import DropDownButton from "@/app/components/dropDownButton/dropDownButton";

const Modal = ({columnTitle, task, open, onClose}: TaskModalType) => {
    const [subTasks, setSubTasks] = useState<Task[]>(task?.subTasks || []);
    const [taskTitle, setTaskTitle] = useState<string>(task?.title || '');
    const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);
    const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
    const { boards, setBoards } = useBoardsContext();

    useEffect(()=>{
        setSelectedBoardIndex(boards.findIndex((board) => board.selected));
        if (columnTitle) {
            setSelectedColumnIndex(boards[selectedBoardIndex].columns.findIndex(({title}) => title === columnTitle));
        }
    },[boards, columnTitle, selectedBoardIndex]);


    const addSubTask = () => {
        setSubTasks([...subTasks, {title: ''}]);
    }

    const deleteSubTask = (id: number) => {
        setSubTasks(subTasks.filter((subTasks, index) => index !== id));
    }

    const handleSubTaskTitleChanges = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setSubTasks(
            subTasks.map((subTasks, i) => index === i ? {title: event.target.value} : subTasks)
        );
    }

    const changeSelectedColumnHandler = (selectedColumn: string | number) => {
        setSelectedColumnIndex(boards[selectedBoardIndex].columns.findIndex(({title}) => title === selectedColumn));
    }

    const createTask = () => {
        const newTask: Task = {title: taskTitle, subTasks};
        let selectedTasks = boards[selectedBoardIndex].columns[selectedColumnIndex].tasks;
        if (selectedTasks) {
            selectedTasks.push(newTask)
        } else {
            selectedTasks = [newTask];
        }
        const updatedBoards = [...boards];
        updatedBoards[selectedBoardIndex].columns[selectedColumnIndex].tasks = selectedTasks;
        setBoards([...updatedBoards]);

        onClose();
    }

    if (!open) return null;

    return (
        open && <div>
            <div className={'darkBG'} onClick={onClose}></div>
            <div className={'centered'}>
                <div className={'modal'}>
                    <div className={'modalHeader'}>
                        <div className={'h2'}>Add New Task</div>
                    </div>
                    <div className={'modalContent'}>
                        <div className={'modalField'}>
                            <Input
                                placeholder={'e.g. Web Design'}
                                label={'Name'}
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}>
                            </Input>
                        </div>
                        <div className={'modalField'}>
                            <div className={'my-input_label-wrapper'}>
                                <label className={'my-input_label'} htmlFor="Columns">Sub Tasks</label>
                            </div>
                            <div className={'inputList'} id='Columns'>
                            {subTasks.map((column, index) =>
                                    <div key={index} className={'inputListItem'}>
                                        <Input value={column.title}
                                               onChange={(event)=> handleSubTaskTitleChanges(index, event)}>
                                        </Input>
                                        <button className={'closeBtn'} onClick={() => {deleteSubTask(index)}}>X</button>
                                    </div>
                                )}
                            <Button fullWidth={true} view={'secondary'} onClick={addSubTask}>
                                + Add New Sub Task
                            </Button>
                            <DropDownButton values={boards[selectedBoardIndex].columns.map(({title})=>title)}
                                            selected={boards[selectedBoardIndex].columns[selectedColumnIndex].title}
                                            onChangeSelectedHandler={changeSelectedColumnHandler}
                                            label={'Columns'}>
                            </DropDownButton>
                            </div>
                        </div>
                    </div>
                    <div className={'modalActions'}>
                        <div className={'actionsContainer'}>
                            <Button fullWidth={true} view={'main'} onClick={createTask}>
                                Create New Task
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;