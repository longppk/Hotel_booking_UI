import React, { useEffect, useRef, useState } from 'react'

export default function useClickOutSide(dom = "button") {
  
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        function handleClick(e){
            if(dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.matches(dom)){
                setShowDropdown(false)
            }
        }
        document.addEventListener("click",handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    },[dom])

    return {
        showDropdown,
        setShowDropdown,
        dropdownRef,
    }
}
