import './welcome.scss';
import useRequest from '../../services/useRequest';
import { useEffect, useState, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import {Link} from 'react-router-dom';
import ErrorBoundary from '../errorBundary/ErrorBoundary'
const Welcome = () => {
    const { getRecommendations, loading } = useRequest();
    const [recommendations, setRecommendations] = useState([]);
    const [size, setSize] = useState(1);
    const [newItemLoading, setNewItemLoading] = useState(true)
    const fetchData = async (size) => {
        try {
            const data = await getRecommendations(size);
            return data;
        } catch (error) {
            console.error("Ошибка при получении рекомендаций:", error);
            return [];
        }
    };
    useEffect(() => {
        onRequest(size);
    }, []);
    const onRequest = async (elem) => {
        const data = await fetchData(elem);
        setNewItemLoading(false)
        onRecommendationsLoaded(data);
    };

    const onRecommendationsLoaded = (list) => {
        setRecommendations((prevRecommendations) => [...prevRecommendations, ...list]); 
        setSize((prevSize) => prevSize + 1); 
    };

    const loadMore = () => {
        onRequest(size);
    };
    function isEnglishText(text, size = 0) {
        const englishRegex = /^[a-zA-Z0-9.,!?;:'"()\s-]+$/;
        return text.length > size && englishRegex.test(text);
    }

    const items = recommendations.map((item) => {
        let desc = 'no Descrtiption(';
        let title = '';
        title = '';
        if (item.dcDescription) {
            desc = item.dcDescription.filter(item=> isEnglishText(item, 50))[0]
            if(!desc){
                desc = item.dcDescription[0]
            }
        }
        if(item.title){
            title = item.title.filter(item=> isEnglishText(item))[0]
            if(!title){
                title = item.title[0]
            }
        }
        if(title.length >= 150) title = `${title.slice(0, 150)}...`
        return (
            <Link to ={`/card${item.id}`} state={{preview: item.edmPreview}}>
            <div className="element" key={item.id}>
                {item.edmPreview && <img src={item.edmPreview} alt={item.title?.[1] || 'Artwork'} />}
                <div className="element_info">
                    <h1 className='element_info-title'>{ title|| 'Untitled'}</h1>
                    {()=> title = ''}
                    <p className='element_info-desc'>{`${desc.slice(0 , 200)}...`}</p>
                    <span className='element_info-by'>by '{item.dataProvider || 'Unknown'}'</span>
                    {item.year && <h2 className='element_info-year'>{item.year}</h2>}
                </div>
            </div>
            </Link>
        );
    });

    const Show = !loading ? {display: 'flex'} : {display: "none"}
    
    return (
        <ErrorBoundary>
        {loading  && newItemLoading ? <div className="center"><Spinner/></div> :
        <section className="recommendations">
            <div className="container">
                <h1>Your recommendations</h1>
                <div className='recommendation_list'>
                    {items}
                </div>
                <div className="button-conatiner">
                    <button className='button_load' style={Show}  onClick={()=>loadMore()}>
                        <div className='button_load-text'>
                            Load more
                        </div>
                    </button>
                </div>
            </div>
        </section>}
        </ErrorBoundary>
    );

};

export default Welcome;