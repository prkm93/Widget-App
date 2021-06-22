import React, {useState, useEffect, useRef} from 'react'

function Dropdown({label, options, selected, onSelectedChange}) {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('');
    const ref = useRef();

    useEffect(() => {
         
         const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            }
            setOpen(false);
         }

         document.body.addEventListener('click', onBodyClick, {capture: true})

         return (() => {
            document.body.removeEventListener('click', onBodyClick, {capture: true})
         })

    }, [])
     

    const renderedOptions = options && options.length && options.map((option) => {

        if (selected.value === option.value) {
            return null;
        }

        const handleDropdownItemClick = () => {
            onSelectedChange(option);

            if (option.value === 'red') {
                setColor('red');
            } else if (option.value === 'green') {
                setColor('green');
            } else {
                setColor('blue');
            }
        }

        return (
            <div 
                key={option.value} 
                className="item"
                onClick={() => handleDropdownItemClick()}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label htmlFor="color" className="label">{label}</label>
                <div 
                    className={`ui selection dropdown ${ open && 'visible active'}`}
                    onClick={() => {setOpen(!open);}}
                >
                <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
            {/* {
                color && <div style={{color: `${color}`}}>The Color {color}</div>
            } */}
        </div>
    )
}

export default Dropdown;
