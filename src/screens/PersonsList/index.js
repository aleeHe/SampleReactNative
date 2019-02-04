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
import { deQueueUserData } from "../../actions";

class PersonsList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    componentDidMount() {
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange(connectionInfo) {
        let {unRegisteredChanges} = this.props;
        if (connectionInfo.type != 'none' && unRegisteredChanges.length) {
            unRegisteredChanges.forEach(user => {
                this.props.dispatch(deQueueUserData({user}));
            });
        }
    }

    onUserRowClick() {
        // Actions.firstScreen({type: ActionConst.RESET});
    }

    renderFlatListItem = ({item}) => (
        <TouchableOpacity onPress={this.onUserRowClick} style={styles.flatListItem}>
            <Text style={{color: '#28A0DD', width: 70, paddingLeft: 15}}>{item.status}</Text>
            <Text style={{fontSize: 16}}>{`${item.name} ${item.lastName}`}</Text>
        </TouchableOpacity>
    );

    onCreateUserClick() {
        Actions.createPerson({type: ActionConst.PUSH});
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#DBDBDB'}}>
                {this.props.users.length ?
                    <UsersList
                        users={this.props.users.map(user => ({...user, key: user.code}))}
                        renderFlatListItem={this.renderFlatListItem}
                        onCreateUserClick={this.onCreateUserClick}
                    />
                : 
                    <NoUser onCreateUserClick={this.onCreateUserClick} />
                }
            </View>
         );
     }
}

const NoUser = props => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No User Exist</Text>
            <TouchableOpacity onPress={props.onCreateUserClick} style={{backgroundColor: '#8CAFFA', padding: 15, borderRadius: 50, marginTop: 15}}>
                <Text style={{color: '#FFFFFF', fontSize: 16}}>+ Add User</Text>
            </TouchableOpacity>
        </View>
    );
}

const UsersList = props => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: width - 40, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Text style={{fontSize: 18}}>Users List</Text>
                <TouchableOpacity onPress={props.onCreateUserClick} style={{backgroundColor: '#8CAFFA', padding: 15, borderRadius: 20, marginTop: 15}}>
                    <Text style={{color: '#FFFFFF', fontSize: 16}}>+ Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{marginVertical: 20}}
                data={props.users}
                renderItem={props.renderFlatListItem}
                contentContainerStyle={{alignItems: 'center'}}
            />
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    flatListItem: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        width: width - 40,
        marginVertical: 5,
        padding: 15,
        flexDirection: 'row',
    }
});

const select = store => {
    return {
        users: store.users.users,
        groups: store.users.groups,
        unRegisteredChanges: store.users.unRegisteredChanges,
    }
}

export default connect(select)(PersonsList);