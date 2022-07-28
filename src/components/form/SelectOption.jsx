import { BsGenderAmbiguous } from "react-icons/bs";

function SelectOption({ className, onChange, required }) {
  return (
    <div className={className}>
      <BsGenderAmbiguous className="text-slate-400 text-2xl" />
      <select
        id="gender"
        className="w-full focus:bg-orange-100 focus:outline-none"
        onChange={onChange}
        required={required}
      >
        <option disabled selected value="not defined">
          Select a Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
}

export default SelectOption;
