import React from "react"
import "./LabelledInputTypes.css"

const LabelledInputType = ({label,placeholder,onChange,type,value,name})  => {
  return (
   <div className="labelled-main">
   <label className="">{label}</label>
   <input value={value || ""} onChange={onChange} placeholder={placeholder} className="" type={type} name={name} />
   </div>
  )
}

export default LabelledInputType