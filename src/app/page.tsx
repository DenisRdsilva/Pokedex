"use client"

import { Card, Center, Flex, GridItem, Image, Modal, ModalContent, ModalOverlay, Select, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ColorTypes } from './utils/color_types';

export default function Home() {

  const [poke, setPoke] = useState<any>([]);
  const [regions, setRegions] = useState("");
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(151);
  const [isLoading, setIsLoading] = useState(false);
  const places = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Hisui', 'Paldea']

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pokemonData, setPokemonData] = useState<any>([]);

  const axios = require('axios');

  useEffect(() => {
    setIsLoading(true);
    getPokes();
  }, []);

  useEffect(() => {
    getPokes();
  }, [regions]);

  async function getPokes() {
    try {
      const quantity = maxLimit - minLimit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}&offset=${minLimit}`);
      const data = response.data;

      const promises = data.results.map(pokemon => {
        return axios.get(pokemon.url);
      });

      Promise.all(promises).then(results => {
        const dataArray = results.map(result => result.data);

        setPoke(dataArray);
      }).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Desativar estado isLoading
    }
  }

  async function getDetails(index) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
      const data = response.data;

      console.log(data);
      setPokemonData(data)

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Flex direction={'column'}>
        <Flex borderX={{ sm: 'solid gray 10px', lg: 'none' }} py={{ sm: '60px', lg: '80px' }} minH="100vh" bg={'lightgray'} direction='column' alignItems={'center'}>
          <Flex direction={{ sm: "column", lg: "row" }} pb={{ sm: 0, lg: '20px' }} maxW="1050px" w="100%" justifyContent={{ sm: 'center', lg: 'space-evenly' }} alignItems={'center'}>
            <Text fontSize={'28'} w={{ sm: "85%", lg: "50%" }} fontWeight='600' my='20px' textAlign={{ sm: 'center', lg: 'start' }}>Gotta catch them all</Text>
            <Select
              w={{ sm: "85%", lg: "50%" }}
              justifySelf={'center'}
              value={regions}
              onChange={(e) => {
                let region = e.target.value;
                setIsLoading(true);
                setRegions(region);
                if (region === places[0]) {
                  setMinLimit(0);
                  setMaxLimit(151);
                } else if (region === places[1]) {
                  setMinLimit(151);
                  setMaxLimit(251);
                } else if (region === places[2]) {
                  setMinLimit(251);
                  setMaxLimit(386);
                } else if (region === places[3]) {
                  setMinLimit(386);
                  setMaxLimit(493);
                } else if (region === places[4]) {
                  setMinLimit(493);
                  setMaxLimit(649);
                } else if (region === places[5]) {
                  setMinLimit(649);
                  setMaxLimit(721);
                } else if (region === places[6]) {
                  setMinLimit(721);
                  setMaxLimit(809);
                } else if (region === places[7]) {
                  setMinLimit(809);
                  setMaxLimit(898);
                }
              }
              }
            >
              {places ? (
                places.map((region, id) => (
                  id <= 7 ?
                    <option key={id} value={region}>
                      {region}
                    </option>
                    : <option key={id} disabled>{region} (Indisponível)</option>
                ))
              ) : null}
            </Select>
          </Flex>
          <Flex w='100%' mt={{ sm: '40px', lg: '0' }} justifyContent={'center'} alignItems={'center'}>
            <SimpleGrid templateColumns={{ sm: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }} gap={'25px'}>
              {isLoading && <Text fontSize={'18px'}>Carregando...</Text>}
              {!isLoading && poke ? poke.map((pokemon) => (
                <GridItem key={pokemon.id}>
                  <button onClick={() => {
                    getDetails(pokemon.id);
                    onOpen();
                  }}><Card justifyContent='center' mb={{ sm: '0px', md: '30px' }} bg='black' w={{ sm: 'auto', md: '180px' }} h={{ sm: 'auto', md: '255px' }} borderRadius='12px' boxShadow={'0 5px 10px rgba(0, 0, 0, 0.5)'}>
                      <Flex direction={{ sm: 'row', md: 'column' }}>
                        <Image
                          border='solid 11px lightgray'
                          alignSelf={'center'}
                          bg='white'
                          w={{ sm: '75%', md: '130px' }}
                          h={{ sm: 'auto', md: '130px' }}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                          alt='Imagem não encontrada' />
                        <Flex direction='column' minW={{ sm: '200px', md: "fit-content" }} justifyContent='center'>
                          <Text textAlign={'center'} fontSize={'14px'} my={{ sm: '0px', md: '15px' }} mb={{ sm: '5px', md: '0px' }} color='white'>{pokemon.name.toUpperCase()}</Text>
                          <Flex direction='row' py='5px' fontSize={'14px'} fontWeight={'700'} borderX={'solid 18px black'} mt='10px' bg='white' h='25px' justifyContent={'space-evenly'}>
                            {...pokemon.types && pokemon.types.map((poke) => (
                              <Center key={poke.slot}>
                                <Text
                                  px='5px'
                                  color={ColorTypes(poke.type.name)}
                                >{poke.type.name.toUpperCase()}</Text></Center>
                            ))}
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  </button>
                </GridItem>
              )) : null}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={{ sm: "lighgray", lg: "transparent" }} my="auto">
          {/* <ModalBody> */}
            <Card p={{sm:"10px", md: "0"}} background={'lightgray'}>
              {isLoading && <Text fontSize={'18px'}>Carregando...</Text>}
              {!isLoading && pokemonData && <Flex direction='column' gap={"15px"} justifyContent="center">
                {/* <Flex direction={'column'} alignItems='center' justifyContent="center"> */}
                <Center><Card p="20px" minW={{ sm: "100%", md: "448px" }} alignItems={'start'}>
                  <Text fontSize={'28px'} pb={"10px"} fontWeight='600'>{pokemonData!.name?.toUpperCase()}</Text>
                  <Text textAlign={'center'} fontSize={'22px'}>Typing:</Text>
                  <Flex direction="row" justifyContent={"space-evenly"} gap={"10px"}>
                    {pokemonData!.types?.map((type: any) => (
                      <Text key={type.type.name} textAlign={'center'} color={ColorTypes(type.type.name)} fontSize={'16px'}>{type.type.name}</Text>
                    ))}
                  </Flex>
                  <Text textAlign={'center'} fontSize={'22px'}>Abilities:</Text>
                  <Flex direction="row" justifyContent={"space-between"} gap={"10px"}>
                    {pokemonData!.abilities?.map((ability: any) => (
                      <Text key={ability.ability.name} textAlign={'center'} color={"gray"} fontSize={'16px'}>{ability.ability.name}</Text>
                    ))}
                  </Flex>
                </Card></Center>
                {/* </Flex> */}
                <Card justifyContent={"center"} minW={{ sm: "100%", md: "448px" }} alignItems={"center"}>
                  <SimpleGrid templateColumns={{ sm: "repeat(2, 130px)", md: "repeat(2, 180px)" }} gap={"10px"}>
                    <GridItem>
                      <Image src={pokemonData!.sprites?.front_default} alt="Front Default" w={{ sm: "130px", md: '180px' }} h={{ sm: "130px", md: '180px' }} />
                    </GridItem>
                    <GridItem>
                      <Image src={pokemonData!.sprites?.front_shiny} alt="Front Shiny" w={{ sm: "130px", md: '180px' }} h={{ sm: "130px", md: '180px' }} />
                    </GridItem>
                    <GridItem>
                      <Image src={pokemonData!.sprites?.back_default} alt="Back Default" w={{ sm: "130px", md: '180px' }} h={{ sm: "130px", md: '180px' }} />
                    </GridItem>
                    <GridItem>
                      <Image src={pokemonData!.sprites?.back_shiny} alt="Back Shiny" w={{ sm: "130px", md: '180px' }} h={{ sm: "130px", md: '180px' }} />
                    </GridItem>
                  </SimpleGrid>
                </Card>
              </Flex>}
            </Card>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
}
