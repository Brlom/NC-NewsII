import React, { Component } from 'react';
import Tab from './Tab';

class Tabs extends Component {
    state = {
        activeTab: this.props.children[0].props.label,
    }
    render() {
        console.log(this.props.children)
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
            </div>
        );
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

}

export default Tabs;
