import { TypedUseSelectorHook, useSelector as useSelectorRedux } from 'react-redux'
import { AppState } from '../redux/slices'

const useSelector: TypedUseSelectorHook<AppState> = useSelectorRedux

export default useSelector