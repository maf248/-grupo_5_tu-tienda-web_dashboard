import React from 'react';
import Category from './Category';

const Product = ({border, text, image, title, id, categories}) => {

    let classBorder = `card border-left-${border ?? ""} shadow h-100 py-2`;
    let classText = `text-xs font-weight-bold text-${text ?? ""} text-uppercase mb-1`;

    return (
       
			<div className={classBorder}>
				<div className="card-body">
					<div className="row no-gutters align-items-center">
                        <div className="col-auto">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "5rem"}} src={`http://localhost:3000/images/Producto-${id}/${image}`} alt="Producto" />
						</div>
						<div className="col mr-2">
							<div className={classText}>{title}</div>
							<div className="h5 mb-0 font-weight-bold text-gray-800">{id}</div>
						</div>
						
                        <div className="row no-gutters align-items-center">

					{categories.map(category => {
                        return(<Category 
                        id= {id}
                        category={category}
                        key={`category${category.id}`}
                            />)
                    })}
                        

					</div>
					</div>
				</div>
			</div>
		
    );
}

export default Product;



