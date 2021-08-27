import React from 'react';

const Category = ({id, category}) => {
    
    return (
        <div className="mb-4">
            <div className="card bg-info text-white shadow">
				<div className="card-body">
                    {category.name}
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "100px"}} src={`https://grupo-5-tu-tienda-web.herokuapp.com/images/Producto-${id}/${category.image}`} alt="Producto" />
                
                </div>
            </div>
		</div>
    );
}

export default Category;
