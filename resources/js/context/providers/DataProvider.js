import React, {Component, createContext} from 'react';

const DataContext = createContext({});

export const DataConsumer = DataContext.Consumer;

class DataProvider extends Component {
    state = {
        isLogedIn: localStorage.getItem("isLoggedIn")
    }

    methods = {
        toggleLogedIn: this.toggleLogedIn.bind(this)
    }

    toggleLogedIn(isLogedIn) {
        this.setState({isLogedIn})
    }

    render() {
        return (
            <DataContext.Provider value={{...this.state, ...this.methods}}>
            {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataProvider

