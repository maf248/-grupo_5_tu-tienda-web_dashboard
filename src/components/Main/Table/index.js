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
									<th>Secciones Web</th>
									<th>Precio</th>
								</tr>
							</thead>
							<tbody>
								{
									data.map((product, i) => (
										<tr key={i}>
											<td>{product.id}</td>
											<td>{product.name}</td>
											<td>{product.subtitle_banner}</td>
											<td>{product.Categories.map(
												category => {
													return category.web_sections}
											)}</td>
											<td>{product.Categories.map(
												category => {
													return category.price}
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
