import axios, { AxiosResponse } from 'axios'

const API_URL = 'http://3.80.99.192:8080'

interface getBoardType {
  category: string
  type: string
  pageNo: number
  pageSize: number
  search: string
  searchOption: string
}
interface ApiResponse {
  success: boolean
  data: string
}

export const getBoardApi = async (props: getBoardType) => {
  const res = await axios
    .post(`${API_URL}/board/list`, {
      ...props
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}

interface makeBoardType {
  category: string
  type: string
  title: string
  content: string
}

export const makeBoardApi = async (props: makeBoardType) => {
  const res = await axios
    .post(`${API_URL}/board/api/register`, {
      ...props
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })
  return res
}
