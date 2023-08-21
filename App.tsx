import React, { SetStateAction, useState, useEffect } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

type currentPageWidget = {
	currentPage?: string
	noteList?: object
	setCurrentPage?: (value: string) => void
	addNote?: (id, title, description) => void
	edit: any
	setEdit: any
	deleteNote?: (id) => void
}

const CurrentPageWidget = ({
	currentPage,
	noteList,
	setCurrentPage,
	addNote,
	edit,
	setEdit,
	deleteNote,
}: currentPageWidget) => {
	switch (currentPage) {
		case 'home':
			return (
				<Home
					noteList={noteList}
					setCurrentPage={setCurrentPage}
					setEdit={setEdit}
					deleteNote={deleteNote}
				/>
			)
		case 'add':
		case 'edit':
			return (
				<AddNote
					addNote={addNote}
					edit={edit}
					setCurrentPage={setCurrentPage}
				/>
			)
		// return <EditNote />
		default:
			return <Home setEdit={setEdit} deleteNote={deleteNote} />
	}
}

const App = () => {
	const [currentPage, setCurrentPage] = useState('home')
	const [edit, setEdit] = useState({})
	const [noteList, setNoteList] = useState([
		{
			id: 1,
			title: 'Note pertama',
			desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		},
	])

	const addNote = (id, title, desc) => {
		if (id) {
			setEdit({})
			setNoteList((data) =>
				data.map((item) => (item.id === id ? { ...item, title, desc } : item)),
			)
		} else {
			const tmpId =
				noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1

			setNoteList([
				...noteList,
				{
					id: tmpId,
					title: title,
					desc: desc,
				},
			])
		}
	}

	const deleteNote = (id) => {
		const deleteNotes = noteList.filter((note) => {
			if (note.id !== id) {
				return note
			}
		})
		setNoteList(deleteNotes)
	}

	return (
		<CurrentPageWidget
			currentPage={currentPage}
			addNote={addNote}
			edit={edit}
			setEdit={setEdit}
			deleteNote={deleteNote}
			setCurrentPage={setCurrentPage}
			noteList={noteList}
		/>
	)
}

export default App
