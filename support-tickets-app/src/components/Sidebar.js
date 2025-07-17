import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ screens }) => {
  return (
    <div>
      <h4>Tenant Screens</h4>
      <ul>
        {screens.map((s, i) => (
          <li key={i}>
            <NavLink to={`/${s.screenUrl}`}>{s.screenUrl}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
