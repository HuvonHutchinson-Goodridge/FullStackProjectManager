import React from 'react';
import axios from 'axios';
import { StyledContainer } from './../components/styles'
import { CopyrightText, ButtonGroup, ExtraText, TextLink, StyledFormArea, StyledFormButton, Avatar, colors, StyledTitle } from './../components/styles'

//formik
import { Formik, Form } from 'formik'
import { TextInput } from "./../components/FormLib"
import * as Yup from 'yup';
//logo
import Logo from "./../assets/icon.jfif"

//icons
import { FiMail, FiLock, FiUser } from 'react-icons/fi'

//loader
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";


const Registration = () => {
    const navigate = useNavigate();

    const register = async (credentials, navigate, setFieldError, setSubmitting) => {
            try {
                const response = await axios.post("/api/v1/users/signup", credentials, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                if (response.data.status === "success") {
                    navigate("/login");
                }
                setSubmitting(true);
            } catch (err) {
                
                setFieldError("firstName", err.response.data.message)
                setFieldError("lastName", err.response.data.message)
                setFieldError("email", err.response.data.message)
                setFieldError("password", err.response.data.message)
                setFieldError("confirmPassword", err.response.data.message)
                setSubmitting(false);
            }
    }

    return (
        <div>
            <StyledContainer>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}> Registration</StyledTitle>
                <Formik initialValues={{ firstName: "", lastName: "", email: '', password: "", confirmPassword: "" }}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        register(values, navigate, setFieldError, setSubmitting)
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email address").required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
                            firstName: Yup.string().required("Required"),
                            lastName: Yup.string().required("Required"),
                            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), "Passwords must match"])
                        })}>{({ isSubmitting }) => (
                            <Form>

                            <TextInput
                                icon={<FiUser />}
                                name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Diavos"
                                />
                            <TextInput
                                    icon={<FiUser />}
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    placeholder="Chikere"
                                />
                                <TextInput
                                    icon={<FiMail />}
                                    name="email"
                                    type="text"
                                    label="Email Address"
                                    placeholder="123456789@gmail.com"

                                />
                                <TextInput
                                    icon={<FiLock />}
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="*********"

                                />
                                <TextInput
                                    icon={<FiLock />}
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="*********"
                                />
                                <ButtonGroup>
                                    {!isSubmitting ? <StyledFormButton type="submit" >Register</StyledFormButton>
                                        : <ThreeDots type="ThreeDots" color={colors.theme} height={49} width={100} />}

                                </ButtonGroup>
                            </Form>
                        )}
                </Formik>
                <ExtraText>
                    Already have an account? <TextLink to="/login"> Login </TextLink>
                </ExtraText>
                <ExtraText>
                    <TextLink to="/">Return to Home</TextLink>
                </ExtraText>
                <CopyrightText>All rights reserved &copy;2022</CopyrightText>
                </StyledFormArea>
                </StyledContainer>
        </div>

    )
}

export default Registration;