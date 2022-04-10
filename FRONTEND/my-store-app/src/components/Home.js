import React, { Component } from 'react';
import { Route } from 'react-router';
import Accessories from './Accessories';
import Banner from './Banner';
import Prs from './Prs';

class home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Prs />
                {/* <Accessories /> */}
            </div>
        );
    }
}

export default home;