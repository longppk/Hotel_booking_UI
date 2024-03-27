import { useState } from "react";

function useHandleChange(initialValues) {
    const [values, setValue] = useState(initialValues)

    const handleChange = (e) => {
        setValue({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    return {
        values,
        handleChange
    }
}

export default useHandleChange;