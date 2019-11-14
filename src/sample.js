import { ALL_EVENTS, SAVE_EVENT } from './action.types';
import { getAllEventsAPI, createEventAPI, updateEventAPI } from './apis';
export const getAllEvents = (apiKey, apiSecret, location_uuid) => {
    return (dispatch) => {
        dispatch({ type: ALL_EVENTS.PENDING });
        return getAllEventsAPI({ apiKey, apiSecret, location_uuid })
            .then(response => {
                dispatch({ type: ALL_EVENTS.SUCCESS, events: response.success })
            })
            .catch(e => {
                dispatch({ type: ALL_EVENTS.ERROR, error: e.response })
            })
    };
};


import { v1 } from 'api';
import { parseResponse } from 'utils';

export const getAllEventsAPI = async (data) => {
    const response = await v1.get('/kits/events?location_uuid=' + data.location_uuid, { key: data.apiKey, secret: data.apiSecret }, data);
    return parseResponse(response);
};


const mapStatesToProps = states => {
    return {
        auth: states.auth,
        events: states.events
    }
}
const mapDispatchtoProps = dispatch => bindActionCreators({
    getAllEvents,
}, dispatch)


export const EventsScreen = connect(mapStatesToProps, mapDispatchtoProps)(Events);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
