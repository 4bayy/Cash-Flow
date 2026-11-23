import React from 'react'


interface option{
    id: string ,
    label :string
}
interface DropDownProps {
  value: string;
  setValue: (value: string) => void;
  options: option[];
}

function DropDown( {value , setValue , options }  : DropDownProps) {
  return (
    <div>   
        <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400"
      >
        {options.map((option)=>(
            <option key={option.id} value={option.id}  >
                {option.label}
            </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown