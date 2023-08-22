import React, { SetStateAction, useState, useEffect, Dispatch } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

export type TPage = 'home' | 'add' | 'edit'

type TPageWidget = {
	currentPage: TPage
	noteList: INote[]
	// noteList: Array<INote>
	setCurrentPage: Dispatch<SetStateAction<TPage>>
	addNote: (id: number, title: string, description: string) => void
	deleteNote: (id: number) => void
	edit: Partial<INote>
	setEdit: Dispatch<SetStateAction<INote>>
}

interface IPageWidget {}
export interface INote {
	id: number
	title: string
	desc: string
}

const CurrentPageWidget = ({
	currentPage,
	noteList,
	setCurrentPage,
	addNote,
	edit,
	setEdit,
	deleteNote,
}: TPageWidget) => {
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
		default:
			return <Home setEdit={setEdit} deleteNote={deleteNote} />
	}
}

const App = () => {
	const [currentPage, setCurrentPage] = useState<TPage>('home')
	const [edit, setEdit] = useState<INote>({} as INote)
	const [noteList, setNoteList] = useState([
		{
			id: 1,
			title: 'Note pertama',
			desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		},
	])

	const addNote = (id: number, title: string, desc: string) => {
		if (id) {
			setEdit({} as INote)
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

	const deleteNote = (id: number) => {
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
