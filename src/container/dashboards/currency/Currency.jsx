import { Fragment, useState, useEffect } from "react";
import Pageheader from "../../../components/common/pageheader/pageheader";

const Currency = () => {
    return ( 
        
        <Fragment>
            <Pageheader currentpage="Currency" activepage="Master" mainpage="Currency" />
            <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
                <div className="box">
                {/* <div className="">
                    <h5 className="box-title">Active</h5>
                </div> */}
                
                </div>
            </div>
            </div>
        </Fragment>
     );
}
 
export default Currency;