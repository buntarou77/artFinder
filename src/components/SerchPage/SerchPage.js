import './SerchPage.scss'
import { useState, useEffect, useMemo } from 'react';
import useDebounce from '../../services/useDebounce';
import useRequest from '../../services/useRequest';
import { Link } from 'react-router-dom';
const Serch = () =>{
    const {getInfoStartsWith} = useRequest();
    const [state, setState] = useState('')
    const [data,setData] = useState([])
    const debounced = useDebounce(state, 500);
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [collection, setCollection] = useState('');
    useEffect(()=>{
        console.log(state)
        if(!state){
            setData([])
        }
        loadedCard(state, type, timeStart, timeEnd, location, collection)
    }, [debounced, timeStart, timeEnd, type, location, collection])
    function loadedCard(str, type, timeStart, timeEnd , location, collection){
        if(!state){
            return 
        }
        while(str.includes(' ')){
            str = str.replace(' ', `+`)
        }
        while(collection.includes(' ')){
            collection = collection.replace(' ', `%2B`)
        }
        
        getInfoStartsWith(str, type, timeStart, timeEnd, location, collection)
        .then(res=>setData(res))
    }
    function onInput(e){
        setState(e.target.value)
    }
    function onChangeType(e){
        setType(e.target.value)
    }
    function onChangeLocation(e){
        setLocation(e.target.value)
    }
    function onChangeTimeStart(e){
        setTimeStart(e.target.value)
    }
    function onChangeTimeEnd(e){
        setTimeEnd(e.target.value)
    }
    function onChangeCollection(e){
        setCollection(e.target.value)
    }
    const renderResults = useMemo(() => {
        console.log(data.items)
        if (data.length === 0) {
            return null; 
        }
        return data.items.map((item) => {
            if (!item) return null;
            return (
                <Link to={`/card${item.id}`}key={item.id}>
                    <div className='result_item'>
                        <img src={item.edmPreview || require('../../services/noImage.png')} alt="cardImage" />
                        <div className="info_text">
                            <h1>{item.title[0]}</h1>
                        </div>
                    </div>
                </Link>
            );
        });
    }, [data]);
    console.log(data)
    return(
        <div className="container">
        <div className="header_search">
            <input 
            value={state}
            onChange={(e)=>onInput(e)}
            type="text"
             placeholder="Search for artworks..."
              aria-label="Search for artworks"
               />
            <button type="submit">Search</button>
        </div>
        <div className="filters">
            <ul className='change_filters'>
                <li className='media'> <span>type</span>
                    <select name="media" id="options" className='media_type' onChange={e=>onChangeType(e)}>
                    <option value="all">all</option>
                    <option value="image">image</option>
                    <option value="sound">sound</option>
                    <option value="TEXT">TEXT</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="3D">3D</option>
                    </select></li>
                <li className='location'><span>location</span><input onChange={e=>onChangeLocation(e)} type="text" /></li>
                <li className='time'>
                <div className='time-text'>
                <span>Time start</span><span>Time end</span>
                </div>
                <div className='inputs'>
                <input className='mini-input' onChange={e=>{onChangeTimeStart(e)}} type="text" />
                <input className='mini-input' onChange={e=>{onChangeTimeEnd(e)}} type="text" />
                </div>
                </li>
                <li className='collection'><span>collection</span><input onChange={e=>onChangeCollection(e)} type="text" /></li>
            </ul>
        </div>

        <div className="items">
            {renderResults}
        </div>
        </div>
    )
}
export default Serch;