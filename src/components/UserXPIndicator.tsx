import { Progress, Text } from "@mantine/core";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { getUser } from "../../firebase/firestore";
import { useState } from "react";

const UserXPIndicator = ({ user }: { user: User }) => {

    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        const fetchXp = async () => {
          if (user) {
            const userData = await getUser(user.uid);
            const currentLevel = Math.floor((userData?.xp || 0) / 100);
            const xpLeftForNextLevel = (userData?.xp || 0) - currentLevel * 100;

            setLevel(currentLevel);
            setProgress(xpLeftForNextLevel);
          }
        };
        fetchXp();
      }, [user]);
  return (
    <div>
        <Text>
            Level {level}
        </Text>
        <Progress value={progress} />
    </div>
  )
}

export default UserXPIndicator;