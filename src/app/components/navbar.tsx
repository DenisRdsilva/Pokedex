"use client"

import { Center, Flex, HStack, Image, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'


export default function Navbar() {
    return (
        <Flex position='fixed' direction={'row'} bg='black' w='100%' h='60px' zIndex={'11'}>
            <Flex pl='35'>
                <Center>
                    <Image src='https://e7.pngegg.com/pngimages/324/645/png-clipart-pokeball-pokeball-thumbnail.png' w='27' h='27' />
                    <Text color='white' pl='5' fontSize={'22px'} mt='15' mb='15'>Pokedex</Text>
                </Center>
            </Flex>
            <Spacer />
            <Flex pr='35'>
                <Center>
                    <HStack spacing={{sm: '15px', md: '20'}}>
                        <Link href='/'><Text color='white' fontSize={'18px'} _hover={{ borderBottom: "solid 1px white" }} >Home</Text></Link>
                        <Link href='/about'><Text color='white' fontSize={'18px'} _hover={{ borderBottom: "solid 1px white" }}>About</Text></Link>
                    </HStack>
                </Center>
            </Flex>
        </Flex >
    )
}