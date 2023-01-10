import React from 'react';
import API from './../api/API'
import { useEffect } from 'react'
import { fetchPage } from "./../store/actions"
import { connect } from 'react-redux'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { Grid, Box, IconButton, useTheme, TextField, Button } from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { tokens } from './../theme'

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
    confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), "Passwords must match"]),
})

const register = async (credentials) => {
    try {
        const response = await API.register(credentials)
        if (response.data.status === "success") {
            alert("The user has been created")
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
}

const Profile = ({ fetchPage }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const InputBar = ({ md, ...props }) => {
        
        return (
            <Grid item md={md} spacing="5px" mb={5}>
                <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                    <IconButton type="button" sx={{ p: 1 }}>
                        {props.icon}
                    </IconButton>
                    <TextField
                        {...props}
                        fullWidth
                        id={props.id}
                        onBlur={props.onBlur}
                        name={props.name}
                        label={props.label}
                        value={props.value}
                        variant="filled"
                        type="text"
                        onChange={props.onChange}                        error={props.error}
                    />
                </Box>
            </Grid>
        )
    }

    useEffect(() => {
        fetchPage('CREATE ADMIN', 'INPUT ADMIN DETAILS')
    }, [fetchPage])


    return (
        <Grid item md={12} ml="15px">
            <Formik
                onSubmit={(values) => {
                    register(values)
                }}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid md={12} spacing={5} mr="15px">
                            <Box display="flex">
                                <InputBar
                                    onBlur={handleBlur}
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    md={6}
                                    onChange={handleChange}
                                    icon={<PersonOutlineOutlinedIcon />}
                                    error={!touched.firstName && errors.firstName}
                                    helperText={!touched.firstName && errors.firstName}
                                    value={values.firstName} />
                                <InputBar
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    md={6}
                                    onChange={handleChange}
                                    icon={<PersonOutlineOutlinedIcon />}
                                    error={!touched.lastName && errors.lastName}
                                    helperText={!touched.lastName && errors.lastName}
                                    value={values.lastName} />
                            </Box>
                            <InputBar
                                id="email"
                                name="email"
                                label="Email"
                                md={12}
                                onChange={handleChange}
                                icon={<EmailOutlinedIcon />}
                                error={!touched.email && errors.email}
                                helperText={!touched.email && errors.email}
                                value={values.email} />
                            <InputBar
                                id="password"
                                name="password"
                                label="Password"
                                md={12}
                                onChange={handleChange}
                                icon={<PasswordOutlinedIcon />}
                                error={!touched.password && errors.password}
                                helperText={!touched.password && errors.password}
                                value={values.password} />
                            <InputBar
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                md={12}
                                onChange={handleChange}
                                icon={<PasswordOutlinedIcon />}
                                error={!touched.confirmPassword && errors.confirmPassword}
                                helperText={!touched.confirmPassword && errors.confirmPassword}
                                value={values.confirmPassword} />
                            <Box display="flex" justifyContent="end" mt="30px">
                                <Button color="secondary" variant="contained" type="submit">
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Form>)}
            </Formik>
        </Grid>)
}

export default connect(null, { fetchPage })(Profile);

