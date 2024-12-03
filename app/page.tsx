import Header from "@/app/components/header/header";
import Billboard from "@/app/components/billboard/billboard";
import {BoardContextProvider} from "@/app/context/BoardsContext";

export default function Home() {
  return (
      <BoardContextProvider>
            <div className={'app'}>
                <Header/>
                <Billboard/>
            </div>
      </BoardContextProvider>
  )
}
