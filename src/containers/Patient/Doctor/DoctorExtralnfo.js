
import React, { Component } from 'react';
import { connect } from "react-redux";
import {default as useServices} from '../../../services/useServices';
import NumberFormat from 'react-number-format';
// import Select from 'react-select';
// import HomeHeader from '../../HomePage/HomeHeader';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import UserManage from '../containers/System/UserManage';
// import UserRedux from '../containers/System/Admin/UserRedux';
// import Header from '../containers/Header/Header';
// import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import { languages} from '../../../utils/constant';
// import moment from 'moment';
// import Localization from 'moment/locale/vi';


import classNames from 'classnames/bind';
import styles from './DoctorExtraInfo.module.scss';
const cx = classNames.bind(styles);


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowHideCoin: false,
            extraInfo: {}
        }
    }

    componentDidMount = async ()=>  {
        if(this.props.idDoctor){

            let data = await useServices.getExtraInfoDoctorById(this.props.idDoctor)
                console.log(data)
                if(data && data.data.data){
                    let extraInfo = data.data.data
                    this.setState({
                        extraInfo: extraInfo
                    })
                }else{
                    let extraInfo = []
                    this.setState({
                        extraInfo: extraInfo
                    })
                }
        }
    }
    
    componentDidUpdate = async(prevProps, prevState)=> {
        if(prevProps.idDoctor !== this.props.idDoctor){
            let data = await useServices.getExtraInfoDoctorById(this.props.idDoctor)
            console.log(data)
            if(data && data.data.data){
                let extraInfo = data.data.data
                this.setState({
                    extraInfo: extraInfo
                })
            }else{
                let extraInfo = []
                this.setState({
                    extraInfo: extraInfo
                })
            }
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowHideCoin: !this.state.isShowHideCoin
        })
    }

    render() {
    let {isShowHideCoin, extraInfo} = this.state
    let {language, idDoctor} = this.props

    


      
    console.log(idDoctor)
       
        return (
            <div className={cx('element')}>
                <div className={cx('ExtraInfo')}>
                    <div className={cx('up')}>
                        <h6 className={cx('down-haeding')}>ĐỊA CHỈ KHÁM</h6>
                        <h6>{extraInfo.nameClinic ? extraInfo.nameClinic : ''}</h6>
                        <h6>{extraInfo.addressClinic ? extraInfo.addressClinic : ""}</h6>
                    </div>

                    <hr></hr>

                    <div className={cx('down active')}>
                        <div className={cx('down-coin')}>
                            <h6 className={cx('down-haeding')}>GÍA KHÁM : </h6>
                            {isShowHideCoin === false && 
                                <>
                                    {extraInfo && extraInfo.priceData && extraInfo.priceData.valueEn && 
                                    <h6>{languages.EN === language ? 
                                        <NumberFormat value={extraInfo.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={' USD'} /> : 
                                        <NumberFormat value={extraInfo.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={' VND'} /> }
                                    </h6>
                                    }
                                    <h6 onClick={() => this.handleShowHide()}> Xem Chi Tiết</h6>
                                </>
                            }
                        </div>
                        {isShowHideCoin && 
                            <div className={cx('options')}>
                            <div className={cx('tabel')}>
                                    <div>
                                        <h6 className={cx('down-haeding')}>GÍA KHÁM </h6>
                                        <span>
                                            {extraInfo && extraInfo.note &&
                                            languages.EN === language ? extraInfo.note : extraInfo.note
                                            }
                                        </span>
                                    </div>
                                    {extraInfo && extraInfo.priceData && extraInfo.priceData.valueEn && 
                                    <h6>{languages.EN === language ? 
                                        <NumberFormat value={extraInfo.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={' USD'} /> :
                                        <NumberFormat value={extraInfo.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={' VND'} /> }
                                    </h6>
                                    }
                            </div>
                            <div className={cx('tabel-sub')}>
                                    <span>Người bệnh có thể thanh toán chi phí bằng hình thức :
                                        {extraInfo && extraInfo.paymentData && extraInfo.paymentData.valueEn &&
                                            languages.EN === language ? extraInfo.paymentData.valueEn : extraInfo.paymentData.valueVi
                                        }
                                    </span>
                            </div>
                            <span className={cx('close-tabel')} onClick={() => this.handleShowHide()}>Ẩn bảng giá</span>
                            </div>
                        }

                    </div>


                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
