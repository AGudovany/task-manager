import React, {useState} from "react";
import {Task, DraggedTask} from "@/app/shared/types";
import "./task.css"
import TaskModal from "@/app/components/taskModal/taskModal";

type TaskPropsType = {
    task: Task;
    columnTitle: string;
    dragStartHandler: (draggetTask: DraggedTask) => void;
}

const Task = ({task, columnTitle, dragStartHandler}: TaskPropsType) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true)
    };
    const handleCloseModal = () => {
        setOpenModal(false)
    };

    return (
        <>
        <div className="my-task"
             draggable
             onClick={handleOpenModal}
             onDragStart={() => dragStartHandler({columnTitle, task})}>
            <div className="my-task-title h3">{task.title}</div>
            <div className="my-task-text h4">1 of {task.subTasks?.length || 0} subTasks</div>
        </div>
        {openModal && <TaskModal task={task} columnTitle={columnTitle} open={openModal}
                             onClose={handleCloseModal}></TaskModal>}
        </>
    )

}
export default Task;