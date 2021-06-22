import React, {useState} from 'react'

const Accordion = ({items}) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
    }

    return (    
        <div className="ui styled accordion">
            {
                items && items.length && items.map((item, i) => {
                    
                    const active = (i === activeIndex) ? "active" : "";
                    return (
                        <React.Fragment key={item.title}>
                            <div className={`title ${active}`} onClick={() => onTitleClick(i)}>
                                <i className="dropdown icon"></i>
                                {item.title}
                            </div>
                            <div className={`content ${active}`}>
                                <p>{item.content}</p>
                            </div>
                        </React.Fragment>   
                    )
                })
            }
        </div>
    )
}

export default Accordion
