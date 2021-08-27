import React from 'react';
import Link from './Link';
import {datos} from '../../helpers';

const SideBar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon">
					<img style={{width: "70%", margin: "10px"}} src="https://grupo-5-tu-tienda-web.herokuapp.com/logo/logo2d.png" alt="Logo Tu Tienda Web"></img>
				</div>
			</a>

			<div className="sidebar-brand-text mx-3">
				<a href="https://grupo-5-tu-tienda-web.herokuapp.com/users/profile" target="_blank" rel="noreferrer" style={{color: "white"}} >Admin</a>
			</div>
			

			<hr className="sidebar-divider my-0" />

			<Link 
				classIcon="fas fa-fw fa-chart-area"
				title="Dashboard"
				active="active"
			/>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">Actions</div>
			
			{/* Listado de links */}
			{
				datos.map((link) => (
					<Link 
						key={link.title} 
						classIcon={link.classIcon} 
						title={link.title}
						active={link.active}
						url={link.url}
						target={link.target}
					/>
				))
			}
				

			<hr className="sidebar-divider d-none d-md-block" />
		</ul>
    );
}

export default SideBar;
