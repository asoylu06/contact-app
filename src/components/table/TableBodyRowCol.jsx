function TableBodyRowCol({ children }) {
  return (
    <td className="py-4 text-sm font-medium text-white md:text-left text-center mx-auto w-1/6 border-b-[1px] border-white ">
      {children}
    </td>
  );
}

export default TableBodyRowCol;
