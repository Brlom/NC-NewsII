import React, { Component } from 'react';

class Tabs extends Component {
    state = {
        activeTab: this.props.children[0].props.label,
    }
    render() {
        return (
            <div>

            </div>
        );
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

}

export default Tabs;
