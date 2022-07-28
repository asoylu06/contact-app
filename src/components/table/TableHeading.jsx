import TableHeadingCol from "./TableHeadingCol";
import { BsPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";

function TableHeading() {
  return (
    <thead className="sticky top-0 bg-slate-400 z-10 ">
      <tr className="">
        <TableHeadingCol className="w-1/12">
          <AiOutlineNumber className="text-white text-xl h-10 mx-auto md:mx-0" />
        </TableHeadingCol>
        <TableHeadingCol className="w-4/12">
          <BsPersonFill className="text-white text-2xl mx-auto md:mx-0" />
        </TableHeadingCol>
        <TableHeadingCol className="w-3/12">
          <BsFillTelephoneFill className="text-white text-2xl mx-auto md:mx-0" />
        </TableHeadingCol>
        <TableHeadingCol className="w-2/12">
          <BsGenderAmbiguous className="text-white text-2xl mx-auto md:mx-0" />
        </TableHeadingCol>
        <TableHeadingCol className="md:1/12 w-1/12">
          <MdOutlineDeleteForever className="text-red-300 text-2xl mx-auto md:mx-0" />
        </TableHeadingCol>
        <TableHeadingCol className="md:w-1/12 w-2/12">
          <MdEdit className="text-green-300 text-2xl mx-auto md:mx-0" />
        </TableHeadingCol>
      </tr>
    </thead>
  );
}

export default TableHeading;
