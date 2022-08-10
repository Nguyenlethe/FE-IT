import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages} from '../../../utils/constant';
import _ from 'lodash'
import {default as useServices } from '../../../services/useServices';

import classNames from 'classnames/bind';
import styles from './ProfileDoctor.module.scss';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);



class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dataProfile: []
        }
    }



    componentDidMount = async ()=>  {
      let id = this.props.doctorId
      let data = await this.getInfoDoctor(id)
      
      this.setState({dataProfile: data.data})
    }


    getInfoDoctor = async (id) => {
        let result = {}
        let res = await useServices.getProfileDoctorById(id)
        if(res && res.data.errCode === 0){
            result = res.data
        }
        return result
    }

    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.doctorId !== this.props.doctorId){
            // let res = await useServices.getProfileDoctorById(this.props.doctorId)
            // console.log(res)
        }

        if(prevProps.dataTime !== this.props.dataTime){
            // let res = await useServices.getProfileDoctorById(this.props.doctorId)
            // console.log(res)
        }

    }


    renderTimeBooking = (dateTime) => {
        let {language} = this.props


        if(dateTime && !_.dataTime){
            
            let time = language === languages.EN ? dateTime.timeTypeData.valueEn : dateTime.timeTypeData.valueVi

            return (
                <>
                    <h6>{time}  -   {dateTime.date}</h6>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
    }
      
    render() {

        let {dataProfile} = this.state
        let {language,isShowDescriptionDoctor,dataTime,isShowLinkDetail, isShowPrice,doctorId} = this.props
    
        // isShowLinkDetail
        // isShowPrice

        let nameVi, nameEn = 'Không Có Dữ Liệu !'
        if(dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        
        return (
        <div className={cx('content-detail')}>
            <div className={cx('introl-doctor')}>
                <div className={cx('item-left')}>
                    <img src={dataProfile.image ? dataProfile.image : ''} alt="Avata"/>
                </div>
                <div className={cx('item-right')}>

                    <h5>{languages.EN === this.props.language ? nameEn : nameVi }</h5>
                    {this.renderTimeBooking(dataTime)}
                    { isShowDescriptionDoctor === true &&
                        <>
                            {dataProfile.Markdown && dataProfile.Markdown.description && 
                                <h6>{dataProfile.Markdown.description}</h6>
                            }
                        </>
                    }
                </div>
            </div>

            {isShowLinkDetail === true && <div><Link to={`/detail-doctor/${doctorId}`} >Xem Thêm</Link></div>}


            {!isShowPrice &&
                <p>GÍA KHÁM : 
                    {dataProfile && dataProfile.Doctor_info && 
                    dataProfile.Doctor_info.priceData && dataProfile.Doctor_info.priceData.valueVi 
                    && dataProfile.Doctor_info.priceData.valueEn ? 
                    languages.EN === language ? 
                    <NumberFormat value={dataProfile.Doctor_info.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={' USD'} /> : 
                    <NumberFormat value={dataProfile.Doctor_info.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={' VND'} /> 
                    :''
                    }
                </p>
            }


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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
