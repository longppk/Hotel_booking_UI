import { useState } from "react";

function useHandleChange(initialValues) {
    const [values, setValues] = useState({ ...initialValues, avatarPreview: null });

    const handleChange = (e) => {
        const { name, type } = e.target;

        if (type === "file") {
            const file = e.target.files[0];
            if (file) {
                try {
                    const avatarPreview = URL.createObjectURL(file);
                    setValues({
                        ...values,
                        [name]: file,
                        avatarPreview: avatarPreview,
                    });
                } catch (error) {
                    console.error("Error creating object URL:", error);
                    setValues({
                        ...values,
                        [name]: file,
                        avatarPreview: null,
                    });
                }
            } else {
                setValues({
                    ...values,
                    [name]: null,
                    avatarPreview: null,
                });
            }
        } else {
            setValues({
                ...values,
                [name]: e.target.value,
            });
        }
    };

    return {
        values,
        handleChange,
        setValues
    };
}

export default useHandleChange;
