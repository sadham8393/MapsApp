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

  if (error) {
    return (
      <MDBAlert color="danger" onClose={onClose} dismiss>
        {error}
      </MDBAlert>
    )
  }

  if (info) {
    return (
      <MDBAlert color="warning" onClose={onClose} dismiss>
        {info}
      </MDBAlert>
    )
  }

  if (success) {
    return (
      <MDBAlert color="success" onClose={onClose} dismiss>
        {success}
      </MDBAlert>
    )
  }
  return "";
};

export default AlertPage;