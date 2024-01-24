"use client"

import { Button, Card, Center, extendTheme, Flex, GridItem, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home() {

  const [poke, setPoke] = useState([]);
  const [regions, setRegions] = useState("");
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(151);
  const [isLoading, setIsLoading] = useState(false);

  const places = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Hisui', 'Paldea']

  const axios = require('axios');

  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }

  const theme = extendTheme({ breakpoints })

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
      console.log(quantity);

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}&offset=${minLimit}`);
      const data = response.data;
      console.log(data);

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

  return (
    <Flex direction='row' mb='60px'>
      <Flex borderX={'solid gray 10px'} pt={"4%"} position='fixed' left={'0'} bg='lightgray' w='20%' h='100%' direction={'column'} justifyContent='start'>
        <Image
          w='150px'
          my='20px'
          alignSelf={'center'}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'
          alt='Imagem não encontrada' />
        {places ? places.map((region, id) => (
          <Button mx='10px' p='5px' fontSize={'16px'} mb='7px' borderRadius={'10px'} key={id}
            onClick={() => {
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
            }}
            _hover={{ bg: 'white' }}
            {...id > 7 && (
              { isDisabled: true, _hover: { bg: 'transparent' } }
            )}
          >{region}</Button>
        )) : null}
      </Flex>
      <Flex ml='26%' direction='column' w='70%'>
        <Center mt='60px'>
          <Text fontSize={'28'} fontWeight='600' my='40px'>Gotta catch them all</Text>
        </Center>
        <Flex w='100%' justifyContent={'center'}>
          <SimpleGrid templateColumns={'repeat(4, 1fr)'} gap={25}>
            {isLoading && <Text fontSize={'18px'}>Carregando...</Text>}
            {!isLoading && poke ? poke.map((pokemon) => (
              <GridItem key={pokemon.id}>
                <Card mb='30px' bg='black' w='190px' h='255px' borderRadius='12px' boxShadow={'0 5px 10px rgba(0, 0, 0, 0.5)'}>
                  <Text textAlign={'center'} fontSize={'14px'} my='15px' color='white'>{pokemon.name.toUpperCase()}</Text>
                  <Image
                    border='solid 11px lightgray'
                    alignSelf={'center'}
                    bg='white'
                    w='130px'
                    h='130px'
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt='Imagem não encontrada' />
                  <Flex direction='row' py='5px' fontSize={'14px'} fontWeight={'700'} borderX={'solid 18px black'} mt='10px' bg='white' h='25px' justifyContent={'space-evenly'}>
                    {...pokemon.types && pokemon.types.map((poke) => (
                      <Center key={poke.slot}>
                        <Text
                          {...poke.type.name === 'bug' && ({ color: 'darkseagreen' })}
                          {...poke.type.name === 'dark' && ({ color: 'black' })}
                          {...poke.type.name === 'dragon' && ({ color: 'mediumpurple' })}
                          {...poke.type.name === 'electric' && ({ color: 'gold' })}
                          {...poke.type.name === 'fairy' && ({ color: 'deeppink' })}
                          {...poke.type.name === 'fighting' && ({ color: 'red' })}
                          {...poke.type.name === 'fire' && ({ color: 'darkorange' })}
                          {...poke.type.name === 'flying' && ({ color: 'turquoise' })}
                          {...poke.type.name === 'ghost' && ({ color: 'indigo' })}
                          {...poke.type.name === 'grass' && ({ color: 'green' })}
                          {...poke.type.name === 'ground' && ({ color: 'chocolate' })}
                          {...poke.type.name === 'ice' && ({ color: 'aqua' })}
                          {...poke.type.name === 'normal' && ({ color: 'grey' })}
                          {...poke.type.name === 'poison' && ({ color: 'purple' })}
                          {...poke.type.name === 'psychic' && ({ color: 'mediumvioletred' })}
                          {...poke.type.name === 'rock' && ({ color: 'darkkhaki' })}
                          {...poke.type.name === 'steel' && ({ color: 'silver' })}
                          {...poke.type.name === 'water' && ({ color: 'blue' })}
                        >{poke.type.name.toUpperCase()}</Text></Center>
                    ))}
                  </Flex>
                </Card>
              </GridItem>
            )) : null}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex >
  );
}