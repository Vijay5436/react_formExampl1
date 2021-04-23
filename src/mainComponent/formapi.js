import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import {Formik} from 'formik'


export default class Userform extends Component {
    render() {
        return (
            <>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = 'Required';
                        } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                        errors.email = 'Invalid email address';
                        }else if(!values.password) {
                            errors.password ='Required Password';
                        } else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(values.password)) {
                            errors.password='Invalid password';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        }, 400);
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                         />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        <span>{errors.email && touched.email && errors.email}</span>
                                        

                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                         />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    {errors.password && touched.password && errors.password}
                                    <Form.Check type="checkbox" label="Check me out" />
                                    
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form>

















                        // <Form onSubmit={handleSubmit}>
                        // <input
                        //     type="email"
                        //     name="email"
                        //     onChange={handleChange}
                        //     onBlur={handleBlur}
                        //     value={values.email}
                        // />
                        // {errors.email && touched.email && errors.email}
                        // <br></br>
                        // <input
                        //     type="password"
                        //     name="password"
                        //     onChange={handleChange}
                        //     onBlur={handleBlur}
                        //     value={values.password}
                        // />
                        // {errors.password && touched.password && errors.password}
                        // <br></br>
                        // <button type="submit" disabled={isSubmitting}>
                        //     Submit
                        // </button>
                        // </Form>
                    )}
                </Formik>
            </>
        )
    }
}
