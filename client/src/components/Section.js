import './style/Section.css'
import SubSection from './SubSection';
import { makeStyles } from '@material-ui/core/styles';
import { AccordionSummary, AccordionDetails , Accordion } from '@material-ui/core';

import TrainIcon from '@material-ui/icons/Train';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import TramIcon from '@material-ui/icons/Tram';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        boxShadow:'rgb(0 0 0 / 15%) 0.95px 2.95px 7.6px',
        margin: '20px 0',
        position: 'relative',
        "& .MuiAccordionDetails-root": {
            display: 'block',
            padding: '8px 8px 16px'
        },
        "& .MuiPaper-root.Mui-disabled": {
            backgroundColor: 'white',
            opacity: 1
        },
        "& .MuiAccordionSummary-root.Mui-disabled": {
            opacity: 1
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Section({obj}) {
    const classes = useStyles();

    const renderIcon = () => {
        if(obj.walk) {
            return <DirectionsWalkIcon/>
        } else  {
            if(obj.journey && obj.journey.category) {
                switch (obj.journey.category) {
                    case 'T':
                        return <TramIcon/>
                    case 'IC':
                        return <TrainIcon/>
                    case 'NF':
                        return <DirectionsBusIcon/>
                    default:
                        return <DirectionsBusIcon/>
                }
            }
        }
    }

    const renderText = () => {
        if(obj.walk) {
            return `Walk to ${obj.arrival && obj.arrival.station && obj.arrival.station.name}`
        }
        return `Take ${obj.journey.category}${obj.journey.number} to ${obj.journey.to}`
    }

    const renderTime = () => {
        let unixTime = obj.arrival.arrivalTimestamp - obj.departure.departureTimestamp;
        if(obj.walk && obj.walk.duration && obj.walk.duration > 0) {
            unixTime += obj.walk.duration;
        }
        let minutes = unixTime / 60;
        if(Math.floor(minutes / 60) > 0) {
            let remainder = minutes - Math.floor(minutes / 60) * 60;
            return `${Math.floor(minutes / 60)}h ${remainder}m`
        }
        return `${minutes}m`
    }
    const renderPassList = () => {
        if(obj.journey && obj.journey.category && obj.journey.category === 'IC') {
            return obj.journey.passList.map((pass,index) => <SubSection key={'_' + index} obj={pass}/>)
        }
    }

    return (
        <div className={classes.root}>
            <Accordion disabled={!(obj.journey && obj.journey.category && obj.journey.category === 'IC')}>
                <AccordionSummary
                    expandIcon={(obj.journey && obj.journey.category && obj.journey.category === 'IC') ? <ExpandMoreIcon /> : null}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className='travel_app_section_container'>
                        {renderIcon()}
                        <div className='travel_app_section_description'>
                            <span>{renderText()}</span>
                            <span>{renderTime()}</span>
                        </div>
                        <div className='travel_app_section_stations'>
                            {obj && obj.journey && obj.journey.passList ? obj.journey.passList.length + ' stations' : null}
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {renderPassList()}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


