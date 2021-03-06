import React from "react";
import { MDBAlert } from 'mdbreact';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { resetResponse } from '../../actions/locationAction';

const AlertPage = () => {
  const error = useSelector(state => state.location.error, shallowEqual);
  const success = useSelector(state => state.location.success, shallowEqual);
  const info = useSelector(state => state.location.info, shallowEqual);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(resetResponse());
  }

  if(error || success || info){
    setTimeout(() => {
      onClose();
    }, 10000);
  }

  const color = error ? "danger" :  (success ? "success" : info ? "primary" : "");
  if (error || success || info) {
    return (
      <MDBAlert color= {color} onClose={onClose} dismiss>
        {error || success || info || ""}
      </MDBAlert>
    )
  }
  
  return "";
};

export default AlertPage;