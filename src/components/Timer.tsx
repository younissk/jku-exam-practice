import { Card, Text } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";

const Timer = ({ minutes }: { minutes: number }) => {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <Card>
      <Text>{time}</Text>
    </Card>
  );
};

export default Timer;
