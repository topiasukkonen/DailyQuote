import "./index.css";
import {useState, useEffect} from "react"
import service from "./service"


const App = () => {
  const [quotes, setQuotes]=useState([])
  const [newQuote, setNewQuote]=useState("")
  const [dailyQuote, setDailyQuote] = useState("Quotes are great")

  useEffect(() => {
    service.getAll().then(initialData => {
      setQuotes(initialData)
      updateDailyQuote()
    })
  })

  const addQuote = event => {
    event.preventDefault()
    let quot = newQuote
    service
      .create(quot)
      .then(quot => {
        setQuotes(quotes.concat(quot))
      })
    
    setNewQuote("")
  }

  const handleQuoteChange = event => {
    setNewQuote(event.target.value)
  }

  const updateDailyQuote = () => {
    let oikea = (service.getNewQuote()).then((response) => {
      setDailyQuote(response.data)
    })
  
  }

    return (
    <div className="container">
      <center>
        <h1>Quote of the day</h1>
        <p>"{dailyQuote}"</p>
        <form className="main1" onSubmit={addQuote}>
          <input className="main2" value={newQuote} onChange={handleQuoteChange}/>
          <div></div>
          <button className="main3" type="submit">add your thoughts</button>
        </form>
      </center>
    </div>
  )
}

export default App
