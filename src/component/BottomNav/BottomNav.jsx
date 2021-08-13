import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BottomNav.scss';

// Icon
import homeActive from '../../icon/home-active.svg';
import homeUnactive from '../../icon/home-unactive.svg';
import discoverActive from '../../icon/discover-active.svg';
import discoverUnactive from '../../icon/discover-unactive.svg';
import cookbookActive from '../../icon/cookbook-active.svg';
import cookbookUnactive from '../../icon/cookbook-unactive.svg';

const BottomNav = (props) => {
  const pathname = props.location.pathname;
  const locationPath = pathname.split('/');
  const activePage = locationPath[1].length ? locationPath[1] : 'home';

  // Mengambil active category dari Discover, 
  // agar saat membuka Discover kembali dapat langsung menuju active category yang sebelumnya
  const discover = useSelector(state => state.discover);
  
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-link">
        <BottomNavItem
          name="home"
          activePage={activePage}
          iconActive={homeActive}
          iconUnactive={homeUnactive} />
      </Link>
      <Link to={"/discover" + discover.activeCategory.path} className="nav-link">
        <BottomNavItem
          name="discover"
          activePage={activePage}
          iconActive={discoverActive}
          iconUnactive={discoverUnactive} />
      </Link>
      <Link to="/cookbook" className="nav-link">
        <BottomNavItem
          name="cookbook"
          activePage={activePage}
          iconActive={cookbookActive}
          iconUnactive={cookbookUnactive} />
      </Link>
    </nav>
  )
}

const BottomNavItem = (props) => {
  let renderedIcon, className;
  if (props.name === props.activePage) {
    renderedIcon = props.iconActive;
    className = "nav-item active"
  } else {
    renderedIcon = props.iconUnactive;
    className = "nav-item"
  }

  return (
    <div className={className}>
      <div className="icon">
        <img src={renderedIcon} alt={props.name} />
      </div>     
      <span className="name">
        {props.name.replace(props.name[0], props.name[0].toUpperCase())}
      </span> 
    </div>
  )
}

export default BottomNav;