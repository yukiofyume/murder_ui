<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.userId" placeholder="客户id" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.userName" placeholder="客户名称" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <!-- 数据展示 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="userId" label="客户id" />
      <el-table-column prop="userName" label="客户名字" />
      <el-table-column prop="murderName" label="剧本杀名称" />

      <!-- 删除按钮 -->
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeMurder(scope.row.id)"
            >删除</el-button
          >
          <router-link :to="'/murder/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import murder from "@/api/murder";
export default {
  data() {
    return {
      current: 1, //当前页
      limit: 3, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总页数
      multipleSelection: [], //批量选择选中的医院id
    };
  },

  created() {
    // 调用 methods 中的方法，得到数据
    this.getList();
  },

  methods: {
    getList(page = 1) {
      this.current = page;
      murder
        .getMurderList(this.current, this.limit, this.searchObj)
        .then((response) => {
          // 展示数据
          console.log(response);
          this.list = response.data.records;
          this.total = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    removeMurder(id) {
      this.$confirm("此操作将永久删除医院信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定则执行
        murder.removeMurder(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },

    // 获得选择复选框的内容
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    // 批量删除
    removeRows() {
      this.$confirm("此操作将永久删除医院信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定则执行
        var idList = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        murder.batchRemoveMurder(idList).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },
  },
};
</script>