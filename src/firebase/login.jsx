import { useEffect, useState } from 'react';
import loginbg from "../assets/images/login/login-bg.jpg";
import logo from "../assets/images/brand/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [orgData, setorgData] = useState([]);
    const [branchData, setBranchData] = useState([]);
    const [branchSelection, setBranchSelection] = useState(''); // New state for branch selection

    const navigate = useNavigate();
    
    const currentYear = new Date().getFullYear();

    // useEffect(() => {
    //     const abortController = new AbortController();

    //     fetch(`${import.meta.env.VITE_URL}/org_name`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         signal: abortController.signal,
    //         body: JSON.stringify({ org_selection: formData.org_selection })
    //     })
    //         .then(result => result.json())
    //         .then(data => {
    //             setorgData(data);
    //         })
    //         .catch(err => console.log(err));

    //     return () => {
    //         abortController.abort();
    //     };
    // }, [formData.org_selection]);

    useEffect(() => {
        if (isLoggedIn) {
            const path = `/Dashboard`;
            navigate(path);
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBranchChange = (e) => {
        setBranchSelection(e.target.value);
    };

    // useEffect(() => {
    //     if (formData.org_selection) {
    //         fetch(`${import.meta.env.VITE_URL}/branch`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ org_selection: formData.org_selection })
    //         })
    //             .then(res => res.json())
    //             .then(data => setBranchData(data))
    //             .catch(err => console.log(err));
    //     }
    // }, [formData.org_selection]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("dataaa ",formData);
        const dataToSend = {
          "email": formData.email,
          "password": formData.password
        }
        if(formData.email == "contact@thailash.com" && formData.password == "Q6M%hJC3g.r|=WLg"){
        setIsLoggedIn(true)
        }
        else {
            toast.error("invalid email or password");
        }
          // console.log("data to send", dataToSend);
      
        
        // try {
        //   const response = await fetch(`http://luxcycs.com:3000/api/admin/user/login`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(dataToSend),
        //   });    
        //   const data = await response.json();
    
        //   if (data.success) {
        //     console.log("loggedddddddd");
            
        //     setIsLoggedIn(true)
        //   }
        //   else {
        //     toast.error(data.message, {
        //         autoClose: 3000,
        //       });
              
        //    }

        //   console.log('Success:', data);
        // } catch (error) {
        //   console.error('Error:', error);
        // }
      };
    
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-evenly" 
            style={{
                backgroundColor: '#046E3D',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23047641' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23047e46' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%2305864a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23058e4f' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23059653' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%2306a65c' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%2306b665' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%2307c66d' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%2307d676' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%2308E67F' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
                  <ToastContainer />

            <div className="w-[90%] sm:w-[60%] lg:w-[25%] h-[80vh] sm:h-[80vh] lg:h-[55vh] bg-white p-4 flex flex-col justify-evenly items-center rounded-xl">

                {/* <img src={logo} alt="logo" /> */}
                <span className="text-lg font-bold">
                    <img src={logo} alt="" />
                </span>
                <span className="text-sm">Welcome back admin!</span>

                <div className="w-[90%] h-[65%] flex flex-col justify-center ">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="login-input w-full rounded-lg"
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            className="login-input w-full rounded-lg"
                            type="password"
                            name="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {/* <select
                            className="login-input text-sm w-full rounded-lg"
                            name="org_selection"
                            value={formData.org_selection}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Organization</option>
                            {Array.isArray(orgData) && orgData.length > 0 ? (
                                orgData.map((org, index) => (
                                    <option key={index} value={org.ORG_NAME}>
                                        {org.ORG_NAME}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No Organizations Available</option>
                            )}
                        </select>
                        <select
                            className="login-input text-sm w-full rounded-lg"
                            name="branch_selection"
                            value={branchSelection} // Use branchSelection state here
                            onChange={handleBranchChange}
                        >
                            <option value="" disabled>Select Branch</option>
                            {Array.isArray(branchData) && branchData.length > 0 ? (
                                branchData.map((el, index) => (
                                    <option key={index} value={el}>
                                        {el}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No branch Available</option>
                            )}
                        </select> */}
                        <button className=" w-full text-[14px] mt-[20px] bg-gradient-to-tr  from-[#046E3D] to-[#08E67F] text-white py-2 font-semibold  rounded-md hover:shadow-lg transition-all" type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className="lg:absolute bottom-[5%] text-center">
                {/* <span className="text-white text-lg font-medium">
                    Copyright © {currentYear} AppXperts Solutions Pte ltd - Design & Developed by appxperts.sg
                </span> */}
            </div>
        </div>
    );
};

export default Login;
