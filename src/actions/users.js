import {ToastAndroid, NetInfo} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ADD_USER, UPDATE_USER, QUEUE_USER, DEQUEUE_USER } from "../reducers/constants";


function createUser(userData) {
    return async (dispatch, getState) => {
        const isConnected = await NetInfo.isConnected.fetch();
        if(!isConnected) {
            alert('please make sure of your network connection!');
            return Promise.reject();
        } else {
            dispatch({type: ADD_USER, payload: {userData}});
            Actions.pop();
            alert('User Created!');
            return Promise.resolve();
        }
    }
}

function updateUser({code, userData}) {
    return async (dispatch, getState) => {
        const isConnected = await NetInfo.isConnected.fetch();
        if(!isConnected) {
            alert('user will be updated when network connection be ok');
            return Promise.reject();
        } else {
            dispatch({type: UPDATE_USER, payload: {userData, code}});
            Actions.pop();
            alert('User Updated!');
            return Promise.resolve();
        }
    }
}

function queueUserData({code, userData}) {
    return async (dispatch, getState) => {
        dispatch({type: QUEUE_USER, payload: {userData, code}});
        return Promise.resolve();
    }
}

function deQueueUserData({code, userData}) {
    return async (dispatch, getState) => {
        dispatch({type: DEQUEUE_USER, payload: {userData, code}});
        return Promise.resolve();
    }
}

module.exports = {
    createUser,
    updateUser,
    queueUserData,
    deQueueUserData,
}