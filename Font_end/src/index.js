import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route, } from "react-router-dom";
import PageLogin from './components/signinup/PageLogin';
import PageSignUp from './components/signinup/PageSignUp';
import PageLiveStream from './components/pageLiveStream/PageLiveStream';
import Channel from './components/channel/Channel';
import SetUpLive from './components/setuplive/SetUpLive';
import UserManagement from './components/userManagement/UserManagement';
import EditProfile from './components/editProfile/EditProfile';
import VideoRecord from './components/record/VideoRecord';
import VideoManagement from './components/videoManagement/VideoManagement';
import VideoLive from './components/videoLive/VideoLive';
import VideoListRecord from './components/videoListRecord/VideoListRecord';
import Search from './components/search/Search';
import VideoListLike from './components/videoListLike/VideoListLike';
import UserDangTheoDoi from './components/UserDangTheoDoi/UserDangTheoDoi';
import UserTheoDoi from './components/UserTheoDoi/UserTheoDoi';
import PhanHoiManagement from './components/PhanHoiManagement/PhanHoiManagement';
import EditVideo from './components/editVideo/EditVideo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/user/sign-in' element={<PageLogin />} />
      <Route path='/user/sign-up' element={<PageSignUp />} />
      <Route path='/live/*' element={<PageLiveStream />} />
      <Route path='/channel/*' element={<Channel />} />
      <Route path='/setuplive' element={<SetUpLive />} />
      <Route path='/admin/usermanagement' element={<UserManagement />} />
      <Route path='/editprofile' element={<EditProfile />} />
      <Route path='/record/*' element={<VideoRecord />} />
      <Route path='/admin/videomanagement' element={<VideoManagement />} />
      <Route path='/video-list/video-live' element={<VideoLive />} />
      <Route path='/video-list/video-record' element={<VideoListRecord />} />
      <Route path='/search/*' element={<Search />} />
      <Route path='/video-list/video-like' element={<VideoListLike />} />
      <Route path='/dang-theo-doi' element={<UserDangTheoDoi />} />
      <Route path='/theo-doi' element={<UserTheoDoi />} />
      <Route path='/admin/phanhoimanagement' element={<PhanHoiManagement/>} />
      <Route path='/admin/editvideo/*' element={<EditVideo/>} />
      <Route path='/admin/editprofile/*' element={<EditProfile/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
