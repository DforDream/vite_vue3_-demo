import { defineStore } from "pinia";
import request from "@/http";
import { QUERY_MATERIAL_LIST } from "@/http/api";
import type { TablePaginationConfig } from "ant-design-vue";

interface FormState {
  code: string;
  name: string;
  pageNum: number;
  pageSize: number;
  spec: string;
  categoryIds: string[] | string;
}
interface Source {
  categoryId: number;
  categoryName: string;
  code: string;
  icon: string;
  id: string;
  meas: string;
  name: string;
  price: number | string;
  spec: string;
}
export interface DataSource extends Source {
  number: number;
}

const formState: FormState = {
  code: "",
  name: "",
  pageNum: 1,
  pageSize: 20,
  spec: "",
  categoryIds: "",
};
const dataSource: DataSource[] = [];
const pagination: TablePaginationConfig = {
  position: ["bottomCenter"],
  pageSizeOptions: ["20", "40", "60", "80"],
  defaultPageSize: 20,
  showTotal: (total: number) => `共${total}条数据`,
  style: { "font-size": "12px", color: "#191B28", "margin-top": "30px" },
};

const useQueryMaterial = defineStore("queryMaterial", {
  state: () => ({
    formState,
    dataSource,
    pagination,
  }),
  actions: {
    getMaterialList() {
      for (const key in formState) {
        if (typeof formState[key as keyof FormState] === 'string') {
          (formState[key as keyof FormState] as string) = (formState[key as keyof FormState] as string).trim()
        }
      }
      request
        .get({
          url: QUERY_MATERIAL_LIST,
          data: {
            ...formState,
            categoryIds:
              formState.categoryIds !== "" ? formState.categoryIds : [],
          },
        })
        .then((res: any) => {
          if (res.data.code === 200) {
            const { data } = res.data;
            this.pagination.total = data.total;
            this.dataSource = data.list.map((item: Source, index: number) => {
              return {
                ...item,
                number: index + 1 + (data.pageNum - 1) * data.pageSize,
              };
            });
          }
        });
    },
  },
});

export default useQueryMaterial;
