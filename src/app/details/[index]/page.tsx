"use client"

import { Card, Flex, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ColorTypes } from "../../utils/color_types";

export default function Details({
  params
}: {
  params: { index: String }
}) {

  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    getPokes();
  }, []);

  async function getPokes() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.index}`);
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
      {isLoading && <Text fontSize={'18px'}>Carregando...</Text>}
      {!isLoading && pokemonData && <Flex direction={{sm: 'column', lg: 'row'}} py="80px" minH="100vh" bg="lightgray" alignItems="center" justifyContent="center">
        <Flex w='400px' direction={'column'} alignItems='center' justifyContent="center">
          <Text fontSize={'28px'} fontWeight='600'>{pokemonData!.name?.toUpperCase()}</Text>
          <Card p="20px" my="20px" minW="250px" alignItems={'start'}>
            <Text textAlign={'center'} fontSize={'22px'}>Typing:</Text>
            {pokemonData!.types?.map((type: any) => (
              <Text key={type.type.name} textAlign={'center'} color={ColorTypes(type.type.name)} fontSize={'22px'}>{type.type.name}</Text>
            ))}
            <Text textAlign={'center'} fontSize={'22px'}>Abilities:</Text>
            {pokemonData!.abilities?.map((ability: any) => (
              <Text key={ability.ability.name} textAlign={'center'} color={"gray"} fontSize={'22px'}>{ability.ability.name}</Text>
            ))}
          </Card>
        </Flex>
        <Card p="10px">
          <SimpleGrid columns={2} spacing={10}>
            <GridItem>
              <Image src={pokemonData!.sprites?.front_default} alt="Front Default" w={{sm: "130px", md:'200px'}} />
            </GridItem>
            <GridItem>
              <Image src={pokemonData!.sprites?.front_shiny} alt="Front Shiny" w={{sm: "130px", md:'200px'}} />
            </GridItem>
            <GridItem>
              <Image src={pokemonData!.sprites?.back_default} alt="Back Default"w={{sm: "130px", md:'200px'}} />
            </GridItem>
            <GridItem>
              <Image src={pokemonData!.sprites?.back_shiny} alt="Back Shiny" w={{sm: "130px", md:'200px'}} />
            </GridItem>
          </SimpleGrid>
        </Card>
      </Flex>}

    </>
  )
}

