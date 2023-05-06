import { Flex, Text, Spacer } from '@chakra-ui/react'

export default function Footer() {
    return (
        <Flex position='fixed' bottom={'0'} bg='black' w='100%' zIndex={'5'}>
            <Spacer />
            <Text fontSize={'18px'} color='white'>Pokedex &copy; 2023 Designed by Dsilva</Text>
            <Spacer />
        </Flex>
    )
}