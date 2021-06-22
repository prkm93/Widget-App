import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is react?',
        content: 'React is front end js framework.'
    },
    {
        title: 'why is react?',
        content: 'React is best js framework.'
    },
    {
        title: 'How do you use react?',
        content: 'you use react by creating components.'
    }
];

const options = [
    {
        label: 'The Color red',
        value: 'red'
    },
    {
        label: 'The Color green',
        value: 'green'
    },
    {
        label: 'The Color blue',
        value: 'blue'
    }
]
const App =() => {

    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <br/>
            <Header/>
            <Route path="/"><Accordion items={items}/></Route>
            <Route path="/list"><Search/></Route>
            <Route path="/dropdown">
                <Dropdown
                label="Select Color"
                options={options}
                selected={selected}
                onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/translate"><Translate/></Route>
        </div>  
    )
}

export default App;
