import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl'
import {default as useServices} from '../../../services/useServices'
import { withRouter } from 'react-router';

import imgs from '../../../assets/aa.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import classNames from 'classnames/bind';
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);




class Specalty extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dataSpecialty: []
        }
    }



    componentDidMount = async ()=>  {
        let data = await useServices.getAllSpecialty()

        console.log(data)

        if(data && data.data.errCode === 0){
            this.setState({dataSpecialty:data.data.data})
        }
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }





    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    
    render() {
        
        let {dataSpecialty} = this.state
        
      
         
        return (
            <div className={cx('specalty')}>
                <div className={cx('content')}>

                    <div className={cx('heading')}>
                        <h4><FormattedMessage id="specalty.pular"/></h4>
                        <a href="/"><FormattedMessage id="specalty.See-more"/></a>
                    </div>

                    <Slider {...this.settings}>
                           

                            {dataSpecialty && dataSpecialty.length > 0 && 
                                dataSpecialty.map(item => {
                                    return (
                                        <div key={item.id} onClick={() => this.props.history.push(`/detail-specialty/${item.id}`)} className={cx('content-slide')}>
                                            <div className={cx('content-item-show')}>
                                            <img src={item.image} alt="/fggg"/>
                                            <p>{item.name}</p>
                                            </div>
                                        </div>)
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specalty));
