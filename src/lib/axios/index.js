import { clientApi } from "./clientApi";

export const getListTeam = () => clientApi.get('/vote/listTeam')
export const checkIn = (param) => clientApi.post('/vote/checkIn',param)
export const getInfo = () => clientApi.get('/vote/getInfo')
export const voteTeam = (param) => clientApi.post('/vote/voteTeam',param)
export const start = () => clientApi.post('/vote/addConfig',{ time: 7 })
export const reset = () => clientApi.post('/vote/reset')
export const exportExcel = () => clientApi.get('/vote/exportExcel', {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
})
