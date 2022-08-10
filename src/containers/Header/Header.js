/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu ,doctorMenu } from './menuApp';
import './Header.scss';
import {languages, USER_ROLE} from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
           menuApp: []
        }
    }


    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount = () => {
        let {userInfo} = (this.props)
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId
            console.log(role)
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu
            }
            if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu
            }
        }

        this.setState({ 
            menuApp : menu
        })
    }

    render() {
        let roleId =  this.props.userInfo.roleId
        let fullName =  this.props.userInfo.fullName

        const { processLogout,language } = this.props;

        return (

            <div className="header-container"> 
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='language'>
                    <marquee style={{width: '60'}}><FormattedMessage id="specalty.welcome"/> {roleId ? roleId : ''} {fullName ? fullName : ''}</marquee>
                    

                    <h4 className={language === languages.EN ? 'active' : ''} onClick={() => this.handleChangeLanguage(languages.EN)}>ENG</h4>
                    <span>|</span>
                    <h4 className={language === languages.VI ? 'active' : ''} onClick={() => this.handleChangeLanguage(languages.VI)}>VIE</h4>
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
