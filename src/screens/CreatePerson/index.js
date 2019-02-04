import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import {createUser, updateUser} from "../../actions";

class CreatePerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            age: '',
            job: '',
            status: 0,
            group: '',
            code: '0',
        };
    }
    
    componentDidMount() {
        if (this.props.userData) {
            const {name, lastName, age, job, status, group, code} = this.props.userData;
            this.setState({name, lastName, age, job, status, group, code});
        } else {
            const code = String(Math.floor(Math.random() * 1000));
            this.setState({group: this.props.groups[0], code});
        }
    }

    onNameChange = name => {
        this.setState({name});
    }
        
    onLastNameChange = lastName => {
        this.setState({lastName});
    }
        
    onAgeChange = age => {
        this.setState({age});
    }
        
    onJobChange = job => {
        this.setState({job});
    }

    onStatusChange = status => {
        this.setState({status});
    }

    onGroupChange = group => {
        this.setState({group});
    }

    validateForm = () => {
        const {name, lastName, age, job} = this.state;
        if (!name || !lastName || !age || !job) {
            return false;
        }
        return true;
    }

    handleSubmitPress = async () => {
        if(!this.validateForm()) {
            return alert('complete the fields first!');
        }
        const {name, lastName, age, job, status, group, code} = this.state;
        const userData = {name, lastName, age, job, status, group, code};
        try {
            if (this.props.userData) {
                try {
                    await this.props.dispatch(updateUser({code, userData}));
                    alert('User Updated!');
                } catch (error) {
                    alert('user will be updated when network connection be ok');
                }
                Actions.pop();
            } else {
                try {
                    await this.props.dispatch(createUser(userData));
                    Actions.pop();
                    alert('User Created!');
                } catch (error) {
                    
                }
            }
        } catch (error) {
            
        }
    }
    
    renderSelectStatus() {
        return(
            <View style={styles.statusRow}>
                <TouchableOpacity
                    style={[styles.activeButtonContainer, {borderColor: this.state.status == 1 ? 'black' : 'transparent'}]}
                    onPress={() => this.onStatusChange(1)}
                >
                    <Text style={styles.statusButtonText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.noneButtonContainer, {borderColor: this.state.status == 0 ? 'black' : 'transparent'}]}
                    onPress={() => this.onStatusChange(0)}
                >
                    <Text style={styles.statusButtonText}>None</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.inActiveButtonContainer, {borderColor: this.state.status == 2 ? 'black' : 'transparent'}]}
                    onPress={() => this.onStatusChange(2)}
                >
                    <Text style={styles.statusButtonText}>InActive</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderSelectGroup() {
        const {groups} = this.props;
        return(
            <View style={styles.groupRow}>
                <TouchableOpacity
                    style={[styles.leftGroupContainer, {borderColor: this.state.group == groups[0] ? 'black' : 'transparent'}]}
                    onPress={() => this.onGroupChange(groups[0])}
                >
                    <Text style={styles.statusButtonText}>{groups[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rightGroupContainer, {borderColor: this.state.group == groups[1] ? 'black' : 'transparent'}]}
                    onPress={() => this.onGroupChange(groups[1])}
                >
                    <Text style={styles.statusButtonText}>{groups[1]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {name, lastName, age, job} = this.state;
        const headerText = this.props.userData ? 'Edit User' : 'Create User';
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>{headerText}</Text>
                <ScrollView style={{flex: 1}}>
                    <KeyboardAvoidingView style={[styles.container, {paddingTop: 0}]}>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            placeholder='Name'
                            autoFocus
                            onChangeText={this.onNameChange}
                        />
                        <TextInput
                            style={styles.textInput}
                            value={lastName}
                            placeholder='LastName'
                            onChangeText={this.onLastNameChange}
                        />
                        <TextInput
                            style={styles.textInput}
                            value={age}
                            placeholder='Age'
                            keyboardType='number-pad'
                            onChangeText={this.onAgeChange}
                        />
                        <TextInput
                            style={styles.textInput}
                            value={job}
                            placeholder='Job'
                            onChangeText={this.onJobChange}
                        />

                        {this.renderSelectStatus()}
                        {this.renderSelectGroup()}


                    </KeyboardAvoidingView>
                </ScrollView>
                <TouchableOpacity onPress={this.handleSubmitPress} style={styles.submitButtonContainer}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
         );
     }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 18,
        marginBottom: 30
    },
    textInput: {
        marginTop: 20,
        borderColor: '#8CAFFA',
        borderWidth: 1,
        width: width - 40,
        borderRadius: 50,
        padding: 10,
    },
    statusRow: {
        width: width - 40,
        flexDirection: 'row',
        marginTop: 20,
    },
    activeButtonContainer: {
        flex: 1,
        backgroundColor: '#00C11A',
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    inActiveButtonContainer: {
        flex: 1,
        backgroundColor: '#E53E1D',
        borderWidth: 2,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    noneButtonContainer: {
        flex: 1,
        backgroundColor: '#CBCBCB',
        borderWidth: 2,
    },
    statusButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 15
    },
    submitButtonContainer: {
        backgroundColor: '#8CAFFA',
        padding: 15,
        borderRadius: 50,
        marginTop: 15,
        width: width - 40
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
    groupRow: {
        width: width - 40,
        flexDirection: 'row',
        marginTop: 20,
    },
    leftGroupContainer: {
        flex: 1,
        backgroundColor: '#CBCBCB',
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    rightGroupContainer: {
        flex: 1,
        backgroundColor: '#CBCBCB',
        borderWidth: 2,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
});

const select = store => {
    return {
        users: store.users.users,
        groups: store.users.groups,
    }
}

export default connect(select)(CreatePerson);