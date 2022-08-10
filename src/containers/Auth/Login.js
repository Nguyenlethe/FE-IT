import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import  {default as userManage} from '../../services/useServices';

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";


import './Login.scss'; 
// import { FormattedMessage } from 'react-intl';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isShow: false,
            errorMessage: ''
        }
    }
     
    // Xl viết vào thẻ input
    handleOnChangeInput = (e) => {
        if(e.target.name === 'name'){
            this.setState({ email: e.target.value, errorMessage: ''})
        }else{
            this.setState({ password: e.target.value, errorMessage: ''})
        }
    }


    // Xl submit form
    handleLogin = async () => {
        this.setState({errorMessage: ''})
        try{
            let data =  await userManage.handleLogin(this.state.email, this.state.password)
            if(data.data.errCode === 0 ){
                this.props.userLoginSuccess(data.data.user)

                this.setState({errorMessage: ''})
            }else{
                this.setState({errorMessage: data.data.message})

            }

        }
        catch(error){
            this.setState({errorMessage: error.response.data.message})  // Lấy ra được lỗi qua error.response.data.message
        }
    }

    // Xl ẩn hiện password
    handleShowHiden = () => {
        this.setState({ isShow: !this.state.isShow })
    }
  
   
    render() {

    return (
        <div className='login-bgr'>
            <div className="materialContainer">
                <div className="title">LOGIN</div>

                <div className="input">               
                     <label htmlFor='name'>USERNAME</label>
                    <input onChange={(e) => this.handleOnChangeInput(e) } value={this.state.username}  placeholder="Username..." type="text" name="name" id="name" />         
                </div>
                <div className="input">    
                    <label htmlFor='pass'>PASSWORD</label>
                    <div className="item-input ">
                        <input  onChange={(e) => this.handleOnChangeInput(e)} value={this.state.password} placeholder="Password..." type={this.state.isShow  ?'text': 'password' } name="pass" id="pass" /> 
                        <i onClick={() =>  this.handleShowHiden()} className={this.state.isShow  ? "fas fa-eye " : "fas fa-eye-slash"}></i>
                    </div>
                </div>

                <div><a href="#/" className="forgot">Forgot your password?</a></div>

                <span className='showErr'>{this.state.errorMessage}</span>
                <div className="button">
                    <button type="button" onClick={() => this.handleLogin()}>Login</button>
                </div>

                <div className="list-icon">
                    <div className="item google">
                        <i className="fab fa-google google"></i>
                    </div>
                        <div className="item">
                        <i className="fab fa-facebook-f"></i>  
                    </div>
                </div>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
