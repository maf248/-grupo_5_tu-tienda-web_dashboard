import React from 'react';
import PropTypes from 'prop-types';

const Link = ({classIcon, title, active, url, target}) => {

    let classItem = `nav-item ${active ?? ''}`;

    return (
        <li className={classItem}>
			<a className="nav-link collapsed" href={url} target={target}>
				<i className={classIcon}></i>
				<span style={{fontSize: '1rem'}}>{title}</span>
			</a>
		</li>       
    );
}

Link.defaultProps = {
    title: "Dashboard"
}

Link.propTypes = {
    classIcon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.string,
}


export default Link;
