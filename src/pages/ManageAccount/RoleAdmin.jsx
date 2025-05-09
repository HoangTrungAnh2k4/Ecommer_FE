import { Tabs } from 'antd';

import { getMonthlyStatsAPI } from '../../api/adminAPI';
import { useEffect, useState } from 'react';

function RoleAdmin() {
    const [listMonth, setListMonth] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${year} `;
    };

    const onChange = (key) => {
        // console.log(key);
    };

    useEffect(() => {
        const getMonthlyStats = async () => {
            try {
                const res = await getMonthlyStatsAPI();
                console.log(res.data);

                if (res.data) {
                    const result = res.data.map((item) => {
                        return {
                            label: (
                                <div className="font-semibold text-textColor1 text-base">{formatDate(item.month)}</div>
                            ),
                            key: formatDate(item.month),
                            children: (
                                <div className="flex flex-wrap gap-6">
                                    <div className="bg-white mt-2 px-6 py-2 border rounded-lg w-fit text-base">
                                        <p className="font-semibold text-textColor1">Tổng số đơn</p>
                                        <p className="mt-2 font-semibold text-center">{item.total_orders}</p>
                                    </div>
                                    <div className="bg-white mt-2 px-6 py-2 border rounded-lg w-fit text-base">
                                        <p className="font-semibold text-textColor1">Doanh thu</p>
                                        <p className="mt-2 font-semibold text-center">
                                            {Number(item.total_revenue).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                            ),
                        };
                    });
                    setListMonth(result);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMonthlyStats();
    }, []);

    return (
        <div className="">
            <Tabs onChange={onChange} type="card" items={listMonth} />
        </div>
    );
}

export default RoleAdmin;
