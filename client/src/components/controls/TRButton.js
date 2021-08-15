import { Button } from '@material-ui/core'
import '../style/controls/TRButton.css'

export default function TRButton(props){
    return <Button
        variant="contained"
        color="primary"
        onClick={props.onClick}
    >{props.label}</Button>
}
