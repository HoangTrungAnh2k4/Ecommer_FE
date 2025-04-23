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

            const updatedListRate = listRate.filter((rate) => rate.id !== id);
            setListRate(updatedListRate);

            toast.success('Xóa đánh giá thành công');
        } catch (error) {
            console.error('Error deleting rate:', error);
        }
    };

    return (
        <div className="rounded-lg border bg-[#f5f5f5] p-4 shadow">
            <h3 className="text-lg font-semibold">Bình luận và đánh giá</h3>

            {listRate &&
                listRate.length > 0 &&
                listRate.map((item) => (
                    <div className="mt-6" key={item.id}>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.user_name}</p>
                            <div className="flex items-center gap-1 text-textColor2">
                                <span className="text-xs font-semibold">{formatDate(item.date)}</span>
                                <IoMdTime className="mt-[1px]" />
                            </div>
                        </div>
                        <div className="mt-2 rounded-lg border bg-white p-4 text-sm">
                            <div className="flex items-center gap-3">
                                <p className="mr-6 font-semibold">Đánh giá: </p>
                                <Rate value={item.value} disabled character={<FaStar className="text-lg" />} />
                            </div>
                            <div className="mt-4 flex items-center gap-3 text-sm">
                                <p className="mr-6 font-semibold">Nhận xét: </p>
                                <p>{item.comment}</p>
                            </div>
                            <div className="flex items-center justify-end gap-6">
                                <button className="mt-2 flex items-center gap-1 text-green-600 hover:drop-shadow-2xl">
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
                                        handleDeleteRate(item.id);
                                    }}
                                    className="mt-2 flex items-center gap-1 rounded-lg border border-red-600 bg-white px-4 py-1 text-red-600 hover:bg-red-600 hover:text-white"
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
