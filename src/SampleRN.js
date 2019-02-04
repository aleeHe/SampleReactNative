import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Navigator from './Navigator';
import { connect } from 'react-redux';

class SampleRN extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Navigator />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect()(SampleRN)