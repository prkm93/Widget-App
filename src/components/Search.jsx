import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [word, setWord] = useState('');
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState(word);

    // Whenever user types in input, the timer is set and we are setting timer and then cancel it,
    // setting timer and cancel it as long as user keeps on typing. When user stops typing and timer is set 
    // to 1000 ms.

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (word) {
                setDebouncedTerm(word);
            }
        }, 1000)
        
        return () => {
            clearTimeout(timerId);
        }
    }, [word])

    useEffect(() => {
        const searchWord = async() => {
            try {
                const result = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                    params: {
                        action: 'query',
                        list: 'search', 
                        origin: '*',
                        format: 'json', 
                        srsearch: debouncedTerm
                    }
                })
                setResults(result.data.query.search);
                setWord("");
            } catch (error) {
                console.log(error);
            }   
        }
        searchWord();
    }, [debouncedTerm])


    const renderedItems = results.map(({title, snippet, pageid}) => {
        return (
            <div className="item" key={pageid}>
                <div className="right floated content">
                    <a 
                        href={`https://en.wikipedia.org?curid=${pageid}`} 
                        className="ui button"
                        target="_blank"
                    >Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: snippet}}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <h2>Search</h2> 
            <div className="ui action left icon input">
                <i className="search icon"></i>
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={word}
                    onChange={e => setWord(e.target.value)}
                />
                <div className="ui teal button">Search</div>
            </div>

            <div className="ui celled list">
                {renderedItems}
            </div>
        </div>
    )
}

export default Search;
