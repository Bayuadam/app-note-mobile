import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type CustomInput = {
	text: string
	onChange?: (value: string) => void
	label: string
	multiline?: boolean
	numberOfLines?: number
	placeholder?: string
}

export default function CustomTextInput({
	text,
	onChange,
	label,
	multiline,
	numberOfLines,
}: CustomInput) {
	return (
		<View style={styles.textInputWrapper}>
			<Text>{label}</Text>
			<TextInput
				multiline={multiline}
				numberOfLines={numberOfLines}
				style={styles.input}
				placeholder={label}
				onChangeText={(e) => onChange?.(e)}
				defaultValue={text}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textInputWrapper: {
		marginTop: 20,
	},
	input: {
		borderWidth: 2,
		borderColor: '#DDD',
		padding: 10,
	},
})
