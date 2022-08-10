import React, { Component } from 'react';
import { connect } from 'react-redux';

// Thay đổi của tôi
import HomeHeader from './HomeHeader'
import Specalty from './Section/Specalty.js';
import MedicalFacility from './Section/MedicalFacility'
import OutStandingDocter from './Section/OutStandingDocter';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';

class HomePage extends Component {

    



    render() {
    
        return (
           <>
                <HomeHeader isShowBanner={true}/>
                <Specalty/>
                <MedicalFacility/>
                <OutStandingDocter/>
                <Handbook/>
                <About/>
                <HomeFooter/>
           </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
