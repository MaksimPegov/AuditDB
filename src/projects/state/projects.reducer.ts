import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ProjectsState = {
  projects: []
}

const initialProjectsState: ProjectsState = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialProjectsState,
  reducers: {
    resetProjects: (state, action: PayloadAction<string>) => initialProjectsState,
  },
})

export const projectsReducer = projectsSlice.reducer
export const projectsActions = projectsSlice.actions
