import React from "react";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email()
        .required(),
    terms: yup.boolean().oneOf([true], "Need to read and accept the terms"),
    password: yup.string().required("Password is required")
});
export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });
    const [post, setPost] = useState([]);
    const [greyButton, setButtonOn] = useState(true);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonOn(!valid);
        });
    }, [formState]);

    return (
        <form>
            <label htmlFor="name">
                Name:
                <input type="text" name="name" />
            </label>
            <label htmlFor="name">
                Email:
                <input
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <label>
                <input type="checkbox" name="terms" />
                Terms and Conditions
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>

            <button disabled={greyButton}>Submit</button>
        </form>
    );
}
