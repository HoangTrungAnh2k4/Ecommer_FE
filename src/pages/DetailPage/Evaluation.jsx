import { FaStar } from 'react-icons/fa';

import QandA from './Q.and.A';
import { Rate } from 'antd';
import { useEffect, useState } from 'react';
import { postRateAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';
import { TbSend } from 'react-icons/tb';
import { useUser } from '../../components/hooks/UserContext';

function Evaluation({ equipmenId, listRate, getRateData, setListRate }) {
    const [avgRate, setAvgRate] = useState(0);
    const [listRateEachStar, setlistRateEachStar] = useState({});
    const [rate, setRate] = useState(0);

    const { userInfo } = useUser();

    const hanldeEvaluetion = async () => {
        if (!userInfo) {
            toast.warning('Vui lòng đăng nhập để đánh giá sản phẩm');
            return;
        }

        try {
            if (rate === 0) {
                toast.warning('Vui lòng đánh giá sản phẩm');
                return;
            }

            const comment = document.querySelector('textarea').value;

            await postRateAPI({
                value: rate,
                userId: userInfo.id,
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

    const getWidthBar = (value) => {
        const total = listRate.length;

        const count = listRateEachStar[value];

        if (count === 0) return '0%';

        const width = (count / total) * 100;

        return toString(width) + '%';
    };

    useEffect(() => {
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
        handleDataRate();
    }, [listRate]);

    return (
        <div>
            <div className="bg-white shadow mb-6 px-5 py-3 border rounded-lg">
                <p className="font-semibold text-black text-lg">Bình luận và đánh giá</p>
                <div className="flex mt-4 border rounded-lg">
                    <div className="flex flex-col justify-center items-center space-y-2 border-r w-2/5">
                        <span className="font-semibold text-3xl">{isNaN(avgRate) ? '0' : avgRate.toFixed(1)} / 5</span>
                        <span className="flex gap-1">
                            <Rate value={avgRate} allowHalf disabled character={<FaStar className="text-2xl" />} />
                        </span>
                        <p className="">{listRate.length} đánh giá và nhận xét</p>
                    </div>
                    {listRateEachStar && (
                        <ul className="space-y-2 px-4 py-3 w-3/5">
                            <li className="flex justify-between items-center gap-2">
                                <span>5</span>
                                <FaStar className="text-yellow-400 text-2xl" />
                                <div className="bg-gray-200 dark:bg-gray-700 mx-2 rounded-full w-full h-2.5">
                                    <div
                                        className="bg-blue-600 rounded-full h-2.5"
                                        style={{ width: getWidthBar(5) }}
                                    ></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[5]} đánh giá</p>
                            </li>
                            <li className="flex justify-between items-center gap-2">
                                <span>4</span>
                                <FaStar className="text-yellow-400 text-2xl" />
                                <div className="bg-gray-200 dark:bg-gray-700 mx-2 rounded-full w-full h-2.5">
                                    <div
                                        className="bg-blue-600 rounded-full h-2.5"
                                        style={{ width: getWidthBar(4) }}
                                    ></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[4]} đánh giá</p>
                            </li>
                            <li className="flex justify-between items-center gap-2">
                                <span>3</span>
                                <FaStar className="text-yellow-400 text-2xl" />
                                <div className="bg-gray-200 dark:bg-gray-700 mx-2 rounded-full w-full h-2.5">
                                    <div
                                        className="bg-blue-600 rounded-full h-2.5"
                                        style={{ width: getWidthBar(3) }}
                                    ></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[3]} đánh giá</p>
                            </li>
                            <li className="flex justify-between items-center gap-2">
                                <span>2</span>
                                <FaStar className="text-yellow-400 text-2xl" />
                                <div className="bg-gray-200 dark:bg-gray-700 mx-2 rounded-full w-full h-2.5">
                                    <div
                                        className="bg-blue-600 rounded-full h-2.5"
                                        style={{ width: getWidthBar(2) }}
                                    ></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[2]} đánh giá</p>
                            </li>
                            <li className="flex justify-between items-center gap-2">
                                <span>1</span>
                                <FaStar className="text-yellow-400 text-2xl" />
                                <div className="bg-gray-200 dark:bg-gray-700 mx-2 rounded-full w-full h-2.5">
                                    <div
                                        className="bg-blue-600 rounded-full h-2.5"
                                        style={{ width: getWidthBar(1) }}
                                    ></div>
                                </div>
                                <p className="flex-shrink-0 text-sm">{listRateEachStar[1]} đánh giá</p>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="flex items-center gap-4 mt-8 font-semibold">
                    <h3 className="">Đánh giá sản phẩm:</h3>
                    <Rate
                        onChange={(value) => {
                            setRate(value);
                        }}
                        character={<FaStar className="text-2xl" />}
                    />
                </div>
                <div className="flex items-center gap-6 mt-2">
                    <textarea
                        className="bg-[#f5f5f5] mt-2 p-2 border rounded-lg outline-none w-full h-[100px] resize-none"
                        type="text"
                        placeholder="Mời bạn chia sẻ thêm cảm nhận"
                    ></textarea>
                    <button onClick={hanldeEvaluetion} className="flex items-center gap-2 rounded-xl h-fit btn">
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
