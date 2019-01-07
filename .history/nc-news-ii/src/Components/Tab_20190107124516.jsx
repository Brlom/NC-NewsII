import React, { Component } from 'react';

class Tab extends Component {
    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'tab-list-item';

        if (activeTab === label) {
            className += ' tab-list-active';
        }
        return (
            <li
                className={className}
                onClick={onClick}
            >
                {label}
            </li>
        );
    }

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

}

export default Tab;