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
			nombresDeProductos: [],
			usersPerCategory: [],
			usersPerProduct: [],
			totalUsersSuscriptions: 0
		}
	}

	componentDidMount () {

		fetch('http://localhost:3000/api/products')
			.then(res => res.json())
			.then(products => {
				const lastProduct = products.data[products.data.length - 1]
				let categoriesNameArr = []
				let productsNameArr = []
				products.data.map( product => {
					productsNameArr.push({[product.name] : product.id})
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
					nombresDeCategorias: [...categoriesNameArr],
					nombresDeProductos: [...productsNameArr]
				})
			})
			.catch((e) => {
				console.log(e);
			})

		fetch('http://localhost:3000/api/users')
			.then(res => res.json())
			.then(users => {

					let arrayCategoriasContratadas = [];
					let arrayProductosAdquiridos = [];

					users.data.map( user => {
						if (user.product_id != null) {
							arrayProductosAdquiridos.push(user.product_id)
						}
						if (user.category_info) {
							arrayCategoriasContratadas.push(user.category_info.name)
						}
						return null;
					})
					
					/*---Funcion para contar ocurrencias de un valor en un array---*/
					const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

					/*---Funcion para ORDENAR de mayor a menor las categorias y productos más vendidos---*/
					function compare( a, b ) {
						if ( Object.values(a) < Object.values(b) ){
						  return 1;
						}
						if ( Object.values(a) > Object.values(b) ){
						  return -1;
						}
						return 0;
					  }
					
					/*---Se calcula cuantos usuarios suscriptos tiene cada categoría---*/
					const usersPerCategory = []
					this.state.nombresDeCategorias.map(category => {
						let ammountCategory = countOccurrences(arrayCategoriasContratadas, category);
						usersPerCategory.push({[category]: ammountCategory});
						return null;
					})
					
					/*---Se calcula el TOTAL de suscripciones en todas las categorías---*/
					let totalUsersSuscriptions = 0;
					usersPerCategory.map(category => {
						return totalUsersSuscriptions += category[Object.keys(category)];
					})
					/*---Se calcula cuantos usuarios poseen cada producto---*/
					const usersPerProduct = []
				
					this.state.nombresDeProductos.map(product => {
						let ammountProduct = countOccurrences(arrayProductosAdquiridos, product[Object.keys(product)]);
						usersPerProduct.push({[Object.keys(product)]: ammountProduct});
						return null;
					})

					
				/*---Se ordenan de mayor a menor los productos más vendidos y categorias más contratadas---*/ 
				usersPerProduct.sort(compare);
				usersPerCategory.sort(compare)
				

				this.setState({
					totalUsers: users.data.length,
					dataUsers: [...users.data],
					usersPerCategory: [...usersPerCategory],
					usersPerProduct: [...usersPerProduct],
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
								classStyle={"col-lg-6 mb-4"}
								>	
								<div className="text-center">
									<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "15rem"}} src={`http://localhost:3000/images/Producto-${this.state.lastProduct.id}/${this.state.lastProduct.image}`} alt="Último producto" />
								</div>
								<h3>{this.state.lastProduct.title_banner}</h3>
								<p>{this.state.lastProduct.subtitle_banner}</p>
								<a target="_blank" rel="noreferrer" href={`http://localhost:3000/products/${this.state.lastProduct.id}`}>Ver detalles del producto</a>
							</Card>

							<Card
								title="Estadísticas de ventas"
								classStyle={"col-lg-6 mb-4"}
							>
								<div className="text-center">
									<i className="fas fa-dollar-sign" style={{fontSize: "100px", margin: "10px"}}></i>
								</div>
								
								<div>
									<ul>
										<li><h4 style={{margin: '10px'}}>Total de ventas: {this.state.totalUsersSuscriptions}</h4></li>
										<li><h4 style={{margin: '10px'}}>Categorías más vendidas:</h4></li>
										<ol>
										{this.state.usersPerCategory.map((category,i) => {
											return (
												<li key={i}><strong>{Object.keys(category)} :</strong> {category[Object.keys(category)]} suscripciones</li>
											)
										})}
										</ol>
										<li><h4 style={{margin: '10px'}}>Productos más adquiridos:</h4></li>
										<ol>
										{this.state.usersPerProduct.map((product,i) => {
											return (
												<li key={`producto${i}`}><strong>{Object.keys(product)} :</strong> {product[Object.keys(product)]} usuarios</li>
											)
										})}
										</ol>
									</ul>
								</div>

							</Card>

							<Card 
								title="Productos con categorías en Base de Datos"
								classStyle={"col-lg-12 mb-4"}
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
							
							
						</div>
						<div id="table">
							<Table
								data={this.state.dataProducts}
							/>
						</div>
					</div>
				</div>
	
				<Footer />
	
			</div>
		);
	}
}

export default Main;
