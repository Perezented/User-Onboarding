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
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
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
    