import { useDispatch } from 'react-redux'
import { clearNeedsRefresh, setNeedsRefresh } from '../redux/slices'
import useSelector from './useSelector'

const useListRefresh = (): { needsRefresh: boolean, setListRefresh: () => void, clearListRefresh: () => void } => {
    const needsRefresh = useSelector(s => s.listNeedsRefresh)
    const dispatch = useDispatch()
    const setListRefresh = () => dispatch(setNeedsRefresh())
    const clearListRefresh = () => dispatch(clearNeedsRefresh())

    return ({ needsRefresh, setListRefresh, clearListRefresh })
}

export default useListRefresh
