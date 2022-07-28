import TableBody from "./TableBody";
import TableHeading from "./TableHeading";

function Table() {
  return (
    <div className="md:max-h-[60vh] max-h-[50vh] md:max-w-[40vw] max-w-[90vw] rounded-lg bg-white overflow-x-hidden overflow-y-auto scrollbar">
      <table className="md:border-x-[40px] border-x-[20px] border-slate-400 table-fixed w-full border-separate border-spacing-0 break-all">
        <TableHeading />
        <TableBody />
      </table>
    </div>
  );
}

export default Table;
