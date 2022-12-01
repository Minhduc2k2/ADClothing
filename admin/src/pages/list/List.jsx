import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";
import Dbproduct from "../../components/dbproduct/Datatable";
import Dbcategory from "../../components/dbcategories/Datatable";

const List = ({ type }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {type === 1 && <Datatable />}
        {type === 2 && <Dbproduct />}
        {type === 3 && <Dbcategory />}
      </div>
    </div>
  );
};

export default List;
