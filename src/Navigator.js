import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import { connect } from 'react-redux';

import PersonsList from './screens/PersonsList';
import CreatePerson from './screens/CreatePerson';
import EditPerson from './screens/EditPerson';

const RouterWithRedux = connect()(Router);

class Navigator extends Component {
    render() {
        return(
            <RouterWithRedux>
                <Scene key="root" hideNavBar >
                    <Scene key="personsList" component={PersonsList} initial />
                    <Scene key="createPerson" component={CreatePerson} />
                    <Scene key="editPerson" component={EditPerson} />
                </Scene>
            </RouterWithRedux>
        );
    }
}

export default connect()(Navigator);