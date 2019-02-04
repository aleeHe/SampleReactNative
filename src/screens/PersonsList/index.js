import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    NetInfo,
    FlatList,
} from 'react-native';
import { changeStatusIntervalTime } from "../../env";
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { deQueueUserData, updateUser } from "../../actions";

class PersonsList extends Component {
    constructor(props) {
        super(props);
    }

    statusInterval = null;

    componentDidMount() {
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        this.statusInterval = setInterval(async () => {
            const isConnected = await NetInfo.isConnected.fetch();
            if (isConnected) {
                this.props.users.map(user => {
                    const newStatus = Math.floor(Math.random() * 3);
                    this.props.dispatch(updateUser({code: user.code, userData: {status: newStatus}}));
                })
            }
        }, changeStatusIntervalTime);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
        clearInterval(statusInterval);
    }

    handleConnectivityChange = connectionInfo => {
        let {unRegisteredChanges} = this.props;
        if (connectionInfo.type != 'none' && unRegisteredChanges.length) {
            alert('network connected! applying changes...')
            unRegisteredChanges.forEach(userData => {
                this.props.dispatch(deQueueUserData({userData}));
            });
        }
    }

    onUserRowClick(userData) {
        Actions.createPerson({type: ActionConst.PUSH, userData});
    }

    renderFlatListItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onUserRowClick(item)} style={styles.flatListItem}>
            <Text style={{color: '#28A0DD', width: 80}}>{item.status == 2 ? 'InActive' : item.status == 1 ? 'Active' : 'none'}</Text>
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
        <View style={styles.noUsersContainer}>
            <Text>No User Exist</Text>
            <TouchableOpacity onPress={props.onCreateUserClick} style={styles.noUsersAddButton}>
                <Text style={styles.buttonText}>+ Add User</Text>
            </TouchableOpacity>
        </View>
    );
}

const UsersList = props => {
    return(
        <View style={styles.usersListContainer}>
            <View style={styles.usersListHeader}>
                <Text style={{fontSize: 18}}>Users List</Text>
                <TouchableOpacity onPress={props.onCreateUserClick} style={styles.usersListAddButton}>
                    <Text style={styles.buttonText}>+ Add</Text>
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
    },
    usersListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    usersListHeader: {
        width: width - 40,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    usersListAddButton: {
        backgroundColor: '#8CAFFA',
        padding: 15,
        borderRadius: 20,
        marginTop: 15
    },
    noUsersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noUsersAddButton: {
        backgroundColor: '#8CAFFA',
        padding: 15,
        borderRadius: 50,
        marginTop: 15
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16
    },
});

const select = store => {
    return {
        users: store.users.users,
        groups: store.users.groups,
        unRegisteredChanges: store.users.unRegisteredChanges,
    }
}

export default connect(select)(PersonsList);