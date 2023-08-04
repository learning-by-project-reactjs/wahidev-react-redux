import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Container, Row, Col, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { deleteUser, getUsersList } from '../actions/userAction'

const { SearchBar } = Search;

const handleClick = (dispatch, id) => {
    swal({
        title: "Apakah Anda yakin akan menghapus data ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
    .then((willDelete) => {
        if (willDelete) {
            dispatch(deleteUser(id))
            swal("Data User sukses dihapus!", {
                icon: "success"
            })
            dispatch(getUsersList())
        } else {
            swal("Data gagal dihapus")
        }
    })
}



const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];

const mapStateToProps = (state) => {
    return {
        getUsersList: state.users.getUsersList,
        errorUsersList: state.users.errorUsersList
    }
}

const TableComponent = (props) => {
    const columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        headerStyle: () => {
            return { width: "5%" };
        },
    }, {
        dataField: 'nama',
        text: 'Nama',
        sort: true,
    }, {
        dataField: 'alamat',
        text: 'Alamat',
        sort: true,
    }, {
        dataField: 'link',
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div>
                    <Link to={"detail/" + row.id}>
                        <Button color="dark" className="mr-1">
                            <FontAwesomeIcon icon={faInfo} /> Detail
                        </Button>
                    </Link>
    
                    <Link to={"edit/" + row.id}>
                        <Button color="dark" className="mr-1">
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </Button>
                    </Link>
    
                    <Button color="dark" className="mr-1" onClick={() => handleClick(props.dispatch, row.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                </div>
            )
        }
    }];

    return (
        <Container>
            {props.getUsersList ?
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={props.getUsersList}
                    columns={columns}
                    search
                    defaultSorted={defaultSorted}

                >
                    {
                        props => (
                            <div>
                                <Row>
                                    <Col>
                                        <Link to="/create">
                                            <Button color="dark" className="mr-1">
                                                <FontAwesomeIcon icon={faUserPlus} /> Create User
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <div className='float-right'>
                                            <SearchBar {...props.searchProps} />
                                        </div>
                                    </Col>
                                </Row>

                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                :  (
                    <div className='text-center'>
                        { props.errorUsersList ? <h2>{props.errorUsersList}</h2> : <Spinner color='dark' />}
                    </div>
                    )
                }

        </Container>
    )
}

export default connect(mapStateToProps, null)(TableComponent);