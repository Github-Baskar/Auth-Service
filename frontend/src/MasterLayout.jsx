import { Outlet } from 'react-router-dom'
import Header from './components/groupComponents/Header'

const MasterLayout = () => {
    return (
        <div className='bg-gray'>
            <Header />
            <Outlet />
        </div>
    )
}

export default MasterLayout