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

class CreatePerson extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        return(
            <View style={{flex: 1}}>
                <Text>my name is ali</Text>
            </View>
         );
     }
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

export default connect(select)(CreatePerson);