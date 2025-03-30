import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useRequest from '../../services/useRequest';
import Spinner from "../spinner/Spinner"; 
import './SingleEntityPage.scss'
const SingleEntityPage = () => {
  const { datatype, EntityId } = useParams(); 
  const [entity, setEntity] = useState(null);
  const [animationKey, setAnimationKey] = useState(null)
  const {getInfoEntity, loading} = useRequest();
  useEffect(() => {
    onRequest(); 
  }, [datatype, EntityId]); 

  const onRequest = async () => {
    const data = await fetchData(datatype, EntityId); 
    onRequestDone(data); 
  };

  const fetchData = async (type, Id) => {
    try {
      const data = await getInfoEntity(Id, type);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return null;
    }
  };

  const onRequestDone = (data) => {
    setAnimationKey(prev => prev + 1);
    setEntity(data); 
  };

  if (loading) {
    return (
      <div className="single_container">
    <Spinner />
    </div>
  ); 
  }

  if (!entity) {
    return <div>No info</div>; 
  }
  console.log(entity)
  let firstValue = 'No desc'
  if(entity.note){
   firstValue = entity?.note[Object.keys(entity?.note)[0]]; 
  }
  return (
    <div className="Entity" key={`entity-${animationKey}`}>
      <div className="container">
        <div className="info">
          <img src={entity.isShownBy.thumbnail} alt="" />
          <div className="text_info">
            <h1>{entity.prefLabel.en }</h1>
            <h2>{entity?.note?.en || firstValue }</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEntityPage;