import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl'

import imgs from '../../../assets/si.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import classNames from 'classnames/bind';
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);

//         <div className={cx('')}></div>


class Handbook extends Component {
    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    render() {
        
      
        
        return (
            <div className={cx('specalty')}>
                <div className={cx('content')}>

                    <div className={cx('heading')}>
                        <h4><FormattedMessage id="specalty.Handbook"/></h4>
                        <a href="/"><FormattedMessage id="specalty.all-posts"/></a>
                    </div>

                    <Slider {...this.settings}>

                        <div className={cx('content-slide')}>

                            <div className={cx('content-half')}>
                                <img src={imgs} alt="/"/>
                                <p><FormattedMessage id="specalty.Handbook-sub"/></p>
                            </div>

                            <div className={cx('content-half')}>
                                <img  src={imgs} alt="/"/>
                                <p><FormattedMessage id="specalty.Handbook-sub"/></p>
                            </div>

                        </div>
                        
                        <p>2</p>

                        <p>3</p>

                        <p>4</p>

                        <p>5</p>

                    </Slider>          
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
