/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
// import { useSelector } from "react-redux";
// import { useLocation, useHistory } from 'react-router';
// import { useDispatch } from 'react-redux';
import { Collapse, Button } from 'reactstrap';
import { getQueryParams } from '../../common/queryparams';
import { envglobals } from '../../common/envglobals';
import './header.scss';
// Reacstrap Collapse - Responsive Navbar
import translation from './translation.json';

interface HeaderProps {
    language: 'en-CA' | 'fr-CA';
    changeLanguage: any;
    mappingClick: any;
  }

const EnvGlobals = envglobals();

export default function Header(props: HeaderProps): JSX.Element {
    const { language, changeLanguage, mappingClick } = props;
    const w = window as any;
    const cgpv = w['cgpv'];
    const { api, react, ui, useTranslation, leaflet } = cgpv;
    const { useState, useEffect, useRef } = react;
    // const history = useHistory();
    // const location = useLocation();
    // const dispatch = useDispatch();
    const queryParams: { [key: string]: string } = getQueryParams(location.search);
    const [langFromUrl, setLF] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [showmappingDemo, setSMD] = useState(false);

    const gotoHome = () => {
        setCollapse(false);
        /*if (location.pathname === '/' && !location.search) {
            if (clanguage==='en') {
                history.go(0);
            } else {
                window.location.href=`/?lang=${clanguage}`;
            }    
        } else {
            history.push({
                pathname: '/',
                search: '',
            });
        }*/
    };

    // Reacstrap Collapse - Responsive Navbar
    const toggle = () => setCollapse(!collapse);
    // console.log(location.pathname);
    /* 
    const rvScript = document.getElementById("rvJS");
    if (rvScript) {
        rvScript.remove();
    }
    const rvSVG = document.getElementsByTagName("svg");
    if (rvSVG.length>0) {
        for (const item of rvSVG) {
            if (item.id && item.id.indexOf("SvgjsSvg")===0) {
                item.remove();
            }
        }
    }*/

    /* useEffect(() => {
        if (!langFromUrl) {
           let clang:string = clanguage; 
           if (queryParams.lang !== undefined && clang !== queryParams.lang) {
            mapInstance.i18nInstance.changeLanguage(`${queryParams.lang}-CA`);
               clang = queryParams.lang;
           }
           if (queryParams.org !== undefined || queryParams.type !== undefined || queryParams.theme !== undefined || queryParams.foundational !== undefined) {
                const oIndex = (queryParams.org!==undefined)?(organisations[clang] as string[]).findIndex((os: string) => os.toLowerCase() === queryParams.org.toLowerCase()) : -1;
                const tIndex = (queryParams.type!==undefined)?(types[clang] as string[]).findIndex((ts: string) => ts.toLowerCase() === queryParams.type.toLowerCase()) : -1;
                const thIndex = (queryParams.theme!==undefined)?(themes[clang] as string[]).findIndex((ths: string) => ths.toLowerCase() === queryParams.theme.toLowerCase()) : -1;
                const orgfilter = oIndex > -1 ? [oIndex] : [];
                const typefilter = tIndex > -1 ? [tIndex] : [];
                const themefilter = thIndex > -1 ? [thIndex] : [];
                dispatch(setFilters({ orgfilter, typefilter, themefilter, foundational: queryParams.foundational!==undefined && queryParams.foundational ==='y'}));
            } 
           setLF(true);
        }
        
        window.addEventListener('storage', showMapping);
        return () => {
            window.removeEventListener('storage', showMapping);
        }; 
        
    }, [dispatch, langFromUrl, queryParams.lang, queryParams.org, queryParams.theme, queryParams.type]); */

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-12 header-nav-col">
                        <nav className="navbar navbar-light navbar-expand-lg header-nav">
                            <a href={`${EnvGlobals.LOGO_SITE_LINK_URL[language]}`} target="_blank" aria-label={translation[language].logoLinktext}>
                                <img src="/assets/img/GeoDotCaBanner.jpg" alt={translation[language].logotext} />
                            </a>
                            <Button
                                onClick={toggle}
                                id="toggler"
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                aria-controls="navbar-menu"
                                aria-expanded={collapse}
                                aria-label="Toggle navigation"
                            >
                                <span className={collapse ? 'navbar-toggler-icon nav-bar-open' : 'navbar-toggler-icon nav-bar-closed'} />
                            </Button>

                            <Collapse isOpen={collapse} className="navbar-collapse navbar-wrap">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <button type="button" onClick={gotoHome}>
                                            {translation[language].search}
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button id="myMapBtn" type="button" onClick={mappingClick}>
                                            {translation[language].mymap}
                                        </button>
                                        <button id="mcntBtn" type="button" className="hidden" onClick={mappingClick}>
                                            {/* {loadState() !== undefined?loadState().mappingReducer.mapping.length:0} */}
                                        </button> 
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            lang={translation[language].language.htmllangcode}
                                            onClick={() =>changeLanguage(translation[language].language.key)}
                                        >
                                            {translation[language].language.name}
                                        </button>
                                    </li>
                                </ul>
                            </Collapse>
                            {/* <button className="demo" type="button" onClick={()=>{setSMD(true); setSML(true)}}>MapDemo</button> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
