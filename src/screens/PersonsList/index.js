import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Alert,
    Keyboard,
    ActivityIndicator,
    NetInfo,
    NativeModules,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
// import {  } from "../../actions";

class PersonsList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    onPersonClick () {
        // Actions.firstScreen({type: ActionConst.RESET});
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <Text>hello</Text>
            </View>
         );
     }
}

const User = props => {
    return(
        // <TouchableOpacity style={[styles.cardItem]} onPress={props.onClick}>
            
        // </TouchableOpacity>
        null
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
});

const select = store => {
    return {
        users: store.users.users,
        groups: store.users.groups,
    }
}

export default connect(select)(PersonsList);