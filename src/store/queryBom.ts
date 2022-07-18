import { defineStore } from "pinia";
import request from "@/http";
import { QUERY_BOM_BOM_LIST } from "@/http/api";
import type { TablePaginationConfig } from "ant-design-vue";

interface FormState {
  categoryIds: string[];
  code: string;
  name: string;
  pageNum: number;
  pageSize: number;
  spec: string;
}
export interface DataSource {
  code: string;
  name: string;
  spec: string;
  categoryName: string;
  meas: string;
  parentNum: number;
  price: number;
  materialId: string;
  categoryId: string;
  id: string;
}
const formState: FormState = {
  code: "",
  name: "",
  pageNum: 1,
  pageSize: 20,
  spec: "",
  categoryIds: [],
};
const dataSource: DataSource[] = [];
const pagination: TablePaginationConfig = {
  position: ["bottomCenter"],
  pageSizeOptions: ["20", "40", "60", "80"],
  defaultPageSize: 20,
  showTotal: (total: number) => `共${total}条数据`,
  style: { "font-size": "12px", color: "#191B28", "margin-top": "30px" },
};
const useQueryBom = defineStore("querybom", {
  state: () => ({
    formState,
    dataSource,
    pagination,
  }),
  actions: {
    getQueryBomList() {
      for (const key in formState) {
        if (typeof formState[key as keyof FormState] === 'string') {
          (formState[key as keyof FormState] as string) = (formState[key as keyof FormState] as string).trim()
        }
      }
      request
        .get({
          url: QUERY_BOM_BOM_LIST,
          data: {
            ...formState,
            categoryIds: formState.categoryIds[0],
          },
        })
        .then((res: any) => {
          if (res.data.code === 200) {
            this.dataSource = res.data.data.list;
            this.pagination.total = res.data.data.total;
          }
        });
    },
  },
});

export default useQueryBom;
