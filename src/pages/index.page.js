import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spacer,
  Text,
  useDisclosure,
  VStack,
  Container,
  FormLabel,
  Input,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import Layout from "@/components/Layout";
import AddList from "@/components/AddList";
import AddTask from "@/components/AddTask";
import { createNewBoard, deleteBoardById, getAllBoard } from "@/modules/fetch/boards";
import { deleteListById } from "@/modules/fetch/lists";
import { deleteTaskById, editTask } from "@/modules/fetch/tasks";

export default function Home() {
  const [boards, setBoards] = useState([])
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModalList, setOpenModalList] = useState(false);
  const [openModalTask, setOpenModalTask] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [targetListId, setTargetListId] = useState(null);
  

  const fetchBoard = async () => {
    if (window.localStorage.getItem("token")) {
      const data = await getAllBoard()
      setBoards(data)
      setIsLoading(false)
    }
  }

  const handleAddBoardClick = () => {
    onOpen();
  };

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
  };

  const handleListClick = (list) => {
    setSelectedList(list);
  };

  const handleDeleteBoard = async (boardId) => {
    await deleteBoardById(boardId);
    fetchBoard();
  };

  const handleDeleteList = async (listId) => {
    await deleteListById(listId);
    // Update the selected board's Lists array to remove the deleted list
    setSelectedBoard(prevSelectedBoard => ({
      ...prevSelectedBoard,
      Lists: prevSelectedBoard.Lists.filter(list => list.id !== listId)
    }));
    fetchBoard()
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTaskById(taskId);

    setSelectedBoard(prevSelectedBoard => ({
      ...prevSelectedBoard,
      Lists: prevSelectedBoard.Lists.map(list => ({
        ...list,
        Tasks: list.Tasks.filter(task => task.id !== taskId)
      }))
    }));

    fetchBoard();
  };

  const handleAddBoard = async (e) => {
    e.preventDefault();
    const payload = {
      name,
    };
    await createNewBoard(payload);
    fetchBoard()
    onClose()
  };

  useEffect(() => {
    setIsLoading(false)
    fetchBoard()
  }, []);

  const handleTaskDrop = async (targetListId, taskId) => {
    // Temukan daftar sumber dan tugas
    try {
      const payload = {
        list_id: targetListId, // Update the list_id in payload
      };
      await editTask(taskId, payload);  // Send request to update task's list ID in backend
      const sourceList = selectedBoard.Lists.find(list => list.Tasks.some(task => task.id === taskId));
      const task = sourceList.Tasks.find(task => task.id === taskId);
    
      // Hapus tugas dari daftar sumber
      sourceList.Tasks = sourceList.Tasks.filter(task => task.id !== taskId);
    
      // Temukan daftar tujuan dan sisipkan tugas
      const targetList = selectedBoard.Lists.find(list => list.id === targetListId);
      targetList.Tasks.push(task);
    
      // Perbarui board yang dipilih
      setSelectedBoard(prevSelectedBoard => ({
        ...prevSelectedBoard,
        Lists: prevSelectedBoard.Lists.map(list => {
          if (list.id === sourceList.id) {
            return sourceList;
          }
          if (list.id === targetList.id) {
            return targetList;
          }
          return list;
        })
      }));
    
      // Reset draggedTaskId dan targetListId
      setDraggedTaskId(null);
      setTargetListId(null);
      fetchBoard();

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (isLoading) {
    return (
      <Flex height="full" width="full" align="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }

  return (
    <div>
      <Layout fetchBoard={fetchBoard}>
        <Flex>
          <Box w="280px" bg="gray.800" h="100vh" p="4">
            <Divider mb="2" />
            <Flex>
              <Text color="gray.400" mb="2">
                Boards:
              </Text>
              <Spacer />
              <Button
                variant="ghost"
                color="white"
                justifyContent="flex-start"
                textAlign="left"
                alignItems="center"
                onClick={handleAddBoardClick}
              >
                <PlusSquareIcon boxSize={6} />
              </Button>
            </Flex>
            {boards.map((board, idx) => (
              <Flex>
                <Box key={idx}>
                  <Button
                    variant="ghost"
                    color="white"
                    justifyContent="flex-start"
                    textAlign="left"
                    mb="2"
                    alignItems="center"
                    onClick={() => handleBoardClick(board)}
                  >
                    {board.name}
                  </Button>
                </Box>
                <Spacer />
                <Box>
                  <IconButton mr={8} aria-label='Delete Comment' size='xs' onClick={() => handleDeleteBoard(board.id)} icon={<DeleteIcon />} />
                </Box>
              </Flex>
            ))}
          </Box>
          <Box flex="1" p="4">
            {selectedBoard && (
              <Box>
                <Flex>
                  <Text fontSize="lg" fontWeight="bold" mb="2">
                    {selectedBoard.name} Lists:
                  </Text>
                  <Spacer />
                  <Button
                    mb={3}
                    variant="ghost"
                    color="black"
                    justifyContent="flex-start"
                    textAlign="left"
                    alignItems="center"
                    onClick={() => {
                      setOpenModalList(true);
                    }}
                  >
                    <PlusSquareIcon boxSize={6} />
                  </Button>
                </Flex>
                <Flex>
                  {selectedBoard.Lists.map((list, index) => (
                    <Box
                    key={index}
                    flex="1"
                    p="2"
                    border="1px solid gray"
                    borderRadius="md"
                    mr="2"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setTargetListId(list.id);
                    }}
                    onDragLeave={() => setTargetListId(null)}
                    onDrop={() => handleTaskDrop(list.id, draggedTaskId)}
                  >

                      <Box>
                        <HStack >
                          <Text >{list.title}</Text>
                          <Spacer />
                          <IconButton mr={1} aria-label='Add Task' size='xs' onClick={() => { setOpenModalTask(true); handleListClick(list) }} icon={<PlusSquareIcon />} />
                          <IconButton mr={7} aria-label='Delete List' size='xs' onClick={() => handleDeleteList(list.id)} icon={<DeleteIcon />} />
                        </HStack>
                      </Box>
                      {list.Tasks.map((task, idx) => (
                         <Box
                         key={idx}
                         flex="1"
                         p="2"
                         border="1px solid gray"
                         borderRadius="md"
                         mr="2"
                         mt={2}
                         draggable
                         onDragStart={() => setDraggedTaskId(task.id)}
                       >
                          <HStack >
                            <Text>{task.title}</Text>
                            <Spacer />
                            <IconButton mr={3} aria-label='Delete List' size='xs' onClick={() => { handleDeleteTask(task.id); handleListClick(list) }} icon={<DeleteIcon />} />

                          </HStack>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>``
      </Layout>

      {openModalList && <AddList setSelectedBoard={setSelectedBoard} fetchBoard={fetchBoard} setOpenModalList={setOpenModalList} setBoards={setBoards} boards={boards} selectedBoard={selectedBoard} />}
      {openModalTask && <AddTask setSelectedBoard={setSelectedBoard} setSelectedList={setSelectedList} fetchBoard={fetchBoard} setOpenModalTask={setOpenModalTask} setBoards={setBoards} boards={boards} selectedList={selectedList} />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ml={3}>Add New Board</ModalHeader>
          <ModalBody>
            <Container>
              <FormLabel>Title</FormLabel>
              <Input
                mb={2}
                placeholder="insert title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={handleAddBoard}>add board</Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}