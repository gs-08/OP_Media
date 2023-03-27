import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {Videos, ChannelCard} from './';
import { api } from '../utils/api';

const ChannelDetail = () => {
  const [channelDetail,setChannelDetail] = useState(null);
  const [videos,setVideos] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    api(`channels?part=snippet&id=${id}`)
    .then((data)=>{ setChannelDetail(data?.items[0])});

    api(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=>{ setVideos(data?.items)});

  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(4,4,37,1) 0%, rgba(5,19,79,1) 32%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
          height : '300px'
        }}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
    <Box display="flex" p="2">
      <Box sx={{mr:{sm:'100px'}}}/>
        <Videos videos={videos} />
    </Box>
    </Box>
  )
}

export default ChannelDetail