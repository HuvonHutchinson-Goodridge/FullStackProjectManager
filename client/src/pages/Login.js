import React from 'react';
import { CopyrightText, ButtonGroup, ExtraText, TextLink, StyledFormArea, StyledFormButton, Avatar, colors, StyledTitle } from './../components/styles'
import { StyledContainer } from './../components/styles'
//formik
import { Formik, Form } from 'formik'
import { TextInput } from "./../components/FormLib"
import * as Yup from 'yup';
//logo
import Logo from "./../assets/icon.jfif"

//icons
import { FiMail, FiLock } from 'react-icons/fi'

//loader
import { ThreeDots } from 'react-loader-spinner';

//auth& redux

import { connect } from 'react-redux'
import { LogIn } from './../store/actions'
import { useNavigate } from "react-router-dom";

const Login = ({ LogIn }) => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledContainer>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}> Member Login</StyledTitle>
                <Formik initialValues={{ email: '', password: "" }}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        LogIn(values, navigate, setFieldError, setSubmitting)
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email address").required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required")
                        })}>{({ isSubmitting }) => (
                            <Form>
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
                                <ButtonGroup>
                                {!isSubmitting ? <StyledFormButton type="submit" >Login</StyledFormButton>
                                    : <ThreeDots type="ThreeDots" color={colors.theme} height={49} width={100} />}

                                </ButtonGroup>
                            </Form>
                        )}
                </Formik>
                <ExtraText>
                    New Here? <TextLink to="/registration"> Register </TextLink>
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

export default connect(null, { LogIn })(Login);