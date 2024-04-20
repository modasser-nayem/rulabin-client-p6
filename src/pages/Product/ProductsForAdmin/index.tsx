import { Button, Image, Input, Select, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import "./style.css";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";
import {
   useDeleteProductMutation,
   useGetAllProductForAdminQuery,
} from "../../../redux/features/products/productApi";

interface DataType {
   _id: string;
   title: string;
   model: string;
   price: number;
   quantity: number;
   image: string;
   brand: {
      _id: string;
      name: string;
      icon: string;
   };
   category: {
      _id: string;
      name: string;
      icon: string;
   };
   user: string;
   active: true;
}

const ProductsForAdmin = () => {
   const { data, isLoading } = useGetAllProductForAdminQuery(undefined);

   const [
      deleteProduct,
      {
         data: deleteProductData,
         error: deleteProductError,
         isLoading: deleteProductIsLoading,
      },
   ] = useDeleteProductMutation();

   const onChange = (value: string) => {
      console.log(`selected ${value}`);
   };

   const onSearch = (value: string) => {
      console.log("search:", value);
   };

   const tableData: DataType[] = data?.data?.map(
      (item: Record<string, unknown>) => ({
         _id: item._id,
         title: item.title,
         model: item.model,
         price: item.price,
         quantity: item.quantity,
         image: item.image,
         brand: item.brand,
         category: item.category,
         user: item.user,
         active: item.active,
      })
   );

   const columns: TableProps<DataType>["columns"] = [
      {
         title: "ID",
         dataIndex: "_id",
         key: "_id",
         render: (text) => <p>{text.slice(0, 10)}</p>,
      },
      {
         title: "Product",
         key: "product",
         render: (value) => (
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <div style={{ flex: 1 }}>
                  <p style={{ maxWidth: "150px" }}>
                     {value.title.slice(0, 40)}...
                  </p>
                  <p>Model: {value.model}</p>
                  <p>Brand: {value.brand.name}</p>
               </div>
               <Image
                  width={100}
                  src={value.image}
               />
            </div>
         ),
      },
      {
         title: "Price",
         dataIndex: "price",
         key: "price",
      },
      {
         title: "Quantity",
         dataIndex: "quantity",
         key: "quantity",
      },
      {
         title: "Status",
         dataIndex: "active",
         key: "status",
         render: (value) => (
            <Tag
               style={{ padding: "5px 15px" }}
               color={value ? "green" : "red"}
            >
               {value ? "Publish" : "Draft"}
            </Tag>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (value) => (
            <Space size="middle">
               <Link to={`/admin/update-product/${value._id}`}>
                  <Tooltip title="Edit">
                     <Button>
                        <FaEdit size={20} />
                     </Button>
                  </Tooltip>
               </Link>
               <Tooltip title="Delete">
                  <Button
                     loading={deleteProductIsLoading}
                     onClick={() => deleteProduct(value.key)}
                  >
                     <MdDelete size={20} />
                  </Button>
               </Tooltip>
               <Link to="/admin/product-details">
                  <Tooltip title="Preview">
                     <Button>
                        <IoEye size={20} />
                     </Button>
                  </Tooltip>
               </Link>
            </Space>
         ),
      },
   ];

   useEffect(() => {
      if (deleteProductError) {
         rtqErrorMessageHandle(deleteProductError);
      }

      if (deleteProductData) {
         toast.success(deleteProductData.message);
      }
   }, [deleteProductError, deleteProductData]);

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Products</h2>
            <div className="right-section">
               <Input
                  size="large"
                  placeholder="large size"
                  prefix={<IoIosSearch size={20} />}
                  className="input-item"
                  style={{ maxWidth: "300px" }}
               />
               <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  className="input-select"
                  onChange={onChange}
                  onSearch={onSearch}
                  options={[
                     {
                        value: "jack",
                        label: "Jack",
                     },
                     {
                        value: "lucy",
                        label: "Lucy",
                     },
                     {
                        value: "tom",
                        label: "Tom",
                     },
                  ]}
               />
               <Link to="/admin/add-product">
                  <Button
                     className="round-btn"
                     icon={<FaPlus />}
                  >
                     Add Product
                  </Button>
               </Link>
            </div>
         </div>
         <div>
            <Table
               loading={isLoading}
               columns={columns}
               dataSource={tableData}
               pagination={false}
            />
         </div>
      </div>
   );
};

export default ProductsForAdmin;
