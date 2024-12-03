'use client'

import "./header.css";
import {useBoardsContext} from "@/app/context/BoardsContext";
import Button from "@/app/components/buttons/button";
import {useState} from "react";
import {Board} from "@/app/shared/types";
import TaskModal from "@/app/components/taskModal/taskModal";

const Header = () => {
    const { boards } = useBoardsContext();
    const [openModal, setOpenModal] = useState(false);
    const [openMenuList, setOpenMenuList] = useState(false)

    const handleOpenModal = () => {setOpenModal(true)};
    const handleCloseModal = () => {setOpenModal(false)};

    const selectedBoard: Board | undefined = boards.find((board) => board.selected);
    const myMenuButtonHandler = () => {
        setOpenMenuList(!openMenuList)
    }

    return (
        <div className={'header'}>
            <div className={'header-wrapper'}>
                <div className={'logo-holder'}>
                    <div className={'logo'}>LOGO</div>
                </div>
                <div className={'header-content'}>
                    <div className={'board-name'}>{selectedBoard?.name}</div>
                    {selectedBoard &&
                        <div className={'menu'}>
                            <Button view={'main'} onClick={handleOpenModal}>+ Add New Task</Button>
                            {openModal && <TaskModal open={openModal} onClose={handleCloseModal}></TaskModal>}
                            <span className={'menu-wrapper'}>
                            <button className={'menu-button'} onClick={myMenuButtonHandler}>
                                <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle
                                    fill="currentColor" cx="2.30769" cy="2.30769" r="2.30769"></circle><circle
                                    fill="currentColor" cx="2.30769" cy="10.0001" r="2.30769"></circle><circle
                                    fill="currentColor" cx="2.30769" cy="17.6925" r="2.30769"></circle>
                                </svg>
                                {openMenuList &&
                                    <div className="my-menu">
                                        <div className="my-menu_overlay"></div>
                                        <div className="my-menu_content" style={{
                                            top: "86.25px",
                                            right: "15px",
                                        }}>
                                            <div className="my-menu-list">
                                                <div className="my-menu-item color-undefined">
                                                    <button className="my-menu-item_button">Edit Board</button>
                                                </div>
                                                <div className="my-menu-item">
                                                    <button className="my-menu-item_button color-destructive">Delete Board</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </button>
                        </span>
                        </div>
                    }
                </div>
            </div>
            <div className={'header-spacer'}/>
        </div>
    )
}
export default Header;