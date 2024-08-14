import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Leaderboard() {
  const [monthlyPoints, setMonthlyPoints] = useState([]);
  useEffect(() => {
    const fetchMonthlyPoints = async () => {
      try {
        const response = await axios(`http://127.0.0.1:8000/api/devuser-list/`);
        setMonthlyPoints(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyPoints();
  }, []);

  let rank = 1;
  return (
    <div className="Leaderboard--Container">
      <h6 className="Leaderboard--Text">Top Developers this Month</h6>
      <table className="Leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {monthlyPoints.slice(0, 5).map((developer) => {
            return (
              <tr key={developer.UserId} className="devUserLeader">
                <td>{rank++}</td>
                <td>{developer.devUserName}</td>
                <td>{developer.MonthlyPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Leaderboard;
