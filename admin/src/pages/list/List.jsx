import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
import Dbproduct from "../../components/dbproduct/Datatable"

const List = ({type}) => {

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
       
        {type === 1 && <Datatable/>}
        {type === 2 && <Dbproduct/>}
        
      </div>
    </div>
  )
}

export default List