"use client"

import { Center, Flex, Image, Text } from '@chakra-ui/react'
//import styles from './page.module.css'

export default function About() {
  return (
    <Flex direction='row' h="100vh" alignItems="center" justifyContent="center">
      <Flex w='400px' direction={'column'} alignItems='center' justifyContent="center">
        <Text fontSize={'28px'} fontWeight='600'>About this project</Text>
        <Text textAlign={'center'} fontSize={'22px'}>I'm a huge fan of the pokemon franchise and I wanna become a Front-End Developer, so I decided to make my own pokedex for practicing and that's how this project was born. I used Next.JS and Chakra UI</Text>
      </Flex>
      <Center>
        <Image src='https://archives.bulbagarden.net/media/upload/b/ba/HOME0861.png' w='400px' />
      </Center>
    </Flex>
  )
}
