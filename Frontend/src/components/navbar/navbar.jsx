import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../buttons/btn1';
import { Context } from '../../App';
import { fetchProfile } from '../../fetch/navProfileData';
import SearchInput from '../inputs/search';
import Api from '../../AxiosInstance';
import AddIcon from '@mui/icons-material/Add';
const Navbar = () => {
    const [profile, setProfile] = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref for detecting outside clicks

    useEffect(() => {
        const checkUserProfile = async () => {
            try {
                const profileData = await fetchProfile();
                if (profileData) {
                    setProfile(profileData);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUserProfile();
    }, [setProfile]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>; // Replace with your loader component
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const refresh_token = localStorage.getItem("refresh_token");
            await Api.post("http://127.0.0.1:8000/logout/", { "refresh_token": refresh_token });
        } catch (error) {
            console.error('Logout failed:', error);
            alert("Failed to logout. Please try again.");
        } finally {
            localStorage.clear();
            document.location.href = '/login';
        }
    };

    return (
        <nav className='m-0 w-full p-2 flex gap-5 justify-around items-center text-gray-50 bg-gradient-to-r from-pink-700 to-gray-900'>
            <div>
                <Link to="/"><h1>Real</h1></Link>
            </div>
            <div className='w-3/5 hidden md:block'>
            <SearchInput className="" />
            </div>
            <ul className='flex justify-between gap-5 items-center'>
                <li>Home</li>
                <li>Discover</li>
                <li><Link to={"/create_post"}><AddIcon className='border-solid border-slate-200 border-2 rounded-lg'/></Link></li>
                <li className='relative flex items-center'>
                    {profile ? (
                        <>
                            <div onClick={toggleDropdown} className="flex items-center cursor-pointer relative">
                                <img src={profile.icon} alt="Profile Icon" className="w-8 h-8 rounded-full mr-2" />
                                <p>{profile.name}</p>
                            </div>
                            {isOpen && (
                                <div ref={dropdownRef} className="absolute top-10 right-0 w-48 bg-white rounded-lg shadow-lg mt-2 z-10">
                                    <ul className="py-2">
                                        <Link to={`/profile/${profile.id}`}>
                                            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Profile
                                            </li>
                                        </Link>
                                        <Link to="/settings">
                                            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </li>
                                        </Link>
                                        <Link to="/help">
                                            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Help
                                            </li>
                                        </Link>
                                        <hr className="my-1 border-gray-200" />
                                        <li className="px-4 py-2 text-gray-700 hover:bg-red-100">
                                            <button onClick={handleLogout} className="w-full text-left">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to='/login'>
                            <Button value={"Login/Register"} />
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
