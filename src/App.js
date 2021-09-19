import React, {Component, Fragment} from 'react';
import ColorPicker from "./ColorPicker";

const colors = [
    {name:'red', color:'#E0212D'},
    {name:'yellow', color:'#E8B53F'},
    {name:'green', color:'#14A458'},
    {name:'blue', color:'#1EAFEA'}
]

class App extends Component {

    state = {
        currentColor: "#E8B53F"
    }

    changeTextColor = (color) => {
        this.setState( {
                currentColor: color
        })
    }

    render() {
        return (
                <Fragment>
                    <div style={{color: this.state.currentColor}}>
                        {/*<h1 style={{color: this.state.currentColor}}>Current color</h1>*/}
                        <ColorPicker
                            value = {this.state.currentColor}
                            onChange = {this.changeTextColor}
                            colors = {colors}
                        />
                    </div>

                </Fragment>
        );
    }
}

export default App;
