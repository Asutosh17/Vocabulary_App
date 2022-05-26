import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {useSelector , useDispatch} from 'react-redux';
import {addData} from '../Redux/action';
import {CardBox} from './CardBox'

export const Home = () =>{

    const [show,setShow] = useState(false);
    // const [loading,setLoading] = useState(true);
    const [word,setWord] = useState("");
    const [result,setResult] = useState({});
    const [page,setPage] = useState(1);
    const totalPage = useRef(1);
    const dispatch = useDispatch()
    const allData = useSelector((store)=>store.data)
    
    useEffect(() =>{
        getData()
    },[page])

    const getData = () =>{
        // setLoading(true)
        axios.get(`http://localhost:2345/dict?size=10&page=${page}`).then((response) =>{
            
            totalPage.current = response.data.totalpages
            // console.log(response,totalPage)
            dispatch(addData([...allData,...response.data.vocab]));
            // setLoading(false)
        })
    }

    const scrollToEnd =()=>{
        // console.log(page)
        if(page<totalPage.current){
           setPage(page+1);
        }
    }

    window.onscroll = function (){
        if(Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight){
            scrollToEnd();
        }
    }

    const showAdd = () =>{
        setShow(!show)
    }

    const addWord = () =>{
        setWord(word.toLowerCase())
        axios.get(`https://vocabulary-app-065.herokuapp.com/vocab/${word}`).then((response) =>{
         // console.log(response.data.results[0])
            setResult(response.data.results[0])
            
            // console.log(result)
        
        }).then(postData)
        .catch((err)=>{
            alert("Not Found Please Check Your Spelling")
            setShow(!show)
            console.log(err.message)
        })    
    }

    const postData = () =>{
        if(result.id === word){
            let obj = {'word':word,'data':result}
            // console.log(result)
            axios.post("https://vocabulary-app-065.herokuapp.com/dict",obj).then(response =>{
                // console.log(response.data)
                setShow(!show)
                alert("Added Successfully ✔️")
                getData()
                
            }).catch(err =>{
                console.log(err.message)
            })
        }
    }

    return (
        <>
            <AddBoxIcon onClick={showAdd} className="plusIcon" style={{color: '#4d0b43' , fontSize:'60px' , position: 'fixed' , bottom: '20px' , right:'20px' , cursor: 'pointer'}} />
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography style={{marginTop: '40px',height:'30px', borderTopLeftRadius:'20px' , borderTopRightRadius:'20px' , position:'fixed' ,left:'0px', backgroundColor:'white' , width:'99%' , padding:'10px'}} variant="h5" component="div">
                        Words List 
                    </Typography>
                </CardContent>
            </Card>

            {show?<div style={{height:'100%' , width:'100%' , margin:'0' , padding:'0'}} sx={{ minWidth: 275 }}>
                    <div style={{position:'fixed', backgroundColor:'white', borderRadius:'5px' , height:'200px', width:'350px',top:'50%', left:'50%', marginTop:'-100px' , marginLeft:'-175px' , boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'}} variant="h5" component="div">
                        <h2 style={{paddingLeft:'20px'}} >Add To Dictionary</h2>
                        <p style={{paddingLeft:'20px'}}>New Word</p>
                        <div style={{paddingLeft:'20px'}}><input type="text" onChange={(e)=>setWord(e.target.value)} style={{border:'none' , borderBottom:'3px solid black',padding:'10px 140px 10px 10px'}} /></div>
                        <div style={{marginLeft:'55%', marginTop:'10px'}} >
                            <Button onClick={showAdd} style={{color:'#4d0b43'}} variant="text">Cancel</Button>
                            <Button onClick={addWord} style={{color:'#4d0b43'}} variant="text">Add</Button>
                        </div>
                    </div>
            </div>:""}

            <div style={{marginTop:'70px'}}>
                {allData.map((e)=>(
                    <CardBox key={e._id} e={e} />
                ))}        
            </div>
        </>
    )
}
