import { createNewTask } from "@/modules/fetch/tasks";
import {
  Box,
  Flex,
  Text,
  Button,
  Divider,
  Center,
  FormControl,
  Input,
  Stack,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddTask = (props) => {
  const {
    setBoards,
    boards,
    setOpenModalTask,
    selectedBoard,
    fetchBoard,
    setSelectedList,
    setSelectedBoard,
    selectedList,
  } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      list_id: selectedList.id,
    };

    const newTask = await createNewTask(payload);

    setSelectedBoard((prevSelectedBoard) => ({
      ...prevSelectedBoard,
      Lists: prevSelectedBoard.Lists.map((list) =>
        list.id === selectedList.id
          ? {
              ...list,
              Tasks: [...list.Tasks, newTask],
            }
          : list
      ),
    }));

    setOpenModalTask(false);
    fetchBoard();
  };

  useEffect(() => {
    setLoading(false);
    fetchBoard();
  }, []);

  const handleClose = (e) => {
    if (e.target.id === "modalBackground") setOpenModalTask(false);
  };

  if (isLoading) {
    return (
      <Flex height="full" width="full" align="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }

  return (
    <Center
      id="modalBackground"
      h="100vh"
      w="100vw"
      position={"fixed"}
      inset={0}
      bg={"blackAlpha.800"}
      zIndex={20}
      backdropFilter="auto"
      backdropBlur="4px"
      onClick={handleClose}
    >
      <Box
        rounded={"xl"}
        boxShadow={"lg"}
        p={8}
        w={{ base: "2xs", md: "md" }}
        h="auto"
        bg={"#fefefe"}
        data-aos="zoom-in"
      >
        <FormControl>
          <Input
            m={2}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input Title List"
          />
          <Input
            m={2}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Input Title Description"
          />
        </FormControl>
        <Stack spacing={4} direction={["column", "row"]}>
          <Button
            color={"white"}
            type="submit"
            colorScheme="teal"
            w="full"
            onClick={handleAddTask}
          >
            Add
          </Button>
          <Button
            color={"white"}
            colorScheme="red"
            w="full"
            onClick={() => {
              setOpenModalTask(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default AddTask;
