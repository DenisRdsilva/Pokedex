"use client"

import { Image, Flex, Center, Text, Spacer, HStack } from '@chakra-ui/react'
//import styles from './page.module.css'

export default function About() {
  return (
    <Flex direction='column' mt='60px'>
      <Center>
        <Text fontSize={'28px'} fontWeight='600' mt='40px'>About this project</Text>
      </Center>
      <Center>
        <Flex w='400px' direction={'column'} alignItems='center'>
          <Text textAlign={'center'} fontSize={'22px'} mb='10px'>I'm a huge fan of the pokemon franchise and I wanna become a Front-End Developer, so why do not to make my own pokedex while I'm practicing? That's how this project was born. Also I used Next.JS and Chakra UI in it</Text>
          <Image src='/grimm.png' w='400px' />
        </Flex>
      </Center>
    </Flex>
  )
}
