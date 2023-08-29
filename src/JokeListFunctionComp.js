import React, { useEffect, useState } from "react";
import axios from "axios";
import JokeFunctionComponent from "./JokeFunctionComp";
import "./JokeList.css";

/** List of jokes. 
 * 
 * props:  numJokesToGet
 * 
 * state:  {jokes [], isLoading: t/f }
 * 
*/

const JokeListFunctionComponent = ( {numJokesToGet=5} ) => {

    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /* retrieve jokes from API */

    useEffect(() => {
      getJokes()
    }, []);

    const getJokes = async () => {
        try {
            // load jokes one at a time, adding not-yet-seen jokes
            let jokes = [];
            let seenJokes = new Set();
    
            while (jokes.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
                });
                let { ...joke } = res.data;
    
                if (!seenJokes.has(joke.id)) {
                seenJokes.add(joke.id);
                jokes.push({ ...joke, votes: 0 });
                } else {
                console.log("duplicate found!");
                }
            }
            setJokes(jokes);
            setIsLoading(false);
            } catch (err) {
            console.error(err);
            }
    }

    /* empty joke list, set to loading state, and then call getJokes */


    const generateNewJokes = () => {
        setIsLoading(true);
        getJokes();
    }
    
    /* change vote for this id by delta (+1 or -1) */

    const vote = (id, delta) => {
        setJokes((prevJokes) => 
        prevJokes.map(j =>
            j.id === id ? { ...j, votes: j.votes + delta } : j
        ));
    }

    let sortedJokes = [...jokes].sort((a,b) => b.votes - a.votes);

    return (
        <div className="JokeList">
            <button
                className="JokeList-getmore"
                onClick={generateNewJokes}
                >
                Get New Jokes
            </button>
            {isLoading ? (
                <div className="loading">
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div> 

                ):( 
                sortedJokes.map(j => (
                    <JokeFunctionComponent
                        text={j.joke}
                        key={j.id}
                        id={j.id}
                        votes={j.votes}
                        vote={vote}
                    />
                    ))
                )
            }
        </div>
    )
}

export default JokeListFunctionComponent;