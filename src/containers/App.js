import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import DetailClinic from './Patient/Clinnic/DetailClinic'
import Home from '../routes/Home';
import Login from './Auth/Login.js';

import System from '../routes/System';
// import { CustomToastCloseButton } from '../components/CustomToast';
// import ConfirmModal from '../components/ConfirmModal';


// Thêm của tôi
import HomePage from '../containers/HomePage/HomePage';
import verifyEmail from './Patient/Doctor/verifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return ( 
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                            {/* {this.props.isLoggedIn && <Header />} */}

                            <span className="content-container"> 
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.SCHEDULE_DOCTOR} component={Doctor} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={verifyEmail} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                </Switch>
                            </span>           
                    </div>  
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => { 
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn   
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);