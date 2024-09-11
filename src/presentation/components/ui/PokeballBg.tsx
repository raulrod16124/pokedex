import { StyleProp, Image, ImageStyle } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';

interface IProps {
    style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({style}: IProps) => {

    const {isDark} = useContext(ThemeContext);
    const pokeballImg = isDark
        ? require("../../../assets/pokeball-light.png")
        : require("../../../assets/pokeball-dark.png");

    
    return (
        <Image 
            source={pokeballImg}
            style={[
                {
                    width: 300, 
                    height: 300,
                    opacity: 0.3
                },
                style
            ]}
        />
    )
}