import { useDispatch } from 'react-redux'
import { clearNeedsRefresh, setNeedsRefresh } from '../redux/slices'
import useSelector from './useSelector'

const useListRefresh = (): [boolean, () => void, () => void] => {
    const needsRefresh = useSelector(s => s.listNeedsRefresh)
    const dispatch = useDispatch()
    const setTrue = () => dispatch(setNeedsRefresh())
    const setFalse = () => dispatch(clearNeedsRefresh())

    return [needsRefresh, setTrue, setFalse]
}

export default useListRefresh
