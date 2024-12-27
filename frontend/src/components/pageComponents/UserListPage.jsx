import { Table as AntTable } from 'antd';
import dayjs from 'dayjs';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: 'S.No',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
        render: (text) => text,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
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
const UserListPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {
        data: usersList,
        error: usersListError,
        isLoading: usersListLoading,
    } = useGetUsersQuery();

    useEffect(() => {
        setIsLoading(true);
        if (usersListError) {
            console.error(usersListError);
            setIsLoading(usersListLoading);
        } else if(usersList) {
            const { data } = usersList;
            const newDataSet = Array.isArray(data) && data.length > 0 ?
                data.map((item, index) => ({ ...item, key: item._id, id: index + 1 })) : [];
            setData(newDataSet);
            setIsLoading(usersListLoading);
        }
    }, [usersList])

    return (
        <div className='home-page flex justify-center w-[100vw] sm:w-[80%] lg:w-[75%] xl:w-[65%] p-4 lg:p-0 mx-auto my-4 lg:my-6'>
            <AntTable
                className='user-list-table w-full'
                loading={isLoading}
                columns={columns}
                dataSource={data}
                rowKey={"_id"}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 500 }}
            />
        </div>
    )
}

export default UserListPage