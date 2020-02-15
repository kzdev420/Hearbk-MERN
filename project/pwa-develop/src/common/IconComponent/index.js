import React from 'react';
import PropTypes from 'prop-types';

const IconComponent = ({ className, iconName }) => {
    const style = {
        background: `url('../../img/${iconName}.png') 0% 0% / contain no-repeat`
    };
    return <div style={style} className={className}></div>
};

IconComponent.propTypes = {
    className: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
};

export default IconComponent;