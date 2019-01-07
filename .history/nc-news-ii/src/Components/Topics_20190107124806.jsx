import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import * as api from '../api';
import Tabs from '../Components/Tabs';

class Topics extends Component {
    state = {
        topics: [],
    }
    render() {
        return (
            <div>
                <h1>Library</h1>
                <Router>
                    <Tabs>
                        <div label="Gator">
                            See ya later, <em>Alligator</em>!
      </div>
                        <div label="Croc">
                            After 'while, <em>Crocodile</em>!
      </div>
                        <div label="Sarcosuchus">
                            Nothing to see here, this tab is <em>extinct</em>!
      </div>
                    </Tabs>
                    <Link></Link>
                </Router>
            </div>
        );
    }

    componentDidMount() {
        api.getTopics().then(topics => {
            this.setState({ topics: topics, isLoading: false });
        });
    }
}

export default Topics;