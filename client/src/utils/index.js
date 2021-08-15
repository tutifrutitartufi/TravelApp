import moment from 'moment';
export function formatTime(date) {
    if(moment(date).format("HH:mm") === 'Invalid date') {
        return '??:??'
    }
    return moment(date).format("HH:mm");
}

export function formatDuration(duration) {
    let date = duration.split('d')[1].split(":");
    return `${date[0]}h${date[0]}m`
}
