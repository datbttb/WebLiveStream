import "./VideoManagement.css"
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function VideoManagement(){

    const [listVideoAll, setListVideoAll]=useState([]);
    const [listVideo, setListVideo]=useState([]);
    const [page,setPage] = useState(1);
    const [listPage,setListPage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const currentPage = window.location.pathname;
    const [searchKey, setSearchKey] = useState("");
    const [keyWord,setKeyWord] = useState("");
    const navigate = useNavigate();
    const [trangThaiVideo,setTrangThaiVideo] = useState(-1);

    const handleClickPage = (pagenumber) => {
        setListVideo([]);
        var start = listVideoAll.length - pagenumber*5;
        var end = listVideoAll.length-pagenumber*5+5;
        if(start < 0){
            start =0;
        }
        const dsvideo = listVideoAll.slice(start,end);
        for(let i=0; i<5;i++){
            const video = {
                videoname:dsvideo[5-1-i].name,
                videourl:dsvideo[5-1-i].url,
                videousername:dsvideo[5-1-i].key_id.user_id.username,
                videoviews:dsvideo[5-1-i].views
                
            };
            setListVideo((listold) => [...listold, video]);
        }
        
    }

    const handleClickVideo = (urlVideo) =>{
        navigate('/record/'+urlVideo);
        window.location.reload();
    }

    const handleClickBan = (urlvideo, trangThai, vitri) => {
        let data = JSON.stringify({
            "name": "Cùng chơi lol",
            "views": "10",
            "url": urlvideo,
            "date": "2023-11-06 19:00:00",
            "username": "datbttb",
            "trangThai": trangThai
          });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/video/updateTrangThaiVideo',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

        var mangcu= [...listVideo];
        var giatricu = mangcu[vitri];
        var giatrimoi = {...giatricu,videotrangthai:trangThai};
        mangcu[vitri] = giatrimoi;
        console.log(mangcu);
        setListVideo(mangcu);
    }

    const handleClickSearch = (e) => {
        navigate("/admin/videomanagement?kwmng="+keyWord);
        window.location.reload();
    }

    // const getSearch = (tuKhoa) => {
    //     let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:8081/video/videos-name/'+tuKhoa,
    //         headers: { }
    //       };
          
    //       axios.request(config)
    //       .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //             const dsvideoAll = response.data;
    //             setListVideoAll(dsvideoAll);
    //             var slvideo = dsvideoAll.length;
    //             var macdinh = 5;
    //             if(macdinh >= dsvideoAll.length ){
    //                 macdinh = dsvideoAll.length;
    //             }
    //             const queryString = window.location.search;
    //             const urlParams = new URLSearchParams(queryString);
    //             var kwValue = urlParams.get('page');
    //             if(kwValue!=null){
    //                 setPage(kwValue);
    //             }
    //             else{
    //                 setPage(1);
    //                 kwValue=1;
    //             }
    //             var start = dsvideoAll.length-kwValue*5;
    //             var end = dsvideoAll.length-kwValue*5+5;
    //             if(start < 0){
    //                 start =0;
    //             }
    //             const dsvideo = dsvideoAll.slice(start,end);
    //             var macdinh = 5 
    //             if(macdinh>(end-start)){
    //                 macdinh=end-start;
    //             }
    //             for(let i=0; i<macdinh;i++){
    //                 const video = {
    //                     videott:i+1,
    //                     videoname:dsvideo[macdinh-1-i].name,
    //                     videourl:dsvideo[macdinh-1-i].url,
    //                     videousername:dsvideo[macdinh-1-i].key_id.user_id.username,
    //                     videoviews:dsvideo[macdinh-1-i].views,
    //                     videotrangthai:dsvideo[macdinh-1-i].trangThai
                        
    //                 };
    //                 setListVideo((listold) => [...listold, video]);
    //             }

    //             var slpage=0;
    //             if(slvideo%5!=0){
    //                 slpage=slvideo/5+1;
    //             }
    //             else{
    //                 slpage=slvideo/5;
    //             }
    //             setListPage(Array.from({ length: slpage }, (_, index) => index + 1));
    //             setIsLoading(true);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    // }

    const locTrangThai = () => {
        const selectElement = document.getElementById('sel1');
        const selectedIndex = selectElement.selectedIndex;
        var trangThaiV = -1
        if(selectedIndex == 1){
            trangThaiV = 0;
        }
        if(selectedIndex == 2){
            trangThaiV =3;
        }
        var currentPath = window.location.pathname;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var kwValue = urlParams.get('kwmng');
        if(kwValue!=null){
            currentPath = currentPath+"?kwmng="+keyWord;
        }
        if(trangThaiV != -1 && kwValue!=null){
            navigate(currentPath+"&trangThai="+trangThaiV);
            window.location.reload();
        }
        else if(trangThaiV != -1 && kwValue==null){
            navigate(currentPath+"?trangThai="+trangThaiV);
            window.location.reload();
        }
        else{
            navigate(currentPath);
            window.location.reload();
        }
    }

    const getListVideo = (tuKhoa, trangThai) => {
        var laydulieu = 'http://localhost:8081/video/getall';
        if(tuKhoa!=""){
            laydulieu = 'http://localhost:8081/video/videos-name/'+tuKhoa
        }
        if(trangThai!=-1){
            laydulieu = 'http://localhost:8081/video/getnameandtrangthai?kw='+tuKhoa+'&trangthai='+trangThai;
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: laydulieu,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
                const dsvideoAll = response.data;
                setListVideoAll(dsvideoAll);
                var slvideo = dsvideoAll.length;
                var macdinh = 5;
                if(macdinh >= dsvideoAll.length ){
                    macdinh = dsvideoAll.length;
                }
                // for (let i = 0; i < macdinh; i++) {
                //     const video = {
                //         videott:i+1,
                //         videoname:dsvideo[slvideo-1-i].name,
                //         videourl:dsvideo[slvideo-1-i].url,
                //         videousername:dsvideo[slvideo-1-i].key_id.user_id.username,
                //         videoviews:dsvideo[slvideo-1-i].views
                        
                //     };
                //     // console.log(video);
                //     setListVideo((listold) => [...listold, video]);
                // }
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                var kwValue = urlParams.get('page');
                console.log(kwValue);
                if(kwValue!=null){
                    setPage(kwValue);
                }
                else{
                    setPage(1);
                    kwValue=1;
                }
                var start = dsvideoAll.length-kwValue*5;
                var end = dsvideoAll.length-kwValue*5+5;
                if(start < 0){
                    start =0;
                }
                const dsvideo = dsvideoAll.slice(start,end);
                var macdinh = 5 
                if(macdinh>(end-start)){
                    macdinh=end-start;
                }
                for(let i=0; i<(end-start);i++){
                    const video = {
                        videott:i+1,
                        videoname:dsvideo[macdinh-1-i].name,
                        videourl:dsvideo[macdinh-1-i].url,
                        videousername:dsvideo[macdinh-1-i].key_id.user_id.username,
                        videoviews:dsvideo[macdinh-1-i].views,
                        videotrangthai:dsvideo[macdinh-1-i].trangThai
                        
                    };
                    setListVideo((listold) => [...listold, video]);
                }

                var slpage=0;
                if(slvideo%5!=0){
                    slpage=slvideo/5+1;
                }
                else{
                    slpage=slvideo/5;
                }
                setListPage(Array.from({ length: slpage }, (_, index) => index + 1));
                setIsLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        // var kwValue = urlParams.get('kwmng');
        // if(kwValue !=null){
        //     setSearchKey("?kwmng="+kwValue);
        //     getSearch(kwValue);
        //     setKeyWord(kwValue);
        // }
        // else{
        //     getListVideo();
        // }
        var kwValue = urlParams.get('kwmng');
        var trangThaiV = urlParams.get('trangThai');
        if(trangThaiV == null){
            setTrangThaiVideo("None");
        }
        if(trangThaiV == 0){
            setTrangThaiVideo("Bình thường");
        }
        if(trangThaiV == 3){
            setTrangThaiVideo("Bị cấm");
        }

        if(kwValue !=null && trangThaiV==null){
            setSearchKey("?kwmng="+kwValue);
            getListVideo(kwValue,-1);
            setKeyWord(kwValue);
        }
        else if(kwValue !=null && trangThaiV!=null){
            setSearchKey("?kwmng="+kwValue);
            getListVideo(kwValue,trangThaiV);
            setKeyWord(kwValue);
        }
        else if(kwValue ==null && trangThaiV!=null){
            setSearchKey("?kwmng="+kwValue);
            getListVideo("",trangThaiV);
            setKeyWord(kwValue);
        }
        else{
            getListVideo("",-1);
        }

        const handlePopState = () => {
        window.location.reload();
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
        window.removeEventListener('popstate', handlePopState);
        };
        
    },[])

    return (
    <div className="user-manager">
        <Header/>
        <div class="main-display">
            <Sidebar/>
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Quản lý <b>buổi phát sóng</b></h2>
                            </div>
                            <div className="container mt-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search..." value={keyWord} onChange={(e) => {setKeyWord(e.target.value)}}/>
                                    <button className="btn btn-outline-secondary" type="button" onClick={handleClickSearch}>
                                    <i className="bi bi-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Trạng thái:</label>
                        <select class="form-select" id="sel1" name="sellist1" onChange={(e) => locTrangThai()} value={trangThaiVideo}>
                        <option>None</option>
                        <option>Bình thường</option>
                        <option>Bị cấm</option>
                        </select>
                    </div>
                    {isLoading ? (
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>Video Name</th>
                                <th>URL</th>
                                <th>Người sở hữu</th>
                                <th>Số lượt xem</th>
                                <th>Trạng Thái</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>			
                            {listVideo.map((item,index) => (
                                <tr>
                                    <td>{item.videott}</td>
                                    <td>{item.videoname}</td>
                                    <td onClick={(e) => handleClickVideo(item.videourl)}>{item.videourl}</td>
                                    <td>{item.videousername}</td>
                                    <td>{item.videoviews}</td>
                                    <td>{item.videotrangthai}</td>
                                    {
                                       item.videotrangthai != 3 ? (
                                            <td>
                                            <button onClick={(e) => handleClickBan(item.videourl,3,index)}>Ban</button>
                                            </td>
                                       ):(
                                            <td>
                                            <button onClick={(e) => handleClickBan(item.videourl,0,index)}>Bỏ ban</button>
                                            </td>
                                       ) 
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ):(
                        <div></div>
                    )}
                    {isLoading ? (
                    <div class="clearfix">
                        <div class="hint-text">Showing <b>5</b> out of <b>{listVideoAll.length}</b> entries</div>
                        <ul class="pagination">
                            <li className={page==1 ? 'page-item disabled' : 'page-item'}><a href={"/admin/videomanagement?page="+(page-1)}>Previous</a></li>
                            {listPage.map((item) => (
                                <li key={item} className={item == page ? 'active' : ''}>
                                    <a href={"/admin/videomanagement?"+searchKey+"&page="+item} class="page-link">{item}</a>
                                </li>
                            ))}
                            <li className={page==listPage.length ? 'page-item disabled' : 'page-item'}><a href={"/admin/videomanagement?page="+(page+1)}>Next</a></li>
                        </ul>
                    </div>
                    ):(
                        <div></div>
                    )}
                </div>
            </div>        
        </div>
    </div>
    );
}

export default VideoManagement;