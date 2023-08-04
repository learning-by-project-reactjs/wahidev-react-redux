import React, { Component } from 'react'
import { Container } from "reactstrap";
import BackComponent from '../components/BackComponent';
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import { getUserDetail, putUserUpdate } from '../actions/userAction';
import swal from "sweetalert";

const mapStateToProps = (state) => {
  return {
    getResponseDataUser: state.users.getResponseDataUser,
    errorResponseDataUser: state.users.errorResponseDataUser,
  }
}

class EditUserContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getUserDetail(this.props.match.params.id));
  }

  handleSubmit(data) {
    this.props.dispatch(putUserUpdate(data, this.props.match.params.id));
  }

  render() {
    if (this.props.getResponseDataUser || this.props.errorResponseDataUser) {
      if (this.props.errorResponseDataUser) {
        swal("Failed", this.props.errorResponseDataUser, "error");
      } else {
        swal(
          "User updated!",
          "Nama: " + this.props.getResponseDataUser.nama + 
          ", Umur: " + this.props.getResponseDataUser.umur,
          "success"
        )
      }
    }
    return (
      <Container>
        <BackComponent />
        <h1>Edit User</h1>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
      </Container>
    )
  }
}


export default connect(mapStateToProps, null)(EditUserContainer)