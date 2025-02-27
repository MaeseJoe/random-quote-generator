import "./App.css"
import { Button, Flex, Group, Space, Stack, Title } from "@mantine/core"
import { IconSun, IconMoodSad, IconRocket, IconHeart, IconHelpOctagon } from "@tabler/icons-react"
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
    const [text, setText] = useState("");
    const [color, setColor] = useState("white");
    const [isGettingQuote, setIsGettingQuote] = useState(false);

    const getColor = (type: string): string => {
        switch(type){
            case "happy":
                return "#FFD700";
            case "sad":
                return "#4682B4";
            case "motivational":
                return "#32CD32";
            case "love":
                return "#FF4500";
            case "philosophical":
                return "#800080";
            default:
                return "white";
        }
    }

    const getQuote = (type: string) => {
        if(isGettingQuote) {
            return;
        }
        setIsGettingQuote(true);
        const data = {
            type: type
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(`${BASE_URL}/get-quote`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setText(data.quote);
            setColor(getColor(type));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setIsGettingQuote(false);
        });
        
    }

    return (
        <>
            <Flex h="100vh" w="100vw" top={0} left={0} pos="absolute" direction="column" align="center">
                <Space h="40vh"/>
                <Title h="5vh" c={color} order={1} className="quote">{text}</Title>
                <Space h="15vh"/>
                <Title order={2}>Select your type of quote</Title>
                <Space h="xl"/>
                <Group>
                    <Button h="15vh" w="8vw" variant="default" onClick={() => getQuote("happy")}>
                        <Stack align="center">
                            <Title order={4}>Happy</Title>
                            <IconSun size={50} stroke={1.5}/>
                        </Stack>
                    </Button>
                    <Button h="15vh" w="8vw" variant="default" onClick={() => getQuote("sad")}>
                        <Stack align="center">
                            <Title order={4}>Sad</Title>
                            <IconMoodSad size={50} stroke={1.5}/>
                        </Stack>
                    </Button>
                    <Button h="15vh" w="8vw" variant="default" onClick={() => getQuote("motivational")}>
                        <Stack align="center">
                            <Title order={4}>Motivational</Title>
                            <IconRocket size={50} stroke={1.5}/>
                        </Stack>
                    </Button>
                    <Button h="15vh" w="8vw" variant="default" onClick={() => getQuote("love")}>
                        <Stack align="center">
                            <Title order={4}>Love</Title>
                            <IconHeart size={50} stroke={1.5}/>
                        </Stack>
                    </Button>
                    <Button h="15vh" w="8vw" variant="default" onClick={() => getQuote("philosophical")}>
                        <Stack align="center">
                            <Title order={4}>Philosophical</Title>
                            <IconHelpOctagon size={50} stroke={1.5}/>
                        </Stack>
                    </Button>
                </Group>
            </Flex>
        </>
    )
}

export default App
