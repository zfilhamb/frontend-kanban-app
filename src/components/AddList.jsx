import { getAllBoard } from "@/modules/fetch/boards";
import { createNewList } from "@/modules/fetch/lists";
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

const AddList = (props) => {
  const { setBoards, boards, setOpenModalList, selectedBoard, fetchBoard, setSelectedBoard} = props;
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const handleAddList = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      board_id: +selectedBoard.id,
    };
    const newList = await createNewList(payload);
    newList.Tasks = [];
    setOpenModalList(false);
    setSelectedBoard(prevSelectedBoard => ({
      ...prevSelectedBoard,
      Lists: [...prevSelectedBoard.Lists, newList]  // Add the new list to the existing Lists
    }));
    fetchBoard()
  };

  useEffect(() => {
    setLoading(false)
    fetchBoard()
  }, []);

  const handleClose = (e) => {
    if (e.target.id === "modalBackground") setOpenModalList(false);
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
        </FormControl>
        <Stack spacing={4} direction={["column", "row"]}>
          <Button
            color={"white"}
            type="submit"
            colorScheme="teal"
            w="full"
            onClick={handleAddList}
          >
            Add
          </Button>
          <Button
            color={"white"}
            colorScheme="red"
            w="full"
            onClick={() => {
              setOpenModalList(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default AddList;
