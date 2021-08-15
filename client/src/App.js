import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress } from '@material-ui/core'

import  { GetConnection } from "./actions";

import TRTexfield from './components/controls/TRTextfield';
import Section from "./components/Section";
import './App.css';

import { formatDuration } from "./utils";
import TRButton from "./components/controls/TRButton";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetConnection }, dispatch);
}

function App({GetConnection}) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [connection, setConnection] = useState({});
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        GetConnection().then((res) => {
            if(res && res.payload && res.payload.data && res.payload.data.length) {
                setConnection(res.payload.data[0]);
                setLoad(false);
            }
        })
    }, [])

    const onGetConnection = () => {
        GetConnection(from, to).then((res) => {
            if(res && res.payload && res.payload.data && res.payload.data.length) {
                setConnection(res.payload.data[0]);
                setError(false);
            } else {
                setConnection({});
                setError(true);
            }
            setLoad(false);
        })
    }

    return (
        <div className='travel_app_container'>
            <TRTexfield
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            />
            <TRTexfield
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <div className='travel_app_connection_description'>
                <div>
                    Duration: {connection && connection.duration ? formatDuration(connection.duration) : '/'}
                </div>
                <div>
                    Transfers: {connection && connection.transfers ? connection.transfers : '/'}
                </div>
            </div>
            <div className='travel_app_action'>
                <TRButton
                    label='Find'
                    onClick={() => onGetConnection(to, from)}/>
            </div>
            <div className='travel_app_status'>
                {load && <CircularProgress />}
                {error && <div>No data found. Try again :)</div>}
            </div>
            {connection && connection.sections && connection.sections.map((connection, index) => <Section key={index + '_'} obj={connection}/>)}
        </div>
    );
}

export default connect(null, mapDispatchToProps)(App);

