import yup from "yup"

export default yup
    .object()
    .shape({
        name: yup
            .string()
            .min(2, "Too short (name)")
            .max(80, "Too long (name)")
            .required("Required (name)"),
        email: yup
            .string()
            .email("Invalid (email)")
            .required("Required (email)"),
        password: yup
            .string()
            .min(8, "Too short (password)")
            .max(30, "Too long (password)")
            .required("Required (password)"),
})
