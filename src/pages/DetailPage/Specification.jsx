import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Specification() {
    const { id } = useParams();
    const templateData = [
        {
            key: 'Chuẩn Bus',
            des: 'PCI Express 4.0',
        },
        {
            key: 'OpenGL',
            des: '4.6',
        },
        {
            key: 'Cổng kết nối',
            des: 'USB 3.2 Gen 2',
        },
        {
            key: 'Độ phân giải',
            des: 'Độ phân giải kỹ thuật số tối đa: 7680x4320',
        },
        {
            key: 'TDP',
            des: '200w',
        },
        {
            key: 'Kích thước',
            des: '15.6 inch',
        },
        {
            key: 'Trọng lượng',
            des: '1.6kg',
        },
    ];

    return (
        <div className="rounded-lg border bg-white px-5 py-3 shadow">
            <h3 className="text-xl font-semibold">Thông số kĩ thuật</h3>
            <ul className="mt-6 h-[400px] overflow-hidden">
                {templateData.map((item, index) => (
                    <li key={index} className="flex items-center px-4 py-5 odd:bg-blue-50 even:bg-gray-50">
                        <span className="block w-1/2 font-semibold">{item.key}</span>
                        <span className="block w-1/2 text-sm">{item.des}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-center pb-3">
                <button
                    onClick={() => {
                        toast.warning('Coming soon!');
                    }}
                    className="btn mx-auto w-4/5 font-semibold"
                >
                    Xem đầy đủ thông tin kĩ thuật
                </button>
            </div>
        </div>
    );
}

export default Specification;
