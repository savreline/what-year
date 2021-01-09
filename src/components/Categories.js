import React from 'react';
import PropTypes from 'prop-types';
import { categories } from './App';

const Categories = ({handleSubmit}) => {
  return (
    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3
      justify-content-center px-2 py-0">
      {categories.map((category, id) =>
        <div key={id} value={id} className="col p-1">
          <button onClick={handleSubmit} 
          className="btn btn-block btn-lg btn-secondary">
            {category}
          </button>
        </div>  
      )}
    </div>         
  );
};

Categories.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Categories;
