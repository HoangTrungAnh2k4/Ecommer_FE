import { useNavigate } from 'react-router-dom';

import { deleteProductAPI } from '../../api/adminAPI';

import bestSale from '../../assets/images/general/best-sale.png';
import { toast } from 'react-toastify';

const noImage =
    'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

const hotIcon = 'https://nguyencongpc.vn/media/lib/10-01-2024/ncpc-icon-pro-hot-01-2024.png';

function ItemCard({ item }) {
    const navigate = useNavigate();

    const handleDeleteProduct = async () => {
        try {
            await deleteProductAPI(item.id);
            window.location.reload();
            toast.success('Xóa sản phẩm thành công!');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Hàm random 30% cơ hội hiển thị hotIcon
    function shouldShowHotIcon() {
        return Math.random() < 0.4; // 30% xác suất
    }

    return (
        <div
            id={item.id}
            className="card flex w-56 cursor-pointer select-none flex-col rounded-md border bg-white p-2 px-3 shadow-md"
        >
            {shouldShowHotIcon() && <img src={hotIcon} alt="hot" className="absolute right-9 top-0 z-10 w-[20px]" />}

            <img
                src={item?.image || noImage}
                alt={item.name}
                draggable="false"
                onClick={() => navigate(`/detail/${item.id}`)}
                className="size-[198px] transition-all hover:-translate-y-2"
            />

            <div className="my-2 h-[25px]">
                {Boolean(item.best_seller) && <img src={bestSale} alt="" className="w-[70px]" />}
            </div>
            <div className="flex flex-grow flex-col">
                <h2 onClick={() => navigate('/detail')} className="line-clamp-3 h-[72px] hover:text-blue-600">
                    {item?.name}
                </h2>

                <div className="mt-auto flex items-center gap-4">
                    <p className="text-sm text-textColor2 line-through">{item.price?.toLocaleString('vi-VN')}</p>
                    <div className="rounded-lg bg-redColor px-2 py-[2px] text-sm text-white">
                        {item?.discount || 0}%
                    </div>
                </div>

                <div className="mt-2 text-xl font-semibold text-redColor">
                    {(Math.ceil((item.price * (1 - item.discount / 100)) / 100000) * 100000).toLocaleString('vi-VN')}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
                <p className="font-semibold text-textColor1">Đã bán:</p>
                <span className="">{item?.sold_quantity}</span>
                {item?.role === 'admin' && (
                    <button onClick={handleDeleteProduct} className="btn ml-auto">
                        Xóa
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemCard;
