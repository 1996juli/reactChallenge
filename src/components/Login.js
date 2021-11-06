import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startLogin } from '../action/authAction';
import Spinner from "./spinner/Spinner";

const Login = ({history}) => {

    const dispatch = useDispatch();
    const { message, authenticated, loading} = useSelector((state) => state.auth);

    useEffect(() => {
        if(authenticated) {
            return history.push('/');
        } 
    }, [authenticated, history]);

    // Formulario y validación con formik y Yup
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                      .email('This Email is not valid')
                      .required('This Email cannot be empty'),
            password: Yup.string()
                      .required('The password cannot be empty')
        }),
        onSubmit: values => {
            dispatch(startLogin(values))
        }
    });

  return (
        <div className="container">
            <div className="row content d-flex justify-content-center mt-5">
                <div className="col-md-5 p-3 bg-light rounded">
                  
                    <h1 className="text-center">Login</h1>

                    <form  onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-2 p-1">
                            <label htmlFor="email" className="form-label label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            
                            { formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">
                                    <p>{formik.errors.email} </p>
                                </div>
                            ) : null }
                        </div>

                        <div className="form-group mb-2 p-1">
                            <label htmlFor="password" className="form-label label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            { formik.touched.password && formik.errors.password ? (
                                <div className="text-danger">
                                    <p>{formik.errors.password} </p>
                                </div>
                            ) : null }
                        </div>

                        {message && (<div className="alert alert-danger mt-3 p-1 text-center">{message}</div>)} 

                        <div className="d-flex justify-content-center">
                            {loading && <Spinner />}
                        </div>

                        <div className="d-grid gap-2 mb-3">
                            <input
                                type="submit"
                                className="btn btn-dark mt-3"
                                value="Login"   
                            />
                        </div>
                    </form>
                </div>

            </div>
 
        </div>
   );
}
 
export default Login;
