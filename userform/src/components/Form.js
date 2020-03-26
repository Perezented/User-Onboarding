import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email()
        .required("Email is required"),
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

    const validateChange = event => {
        yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setError({
                    ...error,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setError({
                    ...error,
                    [event.target.name]: err.errors[0]
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
    const inputChange = event => {
        event.persist();
        const newerFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
        };
        validateChange(event);
        setFormState(newerFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name:
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="firstName lastName"
                    value={formState.name}
                    onChange={inputChange}
                />{" "}
                {error.name.length > 0 ? (
                    <p className="error">{error.name}</p>
                ) : null}
            </label>
            <br />
            <label htmlFor="name">
                Email:
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                    value={formState.email}
                    onChange={inputChange}
                />
                {error.email.length > 0 ? (
                    <p className="error">{error.email}</p>
                ) : null}
            </label>
            <br />
            <label>
                Password:
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputChange}
                    value={formState.password}
                />
                {error.password.length > 0 ? (
                    <p className="error">{error.password}</p>
                ) : null}
            </label>
            <br />
            <label>
                <input
                    type="checkbox"
                    name="terms"
                    onChange={inputChange}
                    value={formState.terms}
                />
                Terms and Conditions
            </label>
            <br />
            <pre>{JSON.stringify(post, null, 2)}</pre>

            <button disabled={greyButton}>Submit</button>
        </form>
    );
}
