import React, { useContext, useEffect, useState } from 'react';
import { ShopContaxt } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa'; 
import CrossIcon from '../assets/images/cross_icon.png' ;

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContaxt);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (location.pathname.includes('shop')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg0 p-t-100 container dis-flex panel-search w-full p-t-10 p-b-15 border-top border-bottom bg-light text-center position-relative">
      {/* Search Bar Container */}
      <div className="bor8 dis-flex p-l-15 d-flex align-items-center justify-content-center border border-secondary px-3 py-2 my-3 mx-auto rounded-pill w-full ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control border-0 flex-grow-1 bg-transparent "
          type="text"
          placeholder="Search"
        />
        <FaSearch className="ms-2" style={{ cursor: 'pointer' }} /> {/* Search Icon */}
        
        {/* Close icon positioned at the end */}
        {search && (
          <img src={CrossIcon}
            onClick={() => setShowSearch(false)}  // Close the search bar when clicked
            className="position-absolute end-0 me-2 cursor-pointer"  // Positioning the close icon
            style={{ width: '15px', cursor: 'pointer' }}  // Adjust icon size
          />
        )}
      </div>
    </div>
  ) : null;
};
export default SearchBar;
