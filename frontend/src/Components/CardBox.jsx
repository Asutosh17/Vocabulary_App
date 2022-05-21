import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export const CardBox = (props)=>{
    let data = props.e
    const navigate = useNavigate()
    return (
        <>
           <Card key={data._id} style={{marginTop:'1px' , cursor: 'pointer'}} sx={{ minWidth: 275 }} onClick={()=>{navigate(`/details/${data._id}`)}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                    {data.word}
                    </Typography>
                    <Typography variant="body2">
                    ({data.data.lexicalEntries[0].lexicalCategory.id}) {data.data.lexicalEntries[0].entries[0].senses[0].definitions[0]}
                    </Typography>
                </CardContent>
            </Card>        
        </>
    )
}