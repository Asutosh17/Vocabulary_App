import CancelIcon from '@mui/icons-material/Cancel';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom'
import {useState , useEffect} from 'react';
import axios from 'axios';

export const Details = () =>{

    const {id} = useParams();
    const navigate = useNavigate()
    const [data,setData] = useState("");
    const [load,setLoad] = useState(true);

    useEffect(() =>{
      setLoad(true)
      axios.get(`https://vocabulary-app-065.herokuapp.com/dict/${id}`).then((response) =>{
        // console.log(response.data)
        setData(response.data);
        setLoad(false);
      })

    },[])
  
    return (
        <>
          {load?<p style={{margin:'100px'}}>Loading...</p>:<div style={{marginTop:'100px'}}>
            <CancelIcon onClick={()=>{navigate('/')}} style={{cursor:'pointer', fontSize:'40px' , position:'fixed' , right:'20px' , top:'80px'}} />
            <h1 style={{padding:'20px'}}>
              {data.word}
            </h1>
            <div style={{padding:'20px'}}>
              <div style={{color:'gray'}}>
                <p>
                {data.data.lexicalEntries[0].lexicalCategory.id}
                </p>
                <p>
                  Orirgin: {data.data.lexicalEntries[0].entries[0].etymologies[0]}
                </p>
              </div>
              <p>
                {data.data.lexicalEntries[0].entries[0].senses[0].definitions[0]}
              </p>
              {/* <ul>
               <li>{data.data.lexicalEntries[0].entries[0].senses[0].examples[0]}</li>
              </ul> */}
              <br />
                {/* <p style={{color:'gray'}}>
                {data.data.lexicalEntries[1].lexicalCategory.id}
                </p> */}

                {/* <ul>
                  <li>{data.data.lexicalEntries[1].entries[0].senses[0].examples[0]}</li>
                </ul> */}
            </div>
          </div>}
          
        </>
    )
}