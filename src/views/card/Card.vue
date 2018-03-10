<template>
  <div>
    111
    <!-- <template>
      <el-table :data="cardList" highlight-current-row border style="width: 100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="activity" label="活动">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="number" label="库存">
        </el-table-column>
        <el-table-column prop="platform" label="平台">
        </el-table-column>
        <el-table-column label="banner">
          <template slot-scope="scope">
            <img :src="scope.row.banner" style="width: 130px">
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.status == 1 ? '上架' : '下架'}}
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id,scope.row)" type="primary" size="mini">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <div class="block">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { getCardList, getCardEntity } from '@/api/api.js'

export default {
  data() {
    return {
      cardList: [],
      page: 1,
      currentPage1: 1,
      count: 0
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let params = {
        page: this.page
      }
      getCardList(params)
        .then(res => {
          if (res.data.status == 200) {
            console.log(res.data.data.rows)
            this.count = res.data.data.count
            this.cardList = res.data.data.rows
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDetail(index, row) {
      console.log(index)
      console.log(row)

      let params = {
        id: index
      }
      getCardEntity(params)
        .then(res => {
          if (res.data.status == 200) {
            console.log(res.data.data)
            let html = `
              <div class="card-detail">
                <p>ID：${res.data.data.id}</p>
                <p>活动：${res.data.data.activity}</p>
                <p>卡券ID：${res.data.data.cardId}</p>
                <p>名称：${res.data.data.name}</p>
                <p>库存：${res.data.data.number}</p>
                <p>平台：${res.data.data.platform}</p>
                <p>备注：${res.data.data.description}</p>
                <p>创建时间：${res.data.data.createdTime}</p>
                <p>状态：${res.data.data.status==1?'上架':'下架'}</p>
              </div>
            `;
            this.$alert(html, '推送卡券的详细信息', {
              dangerouslyUseHTMLString: true
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
