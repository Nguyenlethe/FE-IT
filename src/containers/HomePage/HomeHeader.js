import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/logo.svg'
import {FormattedMessage} from 'react-intl'
import {languages}  from '../../utils/constant'
import {changeLanguageApp} from  '../../store/actions/appActions'
import { withRouter } from 'react-router';


import classNames from 'classnames/bind';
import styles from './HomeHeader.module.scss';
// import {Link, NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

//         <div className={cx('')}></div>


class HomeHeader extends Component {


    nextHomePage = () => {
        this.props.history.push(`/home`)
    }

    changeLanguage = (language) => {
       this.props.changeLanguageAppRedux(language)
    }


    render() {
        
        let {language,isShowBanner} = this.props
        
        return (
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('nav')}>

                        <div className={cx('logo-menu')}>
                            <i className="fas fa-list-ul"></i>
                            <div className={cx('logo-nav')}></div>
                           
                                <img src={logo} alt="" onClick={() => this.nextHomePage()} />
                         

                        </div>

                        <div className={cx('content-nav')}>
                            <a href="#/" className={cx('text-nav')}>
                                <h4><FormattedMessage id="home-nav.specialist"/></h4>
                                <span><FormattedMessage id="home-nav.search-docter"/></span>
                            </a>

                            <a href="#/" className={cx('text-nav')}>
                                <h4><FormattedMessage id="home-nav.package"/></h4>
                                <span><FormattedMessage id="home-nav.generality"/></span>
                            </a>

                            <a href="#/" className={cx('text-nav')}>
                                <h4><FormattedMessage id="home-nav.health-facilities"/></h4>
                                <span><FormattedMessage id="home-nav.search-specialist"/></span>
                            </a>

                            <a href="#/" className={cx('text-nav')}>
                                <h4><FormattedMessage id="home-nav.doctor"/></h4>
                                <span><FormattedMessage id="home-nav.find-docter"/></span>
                            </a>

                            
                        </div>

                        <div className={cx('help')}>

                            <div className={cx('language')}>
                                <h4 className={cx(language === languages.EN ? 'active' : '')} onClick={() => this.changeLanguage(languages.EN)}>ENG</h4>
                                <span>|</span>
                                <h4 className={cx(language === languages.VI ? 'active' : '')} onClick={() => this.changeLanguage(languages.VI)}>VIE</h4>
                            </div>
                            
                        
                            <div className={cx('list-help')}>
                                <i className="far fa-question-circle"></i>
                                <a href="#/" className={cx('help')}><FormattedMessage id="home-nav.support"/></a>
                            </div>
                        </div>
                    </div> 
                </div>
                {isShowBanner === false ?  '' : 
                <div className={cx('banner')}>
                    <div className={cx('content-banner')}>
                        <h4><FormattedMessage id="banner.title-one"/></h4>
                        <h3><FormattedMessage id="banner.title-tow"/></h3>

                        <form action="" className={cx('search-banner')}>
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                            <input type="text" placeholder="Đặt lịch khám bệnh..." className={cx('input')}/>
                        </form>
                    </div>

                    <div className={cx('list-options')}>
                        <div className={cx('content-options')}>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.special"/></p>
                            </a>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.remote"/></p>
                            </a>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.general"/></p>
                            </a>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.medical"/></p>
                            </a>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.mental"/></p>
                            </a>

                            <a href="/" className={cx('options-item')}>
                                <div className={cx('img')}></div>
                                <p><FormattedMessage id="banner.dental"/></p>
                            </a>

                        </div>
                    </div>
                </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))
