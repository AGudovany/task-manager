'use client'

import "./billboard.css";
import Board from "@/app/components/board/board";
import NavPanel from "@/app/components/navpanel/navpanel";

const Billboard = (props: any) => {

    return (
        <div className={'billboard'}>
            <NavPanel/>
            <Board/>
        </div>
    )
}
export default Billboard;