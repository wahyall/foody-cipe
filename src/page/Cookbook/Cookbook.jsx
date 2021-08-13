import React from 'react';
import './Cookbook.scss';
import { useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// Component
import CookbookItem from './CookbookItem/CookbookItem';
import OpenCookbook from './OpenCookbook/OpenCookbook';
import EditCookbook from './EditCookbook/EditCookbook';

// Icon
import empty from '../../icon/empty-cookbook.svg';

const Cookbook = () => {
  const cookbook = useSelector(state => state.cookbook);
  const renderedCookbook = cookbook.filter(list => list.data.length > 0);

  if(!renderedCookbook.length) {
    return (
      <main id="cookbook">
        <section className="empty">
          <img src={empty} alt="empty cookbook" />
          <h6 className="title">Oops! It's Empty</h6>
          <span className="message">
            Create a new cookbook by going to the recipe you like and create it
          </span>
          <Link to="/discover" className="btn">Let's Find Out</Link>
        </section>
      </main>
    )
  }

  return (
    <main id="cookbook">
      {renderedCookbook.map(cookbook => (
        <CookbookItem key={cookbook.id}
          id={cookbook.id}
          name={cookbook.name}
          desc={cookbook.desc}
          data={cookbook.data} />
      ))}
      
      <Route path="/cookbook/:id" exact render={(props) => (
        <OpenCookbook {...props} />
      )} />
      <Route path="/cookbook/:id/edit" exact render={(props) => (
        <EditCookbook {...props} />
      )} />
    </main>
  )
}

export default Cookbook;