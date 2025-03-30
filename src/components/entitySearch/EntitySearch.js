import './EntitySearch.scss'
import { useState, useEffect, useMemo, useRef } from 'react';
import useDebounce from '../../services/useDebounce';
import useRequest from '../../services/useRequest';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
const EntitySearch = () =>{
    const {getEntityStartsWith} = useRequest();
    const [state, setState] = useState('')
    const [data,setData] = useState([])
    const debounced = useDebounce(state, 500);
    const [type, setType] = useState('');
    const nodeRef = useRef(null)
    useEffect(()=>{
        if(!state){
            setData([])
        }
        loadedCard(state, type)
    }, [debounced,type])
    function loadedCard(str, type){
        if(!state){
            return 
        }
        while(str.includes(' ')){
            str = str.replace(' ', `+`)
        }

        
        getEntityStartsWith(str, type)
        .then(res=>setData(res))
    }
    function onInput(e){
        setState(e.target.value)
    }
    function onChangeType(e){
        console.log(e.target.value)
        setType(e.target.value)
    }
    const renderResults = useMemo(() => {
        if (data.length === 0 || !Array.isArray(data.items)) {
            return null;
        }
    
        return (
            <TransitionGroup component="div" className="items">
                {data.items.map((item) => {
                    if (!item) return null;
                    
                    const firstKey = Object.keys(item.prefLabel)[0];
                    const firstValue = item.prefLabel[firstKey];
                    const realId = `${item.id}`.split('/');
    
                    return (
                        <CSSTransition
                            key={item.id}
                            timeout={200}
                            classNames="fade"
                            unmountOnExit
                            nodeRef={nodeRef}
                        >
                            <Link to={`/Entity/${item.type}/${realId[realId.length - 1]}`}>
                                <div className='result_item'>
                                    {item.isShownBy?.thumbnail ? (
                                        <img src={item.isShownBy.thumbnail} alt="" />) : 
                                        (
                                        <img src={require('../resources/noImage.png')} alt="" />
                                    )}
                                    <div className="info_text">
                                        <h1>{item.prefLabel.en || firstValue}</h1>
                                        <h2>{item.type}</h2>
                                    </div>
                                </div>
                            </Link>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        );
    }, [data]);
    return(
        <div className="container">
        <div className="EntitySearch">
        <div className="serch_parametrs">
        <div className="header_search">
            <input 
            value={state}
            onChange={(e)=>onInput(e)}
            type="text"
             placeholder="Search for artworks..."
              aria-label="Search for artworks"
               />
        </div>
        <div className="entityFilter">
                    <select name="media" id="options" className='media_type' onChange={e=>onChangeType(e)}>
                    <option value="all">all</option>
                    <option value="agent">agent</option>
                    <option value="concept">concept</option>
                    <option value="place">place</option>
                    <option value="timespan">time span</option>
                    <option value="organization">organization</option>
                    </select>
        </div>
        </div>
        
            {renderResults}
        
        </div>
        </div>
    )
}
export default EntitySearch;