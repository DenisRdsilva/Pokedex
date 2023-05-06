"use client"

import Link from 'next/link'
import { Image, Flex, Center, Text, Spacer, HStack } from '@chakra-ui/react'


export default function Navbar() {
    return (
        <Flex position='fixed' direction={'row'} bg='black' w='100%' h='60px' zIndex={'5'}>
            <Flex pl='35'>
                <Center>
                    <Image src='/pokeball.png' w='27' h='27' />
                    <Text color='white' pl='5' fontSize={'22px'} mt='15' mb='15'>Pokedex</Text>
                </Center>
            </Flex>
            <Spacer />
            <Flex pr='35'>
                <Center>
                    <HStack spacing={'20'}>
                        <Link href='/'><Text color='white' fontSize={'18px'} _hover={{ borderBottom: "solid 1px white" }} >Home</Text></Link>
                        <Link href='/about'><Text color='white' fontSize={'18px'} _hover={{ borderBottom: "solid 1px white" }}>About</Text></Link>
                    </HStack>
                </Center>
            </Flex>
        </Flex >
    )
}