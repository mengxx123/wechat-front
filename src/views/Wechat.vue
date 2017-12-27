<template>
    <div class="page page-wechat">
        <ui-header></ui-header>
        <main class="page-body">
            <div class="container wechat-box">
                <div class="wechat-phone">
                    <header class="header">
                        <h2 class="title">{{ wechat.name }}</h2>
                    </header>
                    <footer class="footer" v-if="menu">
                        <div></div>
                        <ul class="menu-list">
                            <li class="menu-item" v-for="(button, index) in menu.menu.button">
                                <a class="link"
                                   :class="{active: index === menuIndex && subMenuIndex === -1}"
                                   @click.prevent="clickMenu(button, index, -1)">{{ button.name }}</a>
                                <ul>
                                    <li v-for="(btn, idx) in button.sub_button">
                                        <a class="link"
                                           :class="{active: index === menuIndex && idx === subMenuIndex}"
                                           @click.prevent="clickMenu(btn, index, idx)">{{ btn.name }}</a>
                                    </li>
                                    <li v-if="button.sub_button.length < 5">
                                        <a class="link" @click.prevent="addSubMenu(button)">+</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </footer>
                </div>
                <div class="editor">
                    <div>
                        <button>菜单排序</button>
                        <button @click="save">保存并发布</button>
                        <button>预览</button>
                        <input type="file" value="上传文件" @change="filechange($event)">
                    </div>
                    <div class="editor-content" v-if="button">
                        <div v-if="button.sub_button">已添加子菜单，仅可设置菜单名称。</div>
                        <button @click="removeMenu">删除菜单</button>
                        <div>
                            <label>菜单名称</label>
                            <input v-model="button.name">
                            <span>字数不超过4个汉字或8个字母</span>
                        </div>
                        <div v-if="button.type === 'view'">
                            <label>跳转链接</label>
                            <input v-model="button.url">
                        </div>
                        <div v-if="button.type === 'click'">
                            <label>点击事件</label>
                            <input v-model="button.key">
                        </div>
                    </div>
                </div>
                <div class="material" v-if="material">
                    <div v-if="!material.item.length">没有素材232</div>
                    111
                    <ul class="material-list">
                        <li class="item" v-for="media in material.item">
                            <div>{{ media.media_id }}</div>
                            <img :src="media.url">
                            1212
                            <div>{{ media.name }}</div>
                        </li>
                        <li></li>


                    </ul>
                </div>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                wechat: {
                    name: '紫然肌专业普拉提会馆'
                },
                menu: null,
                button: null, // 当前菜单,
                materialType: 'image',
                material: null,

                menuIndex: 0,
                subMenuIndex: -1
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                // 获取菜单
                this.$http.get('/wechat/menu').then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.menu = data
                        for (let button of this.menu.menu.button) {
                            console.log('菜单', button.name)
                            for (let btn of button.sub_button) {
                                console.log('二级菜单', btn.name)
                                delete btn.sub_button
                            }
                        }
                        console.log('完成')
                    },
                    response => {
                        console.log(response)
                    })
                console.log('图片22')
//                // 获取图片素材
//                this.$http.get('/wechat/material').then(
//                    response => {
//                        let data = response.data
//                        console.log('申请')
//                        console.log(data)
//                        this.material = data
//                    },
//                    response => {
//                        console.log(response)
//                    })
            },
            save() {
                /* eslint-disable */
                let menu2 = {
                    "button":[
                        {
                            "type":"click",
                            "name":"今日歌曲",
                            "key":"V1001_TODAY_MUSIC"
                        },
                        {
                            "name":"菜单",
                            "sub_button":[
                                {
                                    "type":"view",
                                    "name":"搜索",
                                    "url":"http://www.soso.com/"
                                },
                                {
                                    "type":"miniprogram",
                                    "name":"wxa",
                                    "url":"http://mp.weixin.qq.com",
                                    "appid":"wx286b93c14bbf93aa",
                                    "pagepath":"pages/lunar/index"
                                },
                                {
                                    "type":"click",
                                    "name":"赞一下我们",
                                    "key":"V1001_GOOD"
                                }]
                        }]
                }

                this.$http.post('/wechat/menu/update', this.menu.menu)
                    .then(response => {
                        let data = response.data
                        if (data.code === 200) {
                            console.log(data.data)
                        }
                    },
                    response => {
                        console.log('祥宜')
                        console.log(response)

                    })
            },
            addSubMenu(button) {
                console.log('哈哈')
                console.log(button)
                if (!button.sub_button) {
                    button.sub_button = []
                }
                button.sub_button.push({
                    type: 'view',
                    name: '百度一下',
                    url: 'http://www.baidu.com'
                })
            },
            removeMenu() {
                console.log('呵呵哒')
                for (let i = 0; i < this.menu.menu.button.length; i++) {
                    let button = this.menu.menu.button[i]
                    console.log('菜单', button.name)
                    let flag = false
                    for (let j = 0; j < button.sub_button.length; j++) {
                        let btn = button.sub_button[j]
                        if (i === this.menuIndex && j === this.subMenuIndex) {
                            console.log('删除的菜单', btn.name)
                            button.sub_button.splice(j, 1)
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        break
                    }
                }
                this.menuIndex = 0
                this.subMenuIndex = -1
                for (let i = 0; i < this.menu.menu.button.length; i++) {
                    let button = this.menu.menu.button[i]
                    let flag = false
                    if (this.subMenuIndex === -1) {
                        this.button = button
                        break
                    }
                    for (let j = 0; j < button.sub_button.length; j++) {
                        let btn = button.sub_button[j]
                        if (i === this.menuIndex && j === this.subMenuIndex) {
                            this.button = btn
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        break
                    }
                }
            },
            clickMenu(button, index, idx) {
                this.menuIndex = index
                this.subMenuIndex = idx

                console.log(index, idx)
                this.button = button
                if (button.type === 'view') {
//                    window.open(button.url)
                } else if (button.type === 'click') {
                }
            },
            filechange (e) {
                this.input = e.target
                if (!e.target.files.length) {
                    return
                }
                this.myfile = e.target.files[0]

                console.log('上传')
                console.log(this.myfile.name)
                let param = new FormData()
                param.append('file' ,this.myfile, this.myfile.name)
                param.append('chunk','0')
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$http.post('/wechat/upload1', param, config)
                    .then(response => {
                        console.log(response.data);
                    }, response => {
                        console.log(response)
                    })
            },
        }
    }
</script>

<style scoped>
</style>
