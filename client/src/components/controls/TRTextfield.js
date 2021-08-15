import { TextField } from '@material-ui/core'
import '../style/controls/TRTextfield.css'

export default function TRTextfield(props){
    return <TextField
        label={props.label}
        value={props.value}
        onChange={props.onChange}
    />
}
