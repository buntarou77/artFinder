import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useRequest from '../../services/useRequest';
import Spinner from "../spinner/Spinner";
import './SingleCardPage.scss' 

const SingleCardPage = () => {
  const { databaseId, elementId } = useParams(); 
  const { getSingleCardInfo, loading } = useRequest();
  const [cardData, setCardData] = useState(null); 
  const location = useLocation();
const preview = location.state?.preview;

  useEffect(() => {
    onRequest(); 
  }, []); 

  const onRequest = async () => {
    const data = await fetchData(databaseId, elementId); 
    onRequestDone(data); 
  };

  const fetchData = async (baseId, Id) => {
    try {
      const data = await getSingleCardInfo(baseId, Id);
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return null;
    }
  };

  const onRequestDone = (data) => {
    setCardData(data); 
  };

  if (loading) {
    return (
      <div className="single_container">
    <Spinner />
    </div>
  ); 
  }

  if (!cardData) {
    return <div>No info</div>; 
  }


  let image;
  if (cardData.proxies) {
    for (let i = 0; i < cardData.proxies.length; i++) {
      try {
        if (cardData.proxies[i]?.proxyIn?.preview?.[0]?.id) {
          image = cardData.proxies[i].proxyIn.preview[0].id;
          break;
        }
      } catch (error) {
        console.error("Ошибка при поиске изображения:", error);
      }
    }
  }

  // Поиск описания на английском или голландском языке
  let desc = '';
  function isLongEnglishText(text, size = 0) {
    const englishRegex = /^[a-zA-Z0-9.,!?;:'"()\s-]+$/;
    return text.length > size && englishRegex.test(text);
}
  if (cardData.description) {
    if(cardData.description.length > 1){
      desc = cardData.description.filter(item=> isLongEnglishText(item[`@value`], 200))[0]?.[`@value`]
      if(!desc){
        desc = cardData.description[0][`@value`]
      }
    }else{
      desc = cardData.description[0][`@value`]
    }
  }
  const [key ,value] = Object.entries(cardData.title)[0]
  const title = cardData.title.en || cardData.title?.["en-GB"] || 
  cardData.title?.["nl-NL"] || 
  (Array.isArray(cardData.title?.["@none"]) && cardData.title["@none"][0])  || value ||  "No title" ;
  console.log(cardData)
  return (
    
    <div className="single_container" key={`${databaseId}/${elementId}`}>
      <div className="single_info">
        <img src={image || preview} alt="Artwork" />
        <div className="single_info-text">
          <h1 className="text-title">{title}</h1>
          <div className="divider" />
          <p className="text-desc">{desc}</p>
          {cardData.created?.[0]?.begin && cardData.created?.[0]?.end && (
            <p className="text-creation">{`beginning of creation: ${cardData.created[0].begin}, end of creation: ${cardData.created[0].end}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCardPage;