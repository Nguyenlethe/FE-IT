


import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actions  from '../../../store/actions'
import { toast } from 'react-toastify';



import classNames from 'classnames/bind';
import styles from './TabelManageUsers.module.scss';
const cx = classNames.bind(styles);





class TabelManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuerRedux: []
        }
    }

    
    componentDidMount() {
        this.props.fetchUserRedux('all')
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.users !== this.props.users){
            this.setState({
                uuerRedux: this.props.users
            })
        }
    }


    handleDeleteUser = async (data) => {
        await this.props.deleteUserRedux(data)
        this.props.fetchUserRedux('all')
        toast.success(`Xóa thành công !!!`); 
    }

    handleEditUser = (user) => {
        this.props.editUser(user)
    }
   

    render() {

        console.log('redload')

        let listUsers = this.props.users

        console.log(listUsers)
        return (
           <>
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((element,index)=> {
                        return (
                            <tr key={element.id} >
                                <th scope="row">{element.email}</th>
                                <td>{element.firstName}</td>
                                <td>{element.lastName}</td>
                                <td>{element.address}</td>
                                <td>
                                    <button onClick={() => this.handleDeleteUser(element)} className={cx('btns')}>Delete</button>
                                    <button onClick={() => this.handleEditUser(element)} className={cx('btns')}>Change</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
           </>
        )
    }
}
           

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: (data) => dispatch(actions.fetchAllUserStart(data)),
        deleteUserRedux: (data) => dispatch(actions.deleteUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabelManageUsers)