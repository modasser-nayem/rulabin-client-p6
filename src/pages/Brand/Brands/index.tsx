import { Button, Input, Select, Space, Table } from "antd";
import type { TableProps } from "antd";
import "./style.css";
import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import rtqErrorMessageHandle from "../../../utils/rtqErrorMessageHandle";
import { useEffect } from "react";
import {
   useDeleteBrandMutation,
   useGetAllBrandQuery,
} from "../../../redux/features/Brand/brandApi";

interface DataType {
   key: string;
   name: string;
   icon: string;
}

const Brands = () => {
   const { data, isLoading } = useGetAllBrandQuery(undefined);

   const [
      deleteBrand,
      {
         data: deleteBrandData,
         error: deleteBrandError,
         isLoading: deleteBrandIsLoading,
      },
   ] = useDeleteBrandMutation();

   const onChange = (value: string) => {
      console.log(`selected ${value}`);
   };

   const onSearch = (value: string) => {
      console.log("search:", value);
   };

   const tableData: DataType[] = data?.data?.map(
      (item: Record<string, unknown>) => ({
         key: item._id,
         name: item.name,
         icon: item.icon,
      })
   );

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
               <Link to={`/admin/update-brand/${value.key}`}>
                  <Button>Edit</Button>
               </Link>
               <Button
                  loading={deleteBrandIsLoading}
                  onClick={() => deleteBrand(value.key)}
               >
                  Delete
               </Button>
            </Space>
         ),
      },
   ];

   useEffect(() => {
      if (deleteBrandError) {
         rtqErrorMessageHandle(deleteBrandError);
      }

      if (deleteBrandData) {
         toast.success(deleteBrandData.message);
      }
   }, [deleteBrandError, deleteBrandData]);

   return (
      <div className="categories">
         <div className="header">
            <h2 className="title">Brands</h2>
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
               <Link to="/admin/add-brand">
                  <Button
                     className="round-btn"
                     icon={<FaPlus />}
                  >
                     Add Brand
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

export default Brands;
