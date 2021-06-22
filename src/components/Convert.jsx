import React, {useState, useEffect} from 'react'
import axios from 'axios';

// API Key - AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
const api_key = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
const url = 'https://translation.googleapis.com/language/translate/v2';

function Convert({text, language}) {

    const [convertedWord, setConvertedWord] = useState('');
    const [debouncedWord, setDebouncedWord] = useState(text);


    // we are performing cleanup on function if text changes before 1000
    useEffect(() => {

        const timerId = setTimeout(() => {
            if (text) {
                setDebouncedWord(text)
            }
        }, 1000)

        return () => {
            clearTimeout(timerId);
        }
        
    }, [text])

    useEffect(() => {
        translate();
    }, [debouncedWord, language])
    // Function for API call for translation of word
    // using async await
    // const translate =  async() => {
    //     try {
    //         const response = await axios.get(url, {
    //             params: {
                    // q: text,
                    // target: language.value,
                    // key: api_key
    //             }
    //         })
            
    //         const {status, data} = response;
    //         console.log("response", response)
            // if (response.status === 200) {
            //     setConvertedWord(data.data.translations[0].translatedText);
            // }
            
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // Using promises
    const translate = () => {
        axios.get(url, {
            params: {
                q: debouncedWord,
                target: language.value,
                key: api_key

            }
        }).then((response) => {
            const {status, data} = response;
            if (status === 200) {
                setConvertedWord(data.data.translations[0].translatedText);
            }
        })
        // console.log("result", result);
    }
        
    return (
        <div className="field">
            <label>Translated word:</label>
            <div><h1>{convertedWord}</h1></div>
        </div>
    )
}

export default Convert
