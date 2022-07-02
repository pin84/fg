<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-redpacket_fill"></i> 技术支持
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">如果对该系统有任何问题，请联系 18977256053 获取支持。或扫描下方二维码添加微信。</div>
            <div class="img-box">
                <img src="../assets/img/WechatIMG130.jpeg" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "donate"
};
</script>

<style lang="scss" scoped>
.img-box{
    width: 150px;
    height: 150px;
    img{
        width: 100%;
    }
}
</style>