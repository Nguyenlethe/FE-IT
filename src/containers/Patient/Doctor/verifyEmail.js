import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import {default as useServices } from '../../../services/useServices';


import classNames from 'classnames/bind';
import styles from './DetailDoctor.module.scss';
const cx = classNames.bind(styles);



class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
           statusVerify: false,
           errCode: 1
        }
    }



    componentDidMount = async ()=>  {
        if(this.props.location && this.props.location.search){
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            console.log(token, doctorId)


            let res = await useServices.postVerifyBookAppointment({token,doctorId})
            console.log(res)
            if(res && res.data.errCode === 0){

                this.setState({
                    statusVerify: true,
                    errCode: res.data.errCode
                })
            }
        }
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

      
    render() {
        let {statusVerify,errCode} = this.state;
        
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <br></br>
                {statusVerify === false ? 
                    <p style={{color: 'red', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>{errCode !== 2 ? 'Co loi say ra ! Lich hen khong ton tai hoac da duoc xac nhan' : 'loading...!'}</p>
                    :
                    <p style={{color: 'red', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>{errCode === 0 && 'Xac nhan thanh cong !'}</p>
                    
                }
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
