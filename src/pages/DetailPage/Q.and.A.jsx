import { IoMdTime } from 'react-icons/io';
import { MdQuestionAnswer } from 'react-icons/md';
import { Rate } from 'antd';
import { FaStar } from 'react-icons/fa';

import { deleteRateAPI } from './../../api/adminAPI';

import { toast } from 'react-toastify';

function QandA({ listRate, setListRate }) {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('vi-VN', options);
    };

    const handleDeleteRate = async (id) => {
        try {
            await deleteRateAPI(id);

            const updatedListRate = listRate.filter((rate) => rate._id !== id);
            setListRate(updatedListRate);

            toast.success('Xóa đánh giá thành công');
        } catch (error) {
            console.error('Error deleting rate:', error);
        }
    };

    return (
        <div className="bg-[#f5f5f5] shadow p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Bình luận và đánh giá</h3>

            {listRate &&
                listRate.length > 0 &&
                listRate.map((item, index) => (
                    <div className="mt-6" key={index}>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{item.userName}</p>
                            <div className="flex items-center gap-1 text-textColor2">
                                <span className="font-semibold text-xs">{formatDate(item.updatedAt)}</span>
                                <IoMdTime className="mt-[1px]" />
                            </div>
                        </div>
                        <div className="bg-white mt-2 p-4 border rounded-lg text-sm">
                            <div className="flex items-center gap-3">
                                <p className="mr-6 font-semibold">Đánh giá: </p>
                                <Rate value={item.value} disabled character={<FaStar className="text-lg" />} />
                            </div>
                            <div className="flex items-center gap-3 mt-4 text-sm">
                                <p className="mr-6 font-semibold">Nhận xét: </p>
                                <p>{item.comment}</p>
                            </div>
                            <div className="flex justify-end items-center gap-6">
                                <button className="flex items-center gap-1 hover:drop-shadow-2xl mt-2 text-green-600">
                                    <MdQuestionAnswer className="mt-[2px] text-xl" />
                                    <span
                                        onClick={() => {
                                            toast.warning('Coming soon!');
                                        }}
                                        className="font-semibold"
                                    >
                                        Trả lời
                                    </span>
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteRate(item._id);
                                    }}
                                    className="flex items-center gap-1 bg-white hover:bg-red-600 mt-2 px-4 py-1 border border-red-600 rounded-lg text-red-600 hover:text-white"
                                >
                                    <span className="font-semibold">Xóa</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default QandA;
