import { Button, Input, Select, Space, Table } from "antd";
import type { TableProps } from "antd";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import {
   useDeleteCategoryMutation,
   useGetAllCategoryQuery,
} from "../../../redux/features/category/categoryApi";
import { toast } from "sonner";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";

interface DataType {
   key: string;
   name: string;
   icon: string;
}

const Categories = () => {
   const { data, isLoading } = useGetAllCategoryQuery(undefined);

   const [
      deleteCategory,
      {
         data: deleteCategoryData,
         error: deleteCategoryError,
         isLoading: deleteCategoryIsLoading,
      },
   ] = useDeleteCategoryMutation();

   const onChange = (value: string) => {
      console.log(`selected ${value}`);
   };

   const onSearch = (value: string) => {
      console.log("search:", value);
   };

   const tableData: DataType[] = data?.data?.map((item) => ({
      key: item._id,
      name: item.name,
      icon: item.icon,
   }));

   const columns: TableProps<DataType>["columns"] = [
      {
         title: "ID",
         dataIndex: "key",
         key: "key",
         render: (text) => <p>{text.slice(0, 10)}</p>,
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "key",
      },
      {
         title: "Icon",
         dataIndex: "icon",
         key: "key",
      },
      {
         title: "Action",
         key: "action",
         render: (value) => (
            <Space size="middle">
               <Link to={`/admin/update-category/${value.key}`}>
                  <Button>Edit</Button>
               </Link>
               <Button
                  loading={deleteCategoryIsLoading}
                  onClick={() => deleteCategory(value.key)}
               >
                  Delete
               </Button>
            </Space>
         ),
      },
   ];

   useEffect(() => {
      if (deleteCategoryError) {
         rtqErrorMessageHandle(deleteCategoryError);
      }

      if (deleteCategoryData) {
         toast.success(deleteCategoryData.message);
      }
   }, [deleteCategoryError, deleteCategoryData]);

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Categories</h2>
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
               <Link to="/admin/add-category">
                  <Button
                     className="round-btn"
                     icon={<FaPlus />}
                  >
                     Add Category
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

export default Categories;
