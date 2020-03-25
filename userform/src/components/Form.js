import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

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
    const [error, setError] = useState({
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

    const validateChange = e => {
        //12
        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...error,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...error,
                    [e.target.name]: err.errors[0]
                });
            });
    };
    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", post);

                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: ""
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    return (
        <form>
            <label htmlFor="name">
                Name:
                <input type="text" name="name" />{" "}
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
