import { NetInfo } from 'react-native';
import { ADD_USER, UPDATE_USER, QUEUE_USER, DEQUEUE_USER } from "../reducers/constants";

function createUser(userData) {
    return async (dispatch, getState) => {
        const isConnected = await NetInfo.isConnected.fetch();
        if(!isConnected) {
            alert('please make sure of your network connection!');
            return Promise.reject();
        } else {
            dispatch({type: ADD_USER, payload: {userData}});
            return Promise.resolve();
        }
    }
}

function updateUser({code, userData}) {
    return async (dispatch, getState) => {
        const isConnected = await NetInfo.isConnected.fetch();
        if(!isConnected) {
            dispatch({type: QUEUE_USER, payload: {userData, code}});
            return Promise.reject();
        } else {
            dispatch({type: UPDATE_USER, payload: {userData, code}});
            return Promise.resolve();
        }
    }
}

function deQueueUserData({userData}) {
    return async (dispatch, getState) => {
        dispatch({type: DEQUEUE_USER, payload: {userData}});
        return Promise.resolve();
    }
}

module.exports = {
    createUser,
    updateUser,
    deQueueUserData,
}