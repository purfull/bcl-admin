import  {  Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Countries, Earning, ProductsOverview, Recentorders } from './dashboardData';
import Pageheader from '../../components/common/pageheader/pageheader';
import ecommerce35 from "../../assets/images/ecommerce/png/35.png";
import face2 from "../../assets/images/faces/2.jpg";
import face4 from "../../assets/images/faces/4.jpg";
import face10 from "../../assets/images/faces/10.jpg";
import face12 from "../../assets/images/faces/12.jpg";
import face5 from "../../assets/images/faces/5.jpg";
import face6 from "../../assets/images/faces/6.jpg";
import face7 from "../../assets/images/faces/7.jpg";
import face3 from "../../assets/images/faces/3.jpg";
import face9 from "../../assets/images/faces/9.jpg";
import face13 from "../../assets/images/faces/13.jpg";
import face15 from "../../assets/images/faces/15.jpg";
import face16 from "../../assets/images/faces/16.jpg";
import face14 from "../../assets/images/faces/14.jpg";
import ecommerce1 from "../../assets/images/ecommerce/png/1.png";
import ecommerce2 from "../../assets/images/ecommerce/png/2.png";
import ecommerce3 from "../../assets/images/ecommerce/png/3.png";
import ecommerce4 from "../../assets/images/ecommerce/png/4.png";
import ecommerce5 from "../../assets/images/ecommerce/png/5.png";
import ecommerce6 from "../../assets/images/ecommerce/png/6.png";
import ecommerce7 from "../../assets/images/ecommerce/png/7.png";
import ecommerce8 from "../../assets/images/ecommerce/png/8.png";
import ecommerce9 from "../../assets/images/ecommerce/png/9.png";
import ecommerce10 from "../../assets/images/ecommerce/png/10.png";
import ecommerce11 from "../../assets/images/ecommerce/png/11.png";
import ecommerce12 from "../../assets/images/ecommerce/png/12.png";
import ecommerce13 from "../../assets/images/ecommerce/png/13.png";
import ecommerce14 from "../../assets/images/ecommerce/png/14.png";
import ecommerce15 from "../../assets/images/ecommerce/png/15.png";
import ecommerce36 from "../../assets/images/ecommerce/png/36.png";
import ecommerce38 from "../../assets/images/ecommerce/png/38.png";
import ecommerce39 from "../../assets/images/ecommerce/png/39.png";
import ecommerce40 from "../../assets/images/ecommerce/png/40.png";




const Dashboard = () => {
    //    for User search function
    const [Data, setData] = useState(ProductsOverview);

    const userdata = [];

    const myfunction = (idx) => {
        let Data;
        for (Data of ProductsOverview) {
            if (Data.name[0] == " ") {
                Data.name = Data.name.trim();
            }
            if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setData(userdata);
    };
    return (
        <Fragment>
            <Pageheader currentpage="Dashboard" activepage="Dashboard" mainpage="Dasboard" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-6 md:col-span-6 xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12">
                                        <div className="xxxl:col-span-3 col-span-4 flex items-center ecommerce-icon px-0">
                                            <span className="rounded-md p-4 bg-primary/10">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-white primary" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" /></g></svg>
                                            </span>
                                        </div>
                                        <div className="xxxl:col-span-9 col-span-8 ps-0">
                                            <div className="mb-2">Total Products</div>
                                            <div className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
                                                <span className="text-defaulttextcolor font-semibold text-[1.25rem] leading-none vertical-bottom">
                                                    14,732
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[0.75rem] mb-0">Increase by <span className="badge bg-success/10 text-success mx-1">+4.2%</span> this month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 md:col-span-6 xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12">
                                        <div className="xxxl:col-span-3 col-span-4 flex items-center ecommerce-icon secondary  px-0">
                                            <span className="rounded-md p-4 bg-secondary/10">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-white secondary" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none" /><g><path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" /><rect height="2" width="6" x="9" y="7" /><rect height="2" width="2" x="16" y="7" /><rect height="2" width="6" x="9" y="10" /><rect height="2" width="2" x="16" y="10" /></g></svg>
                                            </span>
                                        </div>
                                        <div className="xxxl:col-span-9 col-span-8 ps-0">
                                            <div className="mb-2">Total Customers</div>
                                            <div className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
                                                <span className="font-semibold text-[1.25rem] leading-none text-defaulttextcolor vertical-bottom">
                                                    38,346.
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[0.75rem] mb-0">Increase by <span className="badge bg-success/10 text-success mx-1">+12.0%</span> this month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 md:col-span-6 xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12">
                                        <div className="xxxl:col-span-3 col-span-4 flex items-center ecommerce-icon success px-0">
                                            <span className="rounded-md p-4 bg-success/10">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-white success" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                            </span>
                                        </div>
                                        <div className="xxxl:col-span-9 col-span-8 ps-0">
                                            <div className="mb-2">Total Visitors</div>
                                            <div className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
                                                <span className="text-defaulttextcolor font-semibold text-[1.25rem]  leading-none vertical-bottom">
                                                    1,29,368
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[0.75rem] mb-0">Decreased by <span className="badge bg-danger/10 text-danger mx-1">-7.6%</span> this month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 md:col-span-6 xl:col-span-6 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12">
                                        <div className="xxxl:col-span-3 col-span-4 flex items-center ecommerce-icon warning px-0">
                                            <span className="rounded-md p-4 bg-warning/10">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-white warning" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                            </span>
                                        </div>
                                        <div className="xxxl:col-span-9 col-span-8 ps-0">
                                            <div className="mb-2">Total Orders</div>
                                            <div className="text-[#8c9097] dark:text-white/50 mb-1 text-[0.75rem]">
                                                <span className="font-semibold text-[1.25rem] leading-none vertical-bottom text-defaulttextcolor">
                                                    35,367
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[0.75rem] mb-0">Increased by <span className="badge bg-success/10 text-success mx-1">+2.5%</span> this month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">Customers</div>
                                    <div className="hs-dropdown ti-dropdown">
                                        <Link to="#" className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                                            aria-expanded="false">
                                            View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                        </Link>
                                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                to="#">Today</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                to="#">This Week</Link></li>
                                            <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                to="#">Last Week</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="sm:grid sm:grid-cols-12 lg:ps-[3rem] mb-6 pb-6 sm:gap-0 gap-y-3">
                                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4">
                                            <div className="mb-1 earning first-half ms-4">First Half</div>
                                            <div className="mb-0">
                                                <span className="mt-1 text-[1rem] font-semibold me-2">1.94k</span>
                                                <span className="text-success">
                                                    <span className="badge bg-success/10 text-success !px-1 !py-2 text-[0.625rem]">+ 0.9%</span></span>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4">
                                            <div className="mb-1 earning top-gross ms-4">Top Gross</div>
                                            <div className="mb-0">
                                                <span className="mt-1 text-[1rem] font-semibold me-2">8.32k</span>
                                                <span className="text-success">
                                                    <span className="badge bg-success/10 text-success !px-1 !py-2 text-[0.625rem]">+ 0.39%</span></span>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4">
                                            <div className="mb-1 earning second-half ms-3">Second Half</div>
                                            <div className="mb-0">
                                                <span className="mt-1 text-[1rem] font-semibold me-2">13k</span>
                                                <span className="text-danger">
                                                    <span className="badge bg-danger/10 text-danger !px-1 !py-2 text-[0.625rem]">- 0.15%</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="earnings">
                                        <Earning />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;
