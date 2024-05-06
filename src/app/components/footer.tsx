import { Flex, Text } from '@chakra-ui/react'

export default function Footer() {
    return (
        <Flex position='fixed' bottom={'0'} bg='black' w='100%' h="50px" zIndex={'5'} justifyContent="center" alignItems="center">
            <Text fontSize={'18px'} color='white'>Pokedex &copy; DSilva</Text>
        </Flex>
    )
}