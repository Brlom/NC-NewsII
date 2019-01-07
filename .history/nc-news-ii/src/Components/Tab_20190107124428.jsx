import React, { Component } from 'react';

class Tab extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

}

export default Tab;