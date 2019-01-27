import React, { Component } from 'react';
import Tab from './Tab';
import MediaQuery from 'react-responsive';
class Tabs extends Component {
    state = {
        activeTab: this.props.children[0].props.label,
        activeSelect: this.props.children[0].props.label,
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;
        return (
            <div className="tabs">
                <MediaQuery query="(max-device-width: 599px)">
                    <label><h4>Topic:</h4></label>
                    <select value={this.state.activeSelect} onChange={this.onSelectClicked}>
                        {children.map((child) => {
                            return (<option value={child.props.label}>{child.props.label}</option>)
                        })}
                    </select>
                    <div className="tab-content">
                        {children.map((child) => {
                            if (child.props.label !== this.state.activeSelect) return undefined;
                            return child.props.children;
                        })}
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-device-width: 600px)">
                    <ol className="tab-list">
                        {children.map((child) => {
                            const { label } = child.props;

                            return (
                                <Tab
                                    activeTab={activeTab}
                                    key={label}
                                    label={label}
                                    onClick={onClickTabItem}
                                />
                            );
                        })}
                    </ol>
                    <div className="tab-content">
                        {children.map((child) => {
                            if (child.props.label !== activeTab) return undefined;
                            return child.props.children;
                        })}
                    </div>
                </MediaQuery>
            </div >
        );
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    onSelectClicked = (event) => {
        this.setState({ activeSelect: event.target.value })
    }

}

export default Tabs;
