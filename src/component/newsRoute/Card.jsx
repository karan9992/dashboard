import React from 'react'

const Card = ({ data }) => {
    // console.log(data);


    return (<>

        {data.map((curItem, index) => {
            if (!curItem.urlToImage) {
                return null
            } else {
                return (
                    <div className="newsBox" key={index}>
                        <div className="newsImg">
                            <img  src={curItem.urlToImage} />
                        </div>
                        <a onClick={() => window.open(curItem.url)}> {curItem.title} </a>
                        <button className='readMore' onClick={()=>window.open(curItem.url)}>Read More</button>
                    </div>
                )
            }
        })}

   
    </>
    )
}

export default Card