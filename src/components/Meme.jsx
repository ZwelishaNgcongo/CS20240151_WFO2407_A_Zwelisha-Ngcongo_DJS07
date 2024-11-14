import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({   /* Using two state variables managed by useState hook */
        topText: "",                           /* meme stores the current meme state with top text, bottom text, and the image URL */
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])  /* allMemes will store the array of all possible meme templates */
    

    React.useEffect(() => {
        async function getMeme() {  /* Uses async/await for clean handling of the Promise */
            const res = await fetch("https://api.imgflip.com/get_memes") /* Fetching meme templates from the imgflip API */
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMeme()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length) /* Generating a random index based on the length of available memes */
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {  /* Universal handler for both text inputs */
        const {name, value} = event.target  /* make use object destructuring to get input name and value */
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value /* Update the state using computed property name [name] */
        }))
    }
    
    return (
        <main>
            <div className="form">  { /* Renders a form with two controlled inputs for top and bottom text */}
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button  
                    className="form--button" /*  Button generates new random meme */
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}