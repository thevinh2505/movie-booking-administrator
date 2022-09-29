

import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    if(!localStorage.getItem('user')){
        return <Redirect to='/signin' />
    }
   

    return (
        <Route
            {...restProps}
            render={(propsRoute) => {
                // props.location
                // props.match
                // props.history
                return (
                    <Fragment>
                        <Component {...propsRoute} />
                    </Fragment>
                );
            }}
        />
    );
};
