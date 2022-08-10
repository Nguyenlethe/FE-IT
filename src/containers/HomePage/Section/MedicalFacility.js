import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl'
import {default as useServices} from '../../../services/useServices'
import { withRouter } from 'react-router';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from 'classnames/bind'; 
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);


 

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
           
        }
    }


    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };



    componentDidMount = async ()=>  {
        let res = await useServices.getAllClinic()
        if(res && res.data.errCode === 0){
            this.setState({
                dataClinics: res.data.data ? res.data.data : []
            })
        }
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }

    
    handleClickClinic = () => {

    }


    render() {


        let {dataClinics} = this.state

        console.log(dataClinics)


        return (
            <div className={cx('specalty')}>
                <div className={cx('content')}>

                    <div className={cx('heading')}>
                        <h4><FormattedMessage id="specalty.outstanding"/></h4>
                        <a href="/"><FormattedMessage id="specalty.See-more"/></a>
                    </div>

                    <Slider {...this.settings}>

                        {dataClinics && dataClinics.length > 0 && 
                            dataClinics.map(item => {
                                return (
                                    <div key={item.id} className={cx('content-slide')} onClick={() => this.props.history.push(`/detail-clinic/${item.id}`)}>
                                        <div className={cx('content-item-show')}>
                                            <img src={item.images} alt="/"/>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                       
                    </Slider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
