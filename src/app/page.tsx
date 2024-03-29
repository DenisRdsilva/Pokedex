"use client"

import { Card, Center, Flex, GridItem, Image, Select, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Home() {

  const [poke, setPoke] = useState<any>([]);
  const [regions, setRegions] = useState("");
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(151);
  const [isLoading, setIsLoading] = useState(false);
  const places = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Hisui', 'Paldea']
  // const defaultSelectedRegion = { value: places?.[0] || '' };
  // const [selectedRegion, setSelectedRegion] = useControllableState(defaultSelectedRegion);

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

  return (
    <Flex direction={'column'}>
      <Flex borderX={{ sm: 'solid gray 10px', lg: 'none' }} py={{ sm: '60px', lg: '80px' }} bg={'lightgray'} direction='column' alignItems={'center'}>
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
                <Card justifyContent='center' mb={{ sm: '0px', md: '30px' }} bg='black' w={{ sm: 'auto', md: '190px' }} h={{ sm: 'auto', md: '255px' }} borderRadius='12px' boxShadow={'0 5px 10px rgba(0, 0, 0, 0.5)'}>
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
                    </Flex>
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