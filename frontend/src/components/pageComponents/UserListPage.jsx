import { Table as AntTable } from 'antd';
import dayjs from 'dayjs';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const columns = [
    {
        title: 'S.No.',
        dataIndex: 'key',
        rowScope: 'row',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <>{text || '--'}</>,
    },
    {
        title: 'Auth Type',
        dataIndex: 'authType',
        key: 'authType',
        render: (text) => <>{text || '--'}</>,
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => <>{text && dayjs(text).format('DD MMM YYYY') || '--'}</>,
    }
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        authType: 'password',
        createdAt: '2022-01-01',
    },
    {
        key: '2',
        name: 'Jim Green',
        authType: 'oauth',
        createdAt: '2022-01-01',
    },
    {
        key: '3',
        name: 'Joe Black',
        authType: 'password',
        createdAt: '2022-01-01',
    },
];
const UserListPage = () => {
    const {
        data: usersList = '',
        error: usersListError,
        isLoading: usersListLoading,
    } = useGetUsersQuery();
    console.log(usersList)
    return (
        <div className='home-page relative flex flex-col justify-center items-center w-[100vw] sm:w-[80%] lg:w-[75%] xl:w-[65%] min-h-[calc(100vh-80px)] p-4 lg:p-0 mx-auto'>
            <AntTable
                className='w-full'
                loading={usersListLoading}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 1 }}
            />
        </div>
    )
}

export default UserListPage