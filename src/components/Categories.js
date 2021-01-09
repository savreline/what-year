import React from 'react';
import PropTypes from 'prop-types';
import { categories } from './App';

const Categories = ({handleSubmit}) => {
  return (
    <div>
      {categories.map((category, id) =>
        <button key={id} value={id} onClick={handleSubmit} 
        className="btn btn-info btn-lg m-1">
          {category}
        </button>  
      )}
    </div>         
  );
};

Categories.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Categories;
