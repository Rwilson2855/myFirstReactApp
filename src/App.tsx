import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(7);
  console.log("count:", count);
  () => {
    setCount(10);
  };
  return (
    <>
      <Timer />
      <Users />
    </>
  );
}
function Timer() {
  const [remainingTime, setRemainingTime] = useState(21);
  const decrementTime = () => setRemainingTime(remainingTime - 1);
  return (
    <div>
      <h2>Timer</h2>
      <p>{remainingTime} seconds remaining</p>
      <button onClick={() => setRemainingTime(remainingTime - 1)}>
        -1 second
      </button>
    </div>
  );
}
function Users() {
  const users = [
    {
      name: "Ryan",
      age: "28 not 29 🤬",
      favoriteThings: ["chess", "cats", "The rise of capitalism, not anarchy"],
    },
    {
      name: "Maggie",
      age: 37,
      favoriteThings: ["the color pink", "cats", "the downfall of capitalism"],
    },
    {
      name: "Justin",
      age: 85,
      favoriteThings: [
        "stealing Ryan's Food",
        "dogs",
        "The rise of capitalism, not anarchy",
      ],
    },
    {
      name: "Tanner",
      age: 28,
      favoriteThings: [
        "JS(Ts only), its not outdated it just needs another framework man, one more framework and it will be good I promise, backend, frontend, by God we are gonna force it to do everything, and if we cant we are gonna make another framework until we can!",
        "OSRS, its not nostalgia bait I promise!",
        "The rise of capitalism, not anarchy",
      ],
    },
    {
      name: "Ali",
      age: "?",
      favoriteThings: ["her husband", "dogs", "?"],
    },
  ];
  return (
    <div>
      {users.map((arrayElement) => {
        return (
          <div style={{ border: "1px solid black" }}>
            <h2>{arrayElement.name}</h2>
            <p>Age: {arrayElement.age}</p>
            <p>Favorite things:</p>
            <ul>
              {arrayElement.favoriteThings.map((thing, index) => {
                return <li key={index}>{thing}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
function RandomNumber() {
  return (
    <div>
      <h2>Random Number</h2>
      <button onClick={(Math.floor(Math.random() * 200)}></button>
    </div>
  )
}
export default App;
