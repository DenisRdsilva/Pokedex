"use client"

import { Center, Text, Image, Flex, Grid, GridItem, SimpleGrid, Button, Box, Card } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {

  const [pokes, setPokes] = useState([]);
  const [poke, setPoke] = useState([]);
  //const [regions, setRegions] = useState('');
  const [minpoke, setMinPoke] = useState('');
  const [maxpoke, setMaxPoke] = useState(151);
  const [isLoading, setIsLoading] = useState(false);

  const axios = require('axios');

  useEffect(() => {
    setIsLoading(true); // Ativar estado isLoading
    getPokes();
  }, []);

  function SideMenu() {

    const places = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Hisui', 'Paldea']

    function handleRegion(region) {

      if (region === places[0]) {
        setMinPoke('')
        setMaxPoke(151)
      } else if (region === places[1]) {
        setMinPoke('offset=151&')
        setMaxPoke(100)
      } else if (region === places[2]) {
        setMinPoke('offset=251&')
        setMaxPoke(135)
      } else if (region === places[3]) {
        setMinPoke('offset=386&')
        setMaxPoke(107)
      } else if (region === places[4]) {
        setMinPoke('offset=493&')
        setMaxPoke(156)
      } else if (region === places[5]) {
        setMinPoke('offset=649&')
        setMaxPoke(72)
      } else if (region === places[6]) {
        setMinPoke('offset=721&')
        setMaxPoke(88)
      } else if (region === places[7]) {
        setMinPoke('offset=809&')
        setMaxPoke(89)
      }
      // else if (region === 'Hisui') {
      //   //setMinPoke('offset=898&')
      //   //setMaxPoke('')
      // } else if (region === 'Paldea') {
      //   //setMinPoke('offset=251&')
      //   //setMaxPoke('')
      // }
      setIsLoading(true); // Ativar estado isLoading
      getPokes();
    }

    return (
      <Flex borderX={'solid gray 10px'} position='fixed' left={'0'} bg='lightgray' w='20%' h='100%' direction={'column'} justifyContent='center'>
        <Image
          w='200px'
          mb='50px'
          alignSelf={'center'}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'
          alt='Imagem não encontrada' />
        {places ? places.map((region, id) => (
          <Button mx='10px' p='10px' fontSize={'18px'} mb='8px' borderRadius={'10px'} key={id}
            onClick={() => handleRegion(region)} _hover={{ bg: 'white' }}
            {...id >= 7 && (
              { isDisabled: true, _hover: { bg: 'transparent' } }
            )}
          >{region}</Button>
        )) : null}
      </Flex>
    )
  }

  async function getPokes() {

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?${minpoke}limit=${maxpoke}`);

      const data = response.data;
      setPokes(data.results);

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
    }

    setIsLoading(false); // Desativar estado isLoading
  }

  return (
    <Flex direction='row'>
      <SideMenu />
      <Flex ml='26%' direction='column' w='70%'>
        <Center mt='60px'>
          <Text fontSize={'28'} fontWeight='600' my='40px'>Gotta catch them all</Text>
        </Center>
        <Flex w='100%' justifyContent={'center'}>
          <SimpleGrid columns={[3, null, 5]} h='70vh' w='90vw' overflowY={'scroll'}>
            {isLoading && <Text>Carregando...</Text>}
            {!isLoading && poke ? poke.map((pokemon) => (
              <Card key={pokemon.id} mb='30px' bg='black' w='190px' h='255px' borderRadius='12px' boxShadow={'0 5px 10px rgba(0, 0, 0, 0.5)'}>
                <Text textAlign={'center'} fontSize={'14px'} my='15px' color='white'>{pokemon.name.toUpperCase()}</Text>
                <Image
                  border='solid 11px lightgray'
                  alignSelf={'center'}
                  bg='white'
                  w='130px'
                  h='130px'
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemon.id}.png`}
                  alt='Imagem não encontrada' />
                <Grid borderX={'solid 18px black'} mt='10px'>
                  <GridItem py='5px' fontSize={'14px'} fontWeight={'700'}>
                    <Flex direction='row' bg='white' h='25px' justifyContent={'space-evenly'}>
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
                  </GridItem>
                </Grid>
              </Card>
            )) : null}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex >
  );
}


function handleRegion(arg0: () => void) {
  throw new Error('Function not implemented.');
}
/*
export default function Home(props) {
  const { pokemons } = props

  return (
    <>
      <Center>
        <Text fontSize={'22'}>Gotta catch them all</Text>
      </Center>
      <Flex>
        <List>
          {pokemons ? pokemons.map((pokemon) => (
            <ListItem key={pokemon.id}>
              {pokemon.name}
            </ListItem>
          )) : null}
        </List>
      </Flex>
    </>
  )
}
*/