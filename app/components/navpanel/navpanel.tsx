'use client'

import "./navpanel.css";

import {useState} from "react";
import {useBoardsContext} from "@/app/context/BoardsContext";
import BoardModal from "@/app/components/boardModal/boardModal";
import {Board} from "@/app/shared/types";

const NavPanel = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {setOpenModal(true)};
    const handleCloseModal = () => {setOpenModal(false)};
    const { boards, setBoards } = useBoardsContext();
    const onBoardClickHandler = (index: number) => {
        const boardsWithSelected = boards.map((board, i) => {
            index === i ? board.selected = true : board.selected = false;
            return board
        });
        setBoards(boardsWithSelected);
    }

    return (
        <div className={'nav-panel'}>
            <div className={'nav-spacer'}></div>
            <div className={'nav-content'}>
                <div className={'nav-title'}>Navigation Panel</div>
                <ul className={'nav-list'}>
                    {boards.map((board: Board, index: number) =>
                        <li key={index}>
                            <div className={'nav-item'} onClick={() => onBoardClickHandler(index)}>
                                <img className={'list-img'} src='/board.svg'></img>
                                <span>{board.name}</span>
                            </div>
                        </li>)}
                    <li>
                        <div className={'nav-item nav-item-new'} onClick={handleOpenModal}>
                            <img className={'list-img'} src='/board.svg'></img>
                            <span>+ Create Board</span>
                        </div>
                    </li>
                    {openModal && <BoardModal open={openModal} onClose={handleCloseModal}></BoardModal>}
                </ul>
                <div className={'nav-footer'}>footer</div>
            </div>
        </div>
    )
}
export default NavPanel;