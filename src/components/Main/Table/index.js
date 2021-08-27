import React from 'react';

const Table = ({data}) => {
	
    return (
        <>
					<div className="table-responsive">
						<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
							<thead>
								<tr>
									<th>ID</th>
									<th>Titulo</th>
									<th>Descripción</th>
									<th>Categorías</th>
									<th>Secciones Web</th>
									<th>Precios</th>
								</tr>
							</thead>
							<tbody>
								{ 
									data.map((product, i) => (
										
										<tr key={`product${i}`} onClick={() => window.open(`https://grupo-5-tu-tienda-web.herokuapp.com/products/${product.id}`)} style={{cursor: "pointer"}}>
											<td><p>{product.id}</p></td>
											<td><div><p>{product.name}</p><i className="far fa-edit" onClick={() => window.open(`https://grupo-5-tu-tienda-web.herokuapp.com/products/${product.id}/edit`)}></i></div></td>
											<td>{product.subtitle_banner}</td>
											<td>{product.Categories.map((category, index) => {
													return <li style={{listStyle: "none", textAlign: "center"}} key={`product${category.name}${i}`}>{category.name} </li>
												}
											)}</td>
											<td>{product.Categories.map((category, index) => {
													return <li style={{listStyle: "none", textAlign: "center"}} key={`product${category.web_sections}${i}`}>{category.web_sections} </li>
												}
											)}</td>
											
											<td>{product.Categories.map((category, index) => {
													return <li style={{listStyle: "none", textAlign: "center"}} key={`product${category.price}${i}`}>$ {category.price} </li>
												}
											)}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
        </>
    );
	
}

export default Table;
