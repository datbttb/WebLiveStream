import { useEffect, useState } from "react"
import "./Search.css"
// import "../video/Filter.css";
import Header from "../header/Header";
import Sidebar from "../slidebar/Sidebar";
import SingleVideo from "../video/SingleVideo";
import axios from "axios";
import SearchUser from "./SearchUser";
import SearchAll from "./SearchAll";
import SearchLive from "./SearchLive";
import SearchRecord from "./SearchRecord";
import { useLocation } from "react-router-dom";

function Search () {

    const [isSearchAll, setIsSearchAll] = useState(true);
    const [isSearchUser, setIsSearchUser] = useState(false);
    const [isSearchLIve, setIsSearchLive] = useState(false);
    const [isSearchRecord, setIsSearchRecord] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [keyWord,setKeyWord] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const sk= useLocation();

    const loaddingAll = () => {
        const gioihan = 6;
    }

    const handleFilterClick = (filter) => {
        if(filter=='User'){
            setIsSearchUser(true)
            setIsSearchAll(false);
            setIsSearchLive(false);
            setIsSearchRecord(false);
        }
        else if(filter=='All'){
            setIsSearchUser(false)
            setIsSearchAll(true);
            setIsSearchLive(false);
            setIsSearchRecord(false);
        }
        else if(filter=='Live'){
            setIsSearchUser(false)
            setIsSearchAll(false);
            setIsSearchLive(true);
            setIsSearchRecord(false);
        }
        else{
            setIsSearchUser(false)
            setIsSearchAll(false);
            setIsSearchLive(false);
            setIsSearchRecord(true);
        }
        setActiveFilter(filter);
    };

    useEffect(() => {
        // console.log(sk.search);
        setKeyWord(sk.search);
        setIsLoading(true);
    },[]);


    return (
        <div className="search-page">
            <div className="App">
                <Header/>
                <div className="main-display">
                    <Sidebar />
                    <div className="filter d-flex align-items-center">
                        <div className="single-filter">
                            <span
                            className={`filter-items pointer ${activeFilter === 'All' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('All')}
                            >
                            All
                            </span>
                        </div>
                        <div className="single-filter">
                            <span
                            className={`filter-items pointer ${activeFilter === 'Live' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('Live')}
                            >
                            Live
                            </span>
                        </div>
                        <div className="single-filter">
                            <span
                            className={`filter-items pointer ${activeFilter === 'Record' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('Record')}
                            >
                            Record
                            </span>
                        </div>
                        <div className="single-filter">
                            <span
                            className={`filter-items pointer ${activeFilter === 'User' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('User')}
                            >
                            User
                            </span>
                        </div>
                    </div>
                    {isLoading ? (
                        <div>
                    {isSearchAll ? (
                        <SearchAll searchKey={keyWord} />
                    ):(
                        <div></div>
                    )}

                    {isSearchLIve ? (
                        <SearchLive searchKey={keyWord}/>
                    ):(
                        <div></div>
                    )}

                    {isSearchRecord ? (
                        <SearchRecord searchKey={keyWord}/>
                    ):(
                        <div></div>
                    )}

                    {isSearchUser ? (
                        <SearchUser searchKey={keyWord} />
                    ):(
                        <div></div>
                    )}
                    </div>
                    ):(<div></div>)}
                </div>
            </div>
        </div>
    )
}

export default Search;