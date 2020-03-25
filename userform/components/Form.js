import React from 'react'

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required(),
    terms: yup.boolean().oneOf([true], "Need to read and accept the terms"),
    password: yup.string().required('Password is required')
})
export default function Form() {
    
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: '',
    })
    const [post, setPost] = useState([])
    const [greyButton, setButtonOn] = useState(true)
    return (

        )
}