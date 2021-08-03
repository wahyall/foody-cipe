import React from 'react';
import './Cookbook.scss';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

// Component
import CookbookItem from './CookbookItem/CookbookItem';
import OpenCookbook from './OpenCookbook/OpenCookbook';
import EditCookbook from './EditCookbook/EditCookbook';

const Cookbook = () => {
  const cookbook = useSelector(state => state.cookbook);
  const renderedCookbook = cookbook.filter(list => list.data.length > 0);

  return (
    <div id="cookbook">
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
    </div>
  )
}

export default Cookbook;