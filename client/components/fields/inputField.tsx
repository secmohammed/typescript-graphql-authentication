import React, { InputHTMLAttributes, DetailedHTMLProps } from "react";
import { FieldProps } from "formik";
type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
import { TextInput } from "react-materialize";
export const InputField = ({
    field,
    form: { errors, touched },
    ...props
}: FieldProps & InputProps) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return (
        <div className="input-field col s8">
            <TextInput {...field} {...props} />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
    );
};
