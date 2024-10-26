import { useEffect, useState } from 'react';
import loginbg from "../assets/images/login/login-bg.jpg";
import logo from "../assets/images/login/login-logo.png";
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
          // console.log("data to send", dataToSend);
      
        
        try {
          const response = await fetch(`http://luxcycs.com:3000/api/admin/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });    
          const data = await response.json();
    
          if (data.success) {
            console.log("loggedddddddd");
            
            setIsLoggedIn(true)
          }
          else {
            toast.error(data.message, {
                autoClose: 3000,
              });
              
           }

          console.log('Success:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-evenly" 
            style={{
                // backgroundImage: `url(${loginbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: 'sans-serif'
            }}>

            <div className="w-[90%] sm:w-[60%] lg:w-[25%] h-[80vh] sm:h-[80vh] lg:h-[55vh] bg-white lg:absolute right-[12%] top-[15%] p-4 flex flex-col justify-evenly items-center rounded-xl">

                {/* <img src={logo} alt="logo" /> */}
                <span className="text-lg font-bold">App Bowl</span>
                <span className="text-sm">Bridging Technology and Expertise</span>

                <div className="w-[90%] h-[85%] flex flex-col justify-center ">
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
                        <button className="login-btn w-full text-sm mt-[20px]" type="submit">Login</button>
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
