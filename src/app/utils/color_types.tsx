export function ColorTypes(type) {
    switch (type) {
        case 'bug':
            return 'darkseagreen';
        case 'dark':
            return 'black';
        case 'dragon':
            return 'mediumpurple';
        case 'electric':
            return 'gold';
        case 'fairy':
            return 'deeppink';
        case 'fighting':
            return 'red';
        case 'fire':
            return 'darkorange';
        case 'flying':
            return 'turquoise';
        case 'ghost':
            return 'indigo';
        case 'grass':
            return 'green';
        case 'ground':
            return 'chocolate';
        case 'ice':
            return 'aqua';
        case 'normal':
            return 'grey';
        case 'poison':
            return 'purple';
        case 'psychic':
            return 'mediumvioletred';
        case 'rock':
            return 'darkkhaki';
        case 'steel':
            return 'silver';
        case 'water':
            return 'blue';
        default:
            return 'inherit'; // Cor padrão caso o tipo não seja reconhecido
    }
}