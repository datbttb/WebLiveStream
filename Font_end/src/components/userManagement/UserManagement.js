import "./UserManagement.css"
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserManagement(){

    const [listUser, setListUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [listUserAll, setListUserAll] = useState([]);
    const [page, setPage] = useState(1);
    const [listPage,setListPage] = useState([]);
    const navigate = useNavigate();
    const [keyWord, setKeyWord] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [trangThaiUser, setTrangThaiUser] = useState(-1);

    const locTrangThai = () => {
        const selectElement = document.getElementById('sel1');
        const selectedIndex = selectElement.selectedIndex;
        var trangThaiU = -1
        if(selectedIndex == 1){
            trangThaiU = 1;
        }
        if(selectedIndex == 2){
            trangThaiU =3;
        }
        var currentPath = window.location.pathname;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var kwValue = urlParams.get('kwmnug');
        if(kwValue!=null){
            currentPath = currentPath+"?kwmnug="+keyWord;
        }
        if(trangThaiU != -1 && kwValue!=null){
            navigate(currentPath+"&trangThai="+trangThaiU);
            window.location.reload();
        }
        else if(trangThaiU != -1 && kwValue==null){
            navigate(currentPath+"?trangThai="+trangThaiU);
            window.location.reload();
        }
        else{
            navigate(currentPath);
            window.location.reload();
        }
    }

    const handleClickEditUser = (username) =>{
        navigate('/admin/editprofile/'+username);
        window.location.reload();
    }

    const getAdmin = () => {
        const username = window.localStorage.getItem("username");
        var config = {
        method: "get",
        url: "http://localhost:8081/user/get-by-username/"+username,
        headers: {},
        };

        axios(config)
            .then(function (response) {
            if(response.data.role_id.id==2){
                setIsAdmin(true);
            }
            })
            .catch(function (error){
                console.log(error);
            });
    }

    const handleClickSearch = (e) => {
        navigate("/admin/usermanagement?kwmnug="+keyWord);
        window.location.reload();
    }

    const handleClickBan = (vitri, namerole) => {
        var mangcu = [...listUser];
        var giatricu = mangcu[vitri];
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/user/update-quyen?username='+giatricu.username+'&rolename='+namerole,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            var rolenew = {...giatricu.role_id, name:namerole};
            var giatrimoi = {...giatricu, role_id:rolenew};

            mangcu[vitri] = giatrimoi;
            setListUser(mangcu);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const getUser = (tuKhoa,trangThai) => {
        var laydulieu = 'http://localhost:8081/user/getall';
        if(tuKhoa!=""){
            laydulieu = 'http://localhost:8081/user/search-by-username?kw='+tuKhoa
        }
        if(trangThai!=-1){
            laydulieu = 'http://localhost:8081/user/find-by-username-role?kw='+tuKhoa+'&idRole='+trangThai;
        }
        console.log(laydulieu);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: laydulieu,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            const toida=10;
            setIsLoading(true);
            const dsUserAll = response.data;
            setListUserAll(dsUserAll);
            var sluser = dsUserAll.length;
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
            var start = dsUserAll.length-kwvalue*toida;
            var end = dsUserAll.length-kwvalue*toida+toida;
            if(start < 0){
                start =0;
            }
            const dsuser = dsUserAll.slice(start,end);
            const daonguoc = [...dsuser].reverse()
            setListUser(daonguoc);
            // var macdinh = 10;
            // if(macdinh>(end-start)){
            //     macdinh=end-start;
            // }
            // for(let i=0; i<macdinh; i++){
            //     const userItem = {
            //         username:dsUserAll[dsUserAll.length-1-i].username
            //     }
            //     setListUser((listold) => [...listold,userItem]);
            // }

            var slpage=0;
            if(sluser%toida!=0){
                slpage=sluser/toida+1;
            }
            else{
                slpage=sluser/toida;
            }
            setListPage(Array.from({ length: slpage }, (_, index) => index + 1));
            setIsLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });

    }

    useEffect(() => {
        getAdmin();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var kwValue = urlParams.get('kwmnug');
        var trangThaiU = urlParams.get('trangThai');
        if(trangThaiU == null){
            setTrangThaiUser("None");
        }
        if(trangThaiU == 1){
            setTrangThaiUser("Người dùng");
        }
        if(trangThaiU == 3){
            setTrangThaiUser("Người bị hạn chế");
        }

        if(kwValue !=null && trangThaiU==null){
            setSearchKey("?kwmnug="+kwValue);
            getUser(kwValue,-1);
            setKeyWord(kwValue);
        }
        else if(kwValue !=null && trangThaiU!=null){
            setSearchKey("?kwmnug="+kwValue);
            getUser(kwValue,trangThaiU);
            setKeyWord(kwValue);
        }
        else if(kwValue ==null && trangThaiU!=null){
            setSearchKey("?kwmnug="+kwValue);
            getUser("",trangThaiU);
            setKeyWord(kwValue);
        }
        else{
            getUser("",-1);
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
        {isAdmin ? (
        <div class="main-display">
            <Sidebar/>
            <div class="table-responsive">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Quản lý <b>Người dùng</b></h2>
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
                        <select class="form-select" id="sel1" name="sellist1" onChange={(e) => locTrangThai()} value={trangThaiUser}>
                        <option>None</option>
                        <option>Người dùng</option>
                        <option>Người bị hạn chế</option>
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
                                <th>Email</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Chức vụ</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>			
                            {listUser.map((item,index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.role_id.name}</td>
                                    {
                                        item.role_id.name !="ROLE_RESTRICT" ? (
                                            <td>
                                                <button onClick={(e) => handleClickEditUser(item.username)}>Edit</button>
                                                <button onClick={(e) => handleClickBan(index,"ROLE_RESTRICT")}>Ban</button>
                                            </td>
                                        ):(
                                            <td>
                                                <button>Edit</button>
                                                <button onClick={(e) => handleClickBan(index,"ROLE_USER")}>Bỏ Ban</button>
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
                        <div class="hint-text">Showing <b>5</b> out of <b>{listUserAll.length}</b> entries</div>
                        <ul class="pagination">
                            <li className={page==1 ? 'page-item disabled' : 'page-item'}><a href={"/admin/videomanagement?page="+(page-1)}>Previous</a></li>
                            {listPage.map((item) => (
                                <li key={item} className={item == page ? 'active' : ''}>
                                    <a href={"/admin/usermanagement?"+searchKey+"&page="+item} class="page-link">{item}</a>
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
        ):(
            <div></div>
        )}
    </div>
    );
}

export default UserManagement;