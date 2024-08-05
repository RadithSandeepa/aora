import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className="border-2 border-black-200 w-full h-16 
        px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-row">
            <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                {...props}
            />

            {title === 'Password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image 
                        source={!showPassword ? icons.eye : icons.eyehide}
                        className="w-6 h-6"
                        resizeMode='contain'

                    />
                </TouchableOpacity>
            )}
        </View>
    )
    }

export default SearchInput