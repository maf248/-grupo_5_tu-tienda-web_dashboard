import React from 'react';

const Table = ({data}) => {

    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>
			<div className="card shadow mb-4">
				<div className="card-body">
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
										<tr key={i}>
											<td>{product.id}</td>
											<td>{product.name}</td>
											<td>{product.subtitle_banner}</td>
											<td>{product.Categories.map((category, index) => {
													if (index === 0) {
														return `${category.name} `
													} 
													else if (index < product.Categories.length - 1) {
														return `, ${category.name} `
													} else {
														return `y ${category.name}`
													}
												}
											)}</td>
											<td>{product.Categories.map((category, index) => {
													if (index === 0) {
														return `${category.web_sections} `
													} 
													else if (index < product.Categories.length - 1) {
														return `, ${category.web_sections} `
													} else {
														return `y ${category.web_sections}`
													}
												}
											)}</td>
											<td>{product.Categories.map((category, index) => {
													if (index === 0) {
														return `$ ${category.price} `
													} 
													else if (index < product.Categories.length - 1) {
														return `, $ ${category.price} `
													} else {
														return `y $ ${category.price}`
													}
												}
											)}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
        </>
    );
}

export default Table;
