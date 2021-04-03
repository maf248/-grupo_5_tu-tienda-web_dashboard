import React, {Component} from 'react';
import Card from './Card';
import Category from './Category';
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
			dataUsers: []
		}
	}

	componentDidMount () {

		fetch('http://localhost:3000/api/products')
			.then(res => res.json())
			.then(products => {
				const lastProduct = products.data[products.data.length - 1]
				
				this.setState({
					totalProducts: products.data.length,
					dataProducts: [...products.data],
					lastProduct: {...lastProduct}
				})
				
			})
			.catch((e) => {
				console.log(e);
			})

			fetch('http://localhost:3000/api/users')
			.then(res => res.json())
			.then(users => {
				this.setState({
					totalUsers: users.data.length,
					dataUsers: [...users.data]
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
								title={this.state.lastProduct.name}
							>
								<div className="text-center">
									<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src={`http://localhost:3000/images/Producto-${this.state.lastProduct.id}/${this.state.lastProduct.image}`} alt="Último producto" />
								</div>
								<h3>{this.state.lastProduct.title_banner}</h3>
								<p>{this.state.lastProduct.subtitle_banner}</p>
								<a target="_blank" rel="noreferrer" href={`http://localhost:3000/products/${this.state.lastProduct.id}`}>View product detail</a>
							</Card>
	
							<Card 
								title="Categories in Data Base"
							>
								<div className="row">
									<Category />
									<Category />
									<Category />
									<Category />
									<Category />
									<Category />
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
