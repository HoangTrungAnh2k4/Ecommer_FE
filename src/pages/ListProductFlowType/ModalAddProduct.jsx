import { IoClose } from 'react-icons/io5';

import { Form, Input, InputNumber, Radio, Switch, Upload } from 'antd';

const typeEquipment = {
    pc: 'PC',
    cpu: 'CPU',
    gpu: 'GPU',
    mainboard: 'Mainboard',
    monitor: 'Màn hình',
    ssd: 'SSD',
    laptop: 'Laptop',
};

const ModalAddProduct = ({ id, handleAddProduct, visible, setVisible }) => {
    const handleAddNewProduct = (value) => {
        const result = {
            name: value.name,
            type: value.type,
            price: value.price,
            discount: value.discount,
            best_seller: value.best_seller ? 1 : 0,
            sold_quantity: 0,
            stock_quantity: value.stock_quantity,
            urlImage: value.imageUrl,
        };

        handleAddProduct(result);
    };

    return (
        <>
            {visible && (
                <div className="fixed inset-0 z-50 flex h-screen w-full items-start justify-center bg-black bg-opacity-70 transition-all duration-300 ease-in-out">
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        size="large"
                        onFinish={handleAddNewProduct}
                        autoComplete="off"
                        className="mt-20 w-[60%] rounded-lg bg-white px-12 py-10 shadow"
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <Radio.Group>
                                {typeEquipment[id] && (
                                    <Radio value={id} checked>
                                        {typeEquipment[id]}
                                    </Radio>
                                )}
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Giá sản phẩm (vnđ)"
                            name="price"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <InputNumber min={0} max={1000000000} style={{ width: '30%' }} />
                        </Form.Item>

                        <Form.Item
                            label="Khuyến mãi (%)"
                            name="discount"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <InputNumber min={0} max={100} style={{ width: '30%' }} />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="stock_quantity"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <InputNumber min={0} style={{ width: '30%' }} />
                        </Form.Item>

                        <Form.Item label="Gắn nhãn bán chạy" name="best_seller" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                        <Form.Item
                            label="Link ảnh"
                            name="imageUrl"
                            rules={[{ required: true, message: 'Thiếu thông tin' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={null}>
                            <button type="submit" className="btn float-right">
                                Submit
                            </button>
                        </Form.Item>
                    </Form>

                    <div
                        onClick={() => setVisible(false)}
                        className="-ml-16 mt-24 cursor-pointer rounded-full border bg-slate-50 p-1 text-2xl hover:bg-gray-200"
                    >
                        <IoClose />
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAddProduct;
