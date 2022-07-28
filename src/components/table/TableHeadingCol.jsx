function TableHeadingCol({ children, className }) {
  return (
    <th
      scope="col"
      className={
        "text-sm font-medium text-white py-4 text-center border-b-4 border-white " +
        className
      }
    >
      {children}
    </th>
  );
}

export default TableHeadingCol;
