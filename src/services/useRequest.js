import { useHttp } from '../hooks/useHttp';

const useRequest = () => {
    const { request, loading } = useHttp();
    const _apiBase = 'https://api.europeana.eu'
    const _apiKey = 'priturri';
    const getRecommendations = async (size) =>{
        const res = await request(`${_apiBase}/recommend/record/2021672/resource_document_mauritshuis_670?page=${size}&pageSize=10&seed=1&wskey=${_apiKey}`)
        return res.items
    }
    const getSingleCardInfo = async(datasetId, Id)=>{
        const res = await request(`https://record-api-v3.test.eanadev.org/record/v3/${datasetId}/${Id}?wskey=${_apiKey}&profile=full`)
        return res;
    }
    const getInfoStartsWith = async(str,type, timeStart, timeEnd, location, collection)=>{
        let tp = type,
        tms = timeStart,
        tme = timeEnd,
        loc = location,
        collect = collection;
        if(tp !== ''){
            tp = `&qf=${tp.toUpperCase()}`
        }
        if(type === 'all'){
            tp = ''
        }
        if(tms !== '' && tme !== ''){
            str += `&qf=timestamp_created%3A%5B${tms}-01-01T00%3A00%3A0.000Z%20TO%20${tme}-12-01T00%3A00%3A00.000Z%5D`;
        }
        if(loc !== ''){
            tp += `&qf=where:${loc}`
        }
        if(collect !== ''){
            str += `&qf=proxy_dc_creator%3A${collect}`
        }
        const res = await request(`https://api.europeana.eu/record/v2/search.json?query=${str}${tp}&rows=10&sort=score&wskey=priturri`)
        console.log(`https://api.europeana.eu/record/v2/search.json?query=${str}${tp}&rows=10&text_fulltext=true&wskey=priturri`)
        return res
    }
    return {getRecommendations, loading, getSingleCardInfo, getInfoStartsWith};
}
export default useRequest;