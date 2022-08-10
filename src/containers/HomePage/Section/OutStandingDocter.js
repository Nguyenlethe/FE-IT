import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl'
import imgs from '../../../assets/inh.png'
import * as actions from '../../../store/actions'
import { languages} from '../../../utils/constant';
import { withRouter } from 'react-router';
// import { path } from '../../../utils'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from 'classnames/bind';
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);

//         <div className={cx('')}></div>


class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };



    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topDoctors !== this.props.topDoctors){
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }


    componentDidMount() {
        this.props.loadTopDoctors(10)
    }


    render() {
        let arrDoctors = this.state.arrDoctors

        let {language} = this.props

        return (
            <div className={cx('specalty')}>
                <div className={cx('content')}>

                    <div className={cx('heading')}>
                        <h4><FormattedMessage id="specalty.Last-Week"/></h4>
                        <a href="/"><FormattedMessage id="specalty.See-more"/></a>
                    </div>

                    <Slider {...this.settings}>


                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((element, index) => {

                                let imageBase64 = ''
                                if(element.image){ // Giai ma code anh de hien thi
                                    imageBase64 = new Buffer(element.image,'base64').toString('binary');
                                }

                                let nameVi = `${element.positionData.valueVi}, ${element.firstName} ${element.lastName}`;
                                let nameEn = `${element.positionData.valueEn}, ${element.lastName} ${element.firstName}`;
                                return (
                                    <div onClick={() => this.props.history.push(`/detail-doctor/${element.id}`)} className={cx('content-slide')} key={element.id}>
                                        <div className={cx('content-item-boder')}>
                                            <div className={cx('content-boder')}>
                                                <img src={imageBase64 !== '' ? imageBase64 : imgs} alt="/"/>
                                            </div>
                                            <p>{language === languages.EN ? nameEn : nameVi}</p>
                                            <span>Chuyên Khoa Tim Mạch {index += 1}</span> 
                                        </div>
                                    </div>
                                )
                            })}



                    </Slider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctorStart(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility))
