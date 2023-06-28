 
// import React, {useState} from 'react';

import { v1 } from "uuid"
import { TasksStateType } from "../App"



// import {v1} from 'uuid';
 export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType =ReturnType<typeof addTaskAC> 
export type ChangeTaskStatusType =ReturnType<typeof changeTaskStatusAC> 
export type ChangeTaskTitleType =ReturnType<typeof changeTaskTitleAC> 
   

 export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType| ChangeTaskTitleType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]:state[action.payload.todolistId].filter(task=>task.id!==action.payload.taskID)
            }
        case 'ADD-TASK':
            return{ 
            ...state,
            [action.payload.todolistId]:[{id:v1(),title:action.payload.title,isDone:false },...state[action.payload.todolistId]]
            }
            case 'CHANGE-TASK-STATUS':
            return{ 
            ...state,
            [action.payload.todolistId]:state[action.payload.todolistId].map(task=>task.id===action.payload.taskID ? {...task,isDone:action.payload.isDone}:task)
            }
            case 'CHANGE-TASK-TITLE':
            return{ 
            ...state,
            [action.payload.todolistId]:state[action.payload.todolistId].map(task=>task.id===action.payload.taskID ? {...task,isDone:action.payload.title}:task)
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID:string, todolistId: string) => {
    return { type:'REMOVE-TASK', paylod:{taskID,todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', payload: { title, todolistId } } as const;
  }
export const changeTaskStatusAC = (taskID: string,isDone:boolean,todolistId: string)=> {
    return { type: 'CHANGE-TASK-STATUS',payload:{taskID,todolistId,isDone}} as const
}
export const changeTaskTitleAC = (taskID: string,title:string,todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE',payload:{taskID,todolistId,title}} as const
}