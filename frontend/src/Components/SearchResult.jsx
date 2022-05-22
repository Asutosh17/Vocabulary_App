import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export const SearchResult = (props) =>{
    const navigate = useNavigate()
    let array = props.value
    let value = props.value[0];

    const myFun = ()=>{
        props.setSearchShow(!(props.searchShow))
        navigate(`/details/${value._id}`)

    }
    
    return (
        <>
           <div style={{marginTop:'100px',position:'fixed',top:'0px',right:'0%'}}>
               {array.length==1?<Card key={value._id} style={{marginTop:'1px' , cursor: 'pointer',boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}} sx={{ minWidth: 275 }} onClick={myFun}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {value.word}
                            </Typography>
                            <Typography variant="body2">
                            ({value.data.lexicalEntries[0].lexicalCategory.id}) {value.data.lexicalEntries[0].entries[0].senses[0].definitions[0]}
                            </Typography>
                        </CardContent>
                    </Card>    
               :""}
           </div>
        </>
    )
}