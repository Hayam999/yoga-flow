import { use, useEffect, useState } from "react";
import { getData } from "../api/data";
import dotenv from "dotenv";
dotenv.config();

function YogaPoses() {
  const [yogaPoses, setYogaPoses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadPoses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = process.env.BASIC_API_URL + process.env.YOGA_POSES_ENDPOINT;
        const data = await getData(url);
        setYogaPoses(data);
      } catch (err) {
        console.error("Failed to getData yoga Poses", err);
        setError("Failed to load yoga poses Please Try Again");
      } finally {
        setIsLoading(false);
      }
    };
    loadPoses();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h3>Yoga Poses is Loading</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          {yogaPoses.map((pose) => (
            <div key={pose.id}>{pose.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
