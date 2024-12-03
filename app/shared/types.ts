export type BoardModalType = {
    open: boolean,
    onClose : () => void,
}

export type TaskModalType = {
    task?: Task;
    columnTitle?: string;
} & BoardModalType

export type Board = {
    name : string,
    selected?: boolean,
    columns : Column[],
}

export type DraggedTask = {
    columnTitle: string;
    task: Task;
}

export type Column = {
    title : string,
    tasks? : Task[],
}

export type Task = {
    title : string,
    done?: boolean;
    subTasks?: Task[],
}

export type BoardsContextType = {
    boards: Board[],
    setBoards: (boards: Board[]) => void
}