import { FaStar } from 'react-icons/fa';

import QandA from './Q.and.A';
import { Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getUserInforAPI, postRateAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';
import { TbSend } from 'react-icons/tb';

function Evaluation({ equipmenId, listRate, getRateData, setListRate }) {
    const [userInfor, setUserInfor] = useState({});
    const [avgRate, setAvgRate] = useState(0);
    const [listRateEachStar, setlistRateEachStar] = useState({});
    const [rate, setRate] = useState(0);

    const hanldeEvaluetion = async () => {
        try {
            if (rate === 0) {
                toast.warning('Vui lòng đánh giá sản phẩm');
                return;
            }

            const comment = document.querySelector('textarea').value;

            await postRateAPI({
                value: rate,
                userId: userInfor.id,
                equipment_id: equipmenId,
                rate: rate,
                comment: comment || 'Chưa có bình luận',
            });

            getRateData();
            toast.success('Đánh giá thành công');

            document.querySelector('textarea').value = '';
            setRate(0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDataRate = () => {
        if (!listRate) return;
        if (!Array.isArray(listRate)) {
            console.log('listRate is not an array');
            return;
        }

        let totalRate = 0;
        const result = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        listRate.forEach((item) => {
            totalRate += item.value;
            result[item.value] += 1;
        });

        setlistRateEachStar(result);
        setAvgRate(totalRate / listRate.length);
    };

    useEffect(() => {
        const getUserInfor = async () => {
            try {
                const response = await getUserInforAPI();
                setUserInfor({
                    id: response.data.userInfor.id,
                    name: response.data.userInfor.name,
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfor();
    }, []);

    useEffect(() => {
        handleDataRate();
    }, [listRate]);

    return (
        <div>
            <div className="mb-6 rounded-lg border bg-white px-5 py-3 shadow">
                <p className="text-lg font-semibold text-black">Bình luận và đánh giá</p>
                <div className="mt-4 flex rounded-lg border">
                    <div className="flex w-2/5 flex-col items-center justify-center space-y-2 border-r">
                        <span className="text-3xl font-semibold">{isNaN(avgRate) ? '0' : avgRate.toFixed(1)} / 5</span>
                        <span className="flex gap-1">
                            <Rate value={avgRate} allowHalf disabled character={<FaStar className="text-2xl" />} />
                        </span>
                        <p className="">{listRate.length} đánh giá và nhận xét</p>
                    </div>
                    {listRateEachStar && (
                        <ul className="w-3/5 space-y-2 px-4 py-3">
                            <li className="flex items-center justify-between gap-2">
                                <span>5</span>
                                <FaStar className="text-2xl text-yellow-400" />
                                <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[5]} đánh giá</p>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                                <span>4</span>
                                <FaStar className="text-2xl text-yellow-400" />
                                <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[4]} đánh giá</p>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                                <span>3</span>
                                <FaStar className="text-2xl text-yellow-400" />
                                <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[3]} đánh giá</p>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                                <span>2</span>
                                <FaStar className="text-2xl text-yellow-400" />
                                <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[2]} đánh giá</p>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                                <span>1</span>
                                <FaStar className="text-2xl text-yellow-400" />
                                <div className="mx-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: '45%' }}></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[1]} đánh giá</p>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="mt-8 flex items-center gap-4 font-semibold">
                    <h3 className="">Đánh giá sản phẩm:</h3>
                    <Rate
                        onChange={(value) => {
                            setRate(value);
                        }}
                        character={<FaStar className="text-2xl" />}
                    />
                </div>
                <div className="mt-2 flex items-center gap-6">
                    <textarea
                        className="mt-2 h-[100px] w-full resize-none rounded-lg border bg-[#f5f5f5] p-2 outline-none"
                        type="text"
                        placeholder="Mời bạn chia sẻ thêm cảm nhận"
                    ></textarea>
                    <button onClick={hanldeEvaluetion} className="btn flex h-fit items-center gap-2 rounded-xl">
                        <TbSend className="text-2xl" />
                        <span>Gửi</span>
                    </button>
                </div>
            </div>

            <QandA listRate={listRate} setListRate={setListRate} />
        </div>
    );
}

export default Evaluation;
