import {Routes , Route} from 'react-router-dom';
import {SearchAppBar} from '../Components/SearchAppBar';
import {Home} from '../Components/Home';
import {Details} from '../Components/Details';
import { NotFound } from '../Components/NotFound';


export const AllRoutes = () =>{
    return (
        <>
            <SearchAppBar />
            <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/details/:id" element={<Details />} />
                 <Route path="*" element={<NotFound />} />
            </Routes>        
        </>
    )
}

