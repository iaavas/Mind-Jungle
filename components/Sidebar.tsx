import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import {
  MdHome,
  MdSearch,
  MdNotificationsNone,
  MdMailOutline,
  MdBookmarkBorder,
  MdListAlt,
  MdPermIdentity,
  MdMoreHoriz,
} from 'react-icons/md';
import './../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <FaTwitter className='twitter-icon' />
      <div className='sidebarOption active'>
        <MdHome className='material-icons' />
        <h2>Home</h2>
      </div>

      <div className='sidebarOption'>
        <MdSearch className='material-icons' />
        <h2>Explore</h2>
      </div>

      <div className='sidebarOption'>
        <MdNotificationsNone className='material-icons' />
        <h2>Notifications</h2>
      </div>

      <div className='sidebarOption'>
        <MdMailOutline className='material-icons' />
        <h2>Messages</h2>
      </div>

      <div className='sidebarOption'>
        <MdBookmarkBorder className='material-icons' />
        <h2>Bookmarks</h2>
      </div>

      <div className='sidebarOption'>
        <MdListAlt className='material-icons' />
        <h2>Lists</h2>
      </div>

      <div className='sidebarOption'>
        <MdPermIdentity className='material-icons' />
        <h2>Profile</h2>
      </div>

      <div className='sidebarOption'>
        <MdMoreHoriz className='material-icons' />
        <h2>More</h2>
      </div>
      <button className='sidebar__tweet'>Tweet</button>
    </div>
  );
};

export default Sidebar;
