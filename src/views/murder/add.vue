<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="客户名字">
        <el-input v-model="murderModel.userName" />
      </el-form-item>
      <el-form-item label="客户id">
        <el-input v-model="murderModel.userId" />
      </el-form-item>
      <el-form-item label="剧本杀名字">
        <el-input v-model="murderModel.murderName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import murder from "@/api/murder";

export default {
  data() {
    return {
      murderModel: {},
    };
  },

  created() {
    // 获取路由的id值
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      //   console.log(id);
      this.getSet(id);
    } else {
      //表单数据清空
      this.murderModel = {};
    }
  },

  methods: {
    //根据id查询客户信息
    getSet(id) {
      murder.getMurder(id).then((response) => {
        this.murderModel = response.data;
      });
    },
    // 更新医院信息
    update() {
      murder.updateMurder(this.murderModel).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        // 跳转列表页面，使用路由跳转方法实现
        this.$router.push({ path: "/murder/list" });
      });
    },

    save() {
      murder.saveMurder(this.murderModel).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        // 跳转列表页面，使用路由跳转方法实现
        this.$router.push({ path: "/murder/list" });
      });
    },

    saveOrUpdate() {
      if (!this.murderModel.id) {
        // 没有id做添加
        this.save();
      } else {
        this.update();
      }
    },
  },
};
</script>