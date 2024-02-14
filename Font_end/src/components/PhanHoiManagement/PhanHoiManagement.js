import "./PhanHoiManagement.css"
import { useEffect, useState } from "react";
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import axios from "axios";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

function PhanHoiManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState();
    const [listPage, setListPage] = useState([]);
    const [keyWord, setKeyWord] = useState();
    const [searchKey, setSearchKey] = useState();
    const [listPhanHoiAll, setListPhanHoiAll] = useState([]);
    const [listPhanHoi,setListPhanHoi] = useState([]);
    const [trangThaiBaoCao, setTrangThaiBaoCao] = useState(-1);
    const navigate = useNavigate();

    const handleClickSearch = (e) => {
        var currentPath = window.location.pathname;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var kwValue = urlParams.get('trangThai');

        if(kwValue!=null){
            navigate(currentPath+"?kwphmng="+keyWord+"&trangThai="+kwValue);
            window.location.reload();
        }
        else{
            navigate(currentPath+"?kwphmng="+keyWord);
            window.location.reload();
        }
        
    };

    const locTrangThai = (trangThai) => {
        const selectElement = document.getElementById('sel1');
        const selectedIndex = selectElement.selectedIndex-1;
        var currentPath = window.location.pathname;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var kwValue = urlParams.get('kwphmng');
        var trangThaiBC = urlParams.get('trangThai');
        if(kwValue!=null){
            currentPath = currentPath+"?kwphmng="+keyWord;
        }

        if(selectedIndex != -1 && kwValue!=null){
            navigate(currentPath+"&trangThai="+selectedIndex);
            window.location.reload();
        }
        else if(selectedIndex != -1 && kwValue==null){
            navigate(currentPath+"?trangThai="+selectedIndex);
            window.location.reload();
        }
        else{
            navigate(currentPath);
            window.location.reload();
        }
    }

    const handleClickXoa = (vitri) => {
        var mangcu = [...listPhanHoi];
        var giatricu = mangcu[vitri];
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/baocao/delete-bao-cao?idbc='+giatricu.id,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            mangcu.slice(vitri,1);
            setListPhanHoi(mangcu);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handleClickDuyet = (vitri, trangthai) => {
        var mangcu = [...listPhanHoi];
        var giatricu = mangcu[vitri];
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/baocao/update-trang-thai?idbc='+giatricu.id+'&trangthaibc='+trangthai,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            var giatrimoi = {...giatricu, trangThaiBC:trangthai};

            mangcu[vitri] = giatrimoi;
            setListPhanHoi(mangcu);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const getPhanHoi = (tukhoa, trangThai) => {
        var laydulieu = 'http://localhost:8081/baocao/get-bao-cao/all';
        if(tukhoa !=""){
            laydulieu = 'http://localhost:8081/baocao/get-bc-by-videoname/'+tukhoa;
        }
        if(trangThai!=-1){
            laydulieu = 'http://localhost:8081/baocao/search-bao-cao-trang-thai?trangThai='+trangThai+'&kw='+tukhoa;
        }
        // console.log(laydulieu);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:laydulieu,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            const toida=5;
            setIsLoading(true);
            const dsPhanHoiAll = response.data;
            setListPhanHoiAll(dsPhanHoiAll);
            var slphanhoi = dsPhanHoiAll.length;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var kwvalue = urlParams.get('page');
            if(kwvalue!=null){
                setPage(kwvalue);
            }
            else{
                setPage(1);
                kwvalue=1;
            }
            var start = dsPhanHoiAll.length-kwvalue*toida;
            var end = dsPhanHoiAll.length-kwvalue*toida+toida;
            if(start < 0){
                start =0;
            }
            const dsPhanHoi = dsPhanHoiAll.slice(start,end);
            const daonguoc = [...dsPhanHoi].reverse();
            setListPhanHoi(daonguoc);
            var slpage=0;
            if(slphanhoi%toida!=0){
                slpage=slphanhoi/toida+1;
            }
            else{
                slpage=slphanhoi/toida;
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
        var kwValue = urlParams.get('kwphmng');
        var trangThaiBC = urlParams.get('trangThai');
        if(trangThaiBC == null){
            setTrangThaiBaoCao("None");
        }
        if(trangThaiBC == 1){
            setTrangThaiBaoCao("Chưa duyệt");
        }
        if(trangThaiBC == 0){
            setTrangThaiBaoCao("Đã duyệt");
        }

        if(kwValue !=null && trangThaiBC==null){
            setSearchKey("?kwphmnug="+kwValue);
            getPhanHoi(kwValue,-1);
            setKeyWord(kwValue);
        }
        else if(kwValue !=null && trangThaiBC!=null){
            setSearchKey("?kwphmnug="+kwValue);
            getPhanHoi(kwValue,trangThaiBC);
            setKeyWord(kwValue);
        }
        else if(kwValue == null && trangThaiBC!=null){
            getPhanHoi("",trangThaiBC);
        }
        else{
            getPhanHoi("",-1);
        }

        const handlePopState = () => {
        window.location.reload();
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
        window.removeEventListener('popstate', handlePopState);
        };

    },[])


    return(
    <div className="bao-cao-manage">
        <Header/>
        <div class="main-display">
            <Sidebar/>
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Quản lý <b>báo cáo</b></h2>
                            </div>
                            <div className="container mt-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search..." value={keyWord} onChange={(e) => {setKeyWord(e.target.value)}} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={handleClickSearch}>
                                    <i className="bi bi-search"></i> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Trạng thái:</label>
                        <select class="form-select" id="sel1" name="sellist1" onChange={(e) => locTrangThai(e.target.value)} value={trangThaiBaoCao}>
                        <option>None</option>
                        <option>Đã duyệt</option>
                        <option>Chưa duyệt</option>
                        </select>
                    </div>
                    {isLoading ? (
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>Username</th>
                                <th>Link video</th>
                                <th>Tên video</th>
                                <th>Ngày</th>
                                <th>Phản hồi</th>
                                <th>Trạng thái</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>			
                            {
                                listPhanHoi.map((item,index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{item.user_id.username}</td>
                                        <td><a href={"/record/"+item.video_id.url}>{item.video_id.url}</a></td>
                                        <td>{item.video_id.name}</td>
                                        <td>{item.ngayBaoCao}</td>
                                        <td>{item.noiDung}</td>
                                        <td>{item.trangThaiBC}</td>
                                        <td>
                                            {
                                                item.trangThaiBC == 1 ? (
                                                    <button onClick={(e) => handleClickDuyet(index,0)}>Duyệt</button>
                                                ):(
                                                    <button onClick={(e) => handleClickDuyet(index,1)}>Bỏ duyệt</button>
                                                )
                                            }
                                            <button onClick={(e) => handleClickXoa(index)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    ):(
                        <div></div>
                    )}
                    {isLoading ? (
                    <div class="clearfix">
                        <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                        <ul class="pagination">
                            <li className={page==1 ? 'page-item disabled' : 'page-item'}><a href={"/admin/phanhoimanagement?page="+parseInt((page-1), 10)}>Previous</a></li>
                            {listPage.map((item) => (
                                <li key={item} className={item == page ? 'active' : ''}>
                                    <a href={"/admin/phanhoimanagement?"+searchKey+"&page="+item} class="page-link">{item}</a>
                                </li>
                            ))}
                            <li className={page==listPage.length ? 'page-item disabled' : 'page-item'}><a href={"/admin/phanhoimanagement?page="+parseInt(page+1)}>Next</a></li>
                        </ul>
                    </div>
                    ):(
                        <div></div>
                    )}
                </div>
            </div>        
        </div>
    </div>
    )
}

export default PhanHoiManagement;