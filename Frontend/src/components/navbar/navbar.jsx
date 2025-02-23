import React, { useContext, useEffect, useState } from 'react';
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

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <nav className="w-full p-4 bg-gradient-to-r from-secondary to-gray-900 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* Left Section: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-white text-2xl font-extrabold hover:text-primary transition-colors">
            <h1>Real</h1>
          </Link>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="hidden md:block mx-4 flex-grow max-w-2xl">
          <SearchInput className="w-full" />
        </div>

        {/* Right Section: Navigation Links and Profile */}
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-white">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors"
                data-tip="Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="hover:text-primary transition-colors"
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboards/alliance"
                className="hover:text-primary transition-colors"
              >
                Leaderboards
              </Link>
            </li>
            <li>
              <Link
                to="/create_post"
                className="p-2 hover:bg-primary rounded-lg transition-colors"
              >
                <AddIcon className="text-white" />
              </Link>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <div className="flex items-center">
            {profile ? (
              <details className="dropdown dropdown-end">
                <summary className="flex items-center cursor-pointer list-none hover:text-pink-300 transition-colors">
                  <img
                    src={profile.icon}
                    alt="Profile Icon"
                    className="w-8 h-8 rounded-full mr-2 border-2 border-white"
                  />
                  <p className="font-medium text-white">{profile.name}</p>
                </summary>
                <ul className="dropdown-content menu bg-base-100 rounded-box shadow-lg mt-2 w-48 p-2 z-[1]">
                  <li>
                    <Link
                      to={`/profile/${profile.id}`}
                      className="hover:bg-base-200 rounded-lg p-2"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="hover:bg-base-200 rounded-lg p-2"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/help"
                      className="hover:bg-base-200 rounded-lg p-2"
                    >
                      Help
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-primary hover:bg-base-200 rounded-lg p-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <Link to="/login">
                <Button value="Login/Register" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;