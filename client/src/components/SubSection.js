import './style/Section.css'
import { formatTime }  from '../utils'

export default function SubSection({obj}) {
    return (
        <div className='travel_app_subsection_container'>
            <span>{formatTime(obj.arrival)}</span>
            <span>{obj.location.name}</span>
        </div>
    );
}


