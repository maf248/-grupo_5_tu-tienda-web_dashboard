import React, {Component} from 'react';
import Card from './Card';
import Product from './Product';
import Footer from './Footer';
import Table from './Table';
import Header from './Header';
import Metrics from './Metrics';

/* Assets */
// import dummy from './assets/images/product_dummy.svg';


class Main extends Component {

	constructor () {
		super();
		this.state = {
			totalProducts: 0,
			dataProducts: [],
			lastProduct: {},
			totalUsers: 0,
			dataUsers: [],
			suscriptionQuantity: [],
			nombresDeCategorias: [],
			usersPerCategory: [],
			totalUsersSuscriptions: 0
		}
	}

	componentDidMount () {

		fetch('http://localhost:3000/api/products')
			.then(res => res.json())
			.then(products => {
				const lastProduct = products.data[products.data.length - 1]
				let categoriesNameArr = []
				
				products.data.map( product => {
					product.Categories.map( category => {
						
						if (!categoriesNameArr.includes(category.name)) {						
							categoriesNameArr.push(category.name)
						}

						return categoriesNameArr
					})

					return null
				})

				this.setState({
					totalProducts: products.data.length,
					dataProducts: [...products.data],
					lastProduct: {...lastProduct},
					nombresDeCategorias: [...categoriesNameArr]
				})
			})
			.catch((e) => {
				console.log(e);
			})

		fetch('http://localhost:3000/api/users')
			.then(res => res.json())
			.then(users => {

					let arrayCategoriasNombres = [];
			
					users.data.map( user => {
						if (user.category_info) {
							arrayCategoriasNombres.push(user.category_info.name)
						}
						return null;
					})

					const usersPerCategory = []

					const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
					this.state.nombresDeCategorias.map(category => {
						let ammount = countOccurrences(arrayCategoriasNombres, category);
						usersPerCategory.push({[category]: ammount});
						return null;
					})

					let totalUsersSuscriptions = 0;
					usersPerCategory.map(category => {
						return totalUsersSuscriptions += category[Object.keys(category)];
					})
					console.log(totalUsersSuscriptions)

				this.setState({
					totalUsers: users.data.length,
					dataUsers: [...users.data],
					usersPerCategory: [...usersPerCategory],
					totalUsersSuscriptions: totalUsersSuscriptions
				})
			})
			.catch((e) => {
				console.log(e);
			})
			
		


	}



	componentDidUpdate () {

	}


    render () {

		return (
			<div id="content-wrapper" className="d-flex flex-column">

	
				<div id="content">
	
					<Header />

					<div className="container-fluid">
						<Metrics 
							title="Métricas"
							totalProducts={this.state.totalProducts}
							totalUsers={this.state.totalUsers}
							products={this.state.dataProducts}
							users= {this.state.dataUsers}
						/>
						<div className="row">
							{/* Cards - prueba de childrens */}

							<Card
								title={`Último producto: ${this.state.lastProduct.name}`}
							>
								<div className="text-center">
									<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "15rem"}} src={`http://localhost:3000/images/Producto-${this.state.lastProduct.id}/${this.state.lastProduct.image}`} alt="Último producto" />
								</div>
								<h3>{this.state.lastProduct.title_banner}</h3>
								<p>{this.state.lastProduct.subtitle_banner}</p>
								<a target="_blank" rel="noreferrer" href={`http://localhost:3000/products/${this.state.lastProduct.id}`}>Ver detalles del producto</a>
							</Card>

							<Card 
								title="Productos con categorías en Base de Datos"
							>
							{this.state.dataProducts.map(productData => {
								return (
								<Product
								border="primary"
								text="primary"
								image={productData.image}
								title={productData.name}
								id={productData.id}
								categories={productData.Categories}
								key={`product${productData.id}`}

								>
								</Product>)
							})}
								
							</Card>
							<Card
								title="Estadísticas de ventas"
							>
								<div className="text-center">
									<i className="fas fa-dollar-sign" style={{fontSize: "100px", margin: "10px"}}></i>
								</div>

								<div>
									<ul>
										<li><h3>Total de ventas: {this.state.totalUsersSuscriptions}</h3></li>
										<li><h3>Categorías más vendidas:</h3></li>
										<ol>
										
										{this.state.usersPerCategory.map((category,i) => {
											return (
												<li key={i}><strong>{Object.keys(category)} :</strong> {category[Object.keys(category)]} suscripciones</li>
											)
										})}
										</ol>
										<li><h3>Productos más vendidos:</h3></li>

										
									</ul>
								</div>

							</Card>
							
						</div>
						<Table 
							data={this.state.dataProducts}
						/>
					</div>
				</div>
	
				<Footer />
	
			</div>
		);
	}
}

export default Main;
