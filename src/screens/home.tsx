import React, { Dispatch, SetStateAction } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../components/customButton'
import { INote, TPage } from '../../App'

interface BaseProps {
	setCurrentPage?: Dispatch<SetStateAction<TPage>>
	setEdit: Dispatch<SetStateAction<INote>>
	deleteNote: (id: number) => void
}

type Note = BaseProps & {
	item: INote
}

interface Home extends BaseProps  {
	noteList?: INote[]
}

const NoteCard = ({ item, setCurrentPage, setEdit, deleteNote }: Note) => (
	<View style={styles.card}>
		<Text style={styles.cardTitle}>{item.title}</Text>
		<Text>{item.desc}</Text>
		<View style={styles.buttons}>
			<CustomButton
				backgroundColor="#FFC300"
				color="#151D3B"
				text="Ubah"
				fontSize={12}
				width={100}
				onPress={() => {
					setCurrentPage?.('add')
					setEdit(item)
				}}
			/>
			<CustomButton
				backgroundColor="#D82148"
				color="#fff"
				text="Hapus"
				fontSize={12}
				width={100}
				onPress={() => {
					deleteNote?.(item.id)
				}}
			/>
		</View>
	</View>
)

const Home = ({ noteList, setCurrentPage, setEdit, deleteNote }: Home) => (
	<View style={styles.container}>
		<CustomButton
			backgroundColor="#DDD"
			color="#203239"
			text="Tambahkan Note"
			width="100%"
			onPress={() => {
				setCurrentPage?.('add')
			}}
		/>
		<FlatList
			showsVerticalScrollIndicator={false}
			data={noteList}
			renderItem={({ item }) => (
				<NoteCard
					item={item}
					setCurrentPage={setCurrentPage}
					setEdit={setEdit}
					deleteNote={deleteNote}
				/>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	</View>
)

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 20,
	},
	card: {
		padding: 10,
		marginVertical: 15,
		borderColor: '#DDD',
		borderWidth: 2,
		borderRadius: 5,
	},
	cardTitle: {
		fontWeight: '600',
		color: '#203239',
		fontSize: 16,
		marginBottom: 5,
	},
	buttons: {
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
})

export default Home
