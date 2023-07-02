import { useDispatch, useSelector } from 'react-redux'
import { type RootState, clearNeedsRefresh, setNeedsRefresh } from '../redux/slices'

const useListRefresh = (): [boolean, () => void, () => void] => {
    const needsRefresh = useSelector((s: RootState) => s.app.listNeedsRefresh)
    const dispatch = useDispatch()
    const setTrue = () => dispatch(setNeedsRefresh())
    const setFalse = () => dispatch(clearNeedsRefresh())

    return [needsRefresh, setTrue, setFalse]
}

export default useListRefresh
