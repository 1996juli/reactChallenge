import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { searchHeros } from '../../action/heroAction';

function Search() {

    const dispatch = useDispatch();
    const { errorSearch } = useSelector(state => state.hero)

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                      .required('Choose a superhero'),
        }),
        onSubmit: value => {
            dispatch(searchHeros(value));
        }
        
    });

    return (
        <div className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit} htmlFor="name" className="d-inline-flex">   
                    <input
                        className="form-control me-2"
                        type="input"
                        id="name"
                        placeholder="batman"
                        aria-label="Search"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button className="btn btn-dark" type="submit">
                        Search
                    </button> 
                    
                    <div className="mx-3">
                        { formik.touched.name && formik.errors.name ? (
                            <p className="text-danger fs-5">{formik.errors.name} </p>
                        ) : null } 
                    </div>
                    
                    {errorSearch ? <p className="text-danger fs-5">${errorSearch}</p> : null }
                    
                </form>       
            </div>
        </div>
        
    );
}

export default Search;
 


