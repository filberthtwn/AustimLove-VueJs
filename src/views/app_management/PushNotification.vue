<template>
    <app-manage-tab-layout :activeItem="'push-notif'">
        <div>
            <base-modal :isShow="isModalShow">
                <form enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
                    <div class="container-fluid">
                        <div class="row mb-5">
                            <div class="col-2">
                                &nbsp;
                            </div>
                            <div class="col-8">
                                <h1 class="text-center">{{ (!selectedNotif) ? '푸시 알림 보내기' : '푸시 상세' }}</h1>
                            </div>
                            <div class="col-2 d-flex">
                                <button class="btn my-auto ms-auto p-0" style="line-height:0rem;" @click="toggleModal()">
                                    <img src="@/assets/img/ui/ic_times.svg" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-grid gap-4">
                                    <div>
                                        <label for="push_title" class="form-label bold">제목</label>
                                        <input id="push_title" type="text" class="form-control" placeholder="e.g. Easter Promo" name="push_title" v-model="title" :disabled="(selectedNotif)" />
                                    </div>

                                    <div v-if="selectedNotif != null && selectedNotif.imageUrl">
                                        <button class="btn text-primary bold p-0" style="height: unset" @click="toggleImageModal()">
                                            <icon-attachment class="my-auto me-2"/>
                                            <u>첨부 파일을 참조</u>
                                        </button>
                                    </div>

                                    <div v-else>
                                        <p class="form-label bold mb-3">이미지 (클릭하여 선택)</p>
                                        <label for="push_link" class="form-label bold" style="cursor: pointer;">
                                            <div class="d-flex gap-3">
                                                <div class="btn btn-primary">
                                                    이미지 선택
                                                </div>
                                                <p class="my-auto">{{ (selectedImage) ? selectedImage.name : $strings.NO_FILE_SELECTED() }}</p>
                                            </div>
                                        </label>
                                        <input id="push_link" type="file" ref="image" class="d-none form-control" @change="selectImage"/>
                                    </div>

                                    <div>
                                        <label for="push_link" class="form-label bold">링크 (선택사항)</label>
                                        <input id="push_link" type="text" class="form-control" placeholder="e.g. www.google.com" name="push_link" v-model="link" :disabled="(selectedNotif != null)" />
                                    </div>
                                    <div>
                                        <label for="push_content" class="form-label bold">내용</label>
                                        <input id="push_content" type="text" class="form-control" placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adip" name="push_content" v-model="content" :disabled="(selectedNotif != null)" />
                                    </div>
                                    <div v-if="!isSubmit">
                                        <button class="btn btn-primary w-100" v-if="(selectedNotif == null)" @click="createAction()">
                                            푸시 보내기
                                        </button>
                                        <button class="btn btn-primary w-100" v-else @click="createNotif()">
                                            푸시 다시 보내기
                                        </button>
                                    </div>
                                    <load-widget v-else></load-widget>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </base-modal>
            
            <!-- IMAGE MODAL -->
            <base-modal :isShow="true" v-if="isAttachmentModalShow">
                <div class="d-flex flex-column">
                    <img class="mx-auto mb-4" 
                    :src="$store.state.baseUrl + selectedNotif.imageUrl" 
                    alt="" 
                    style="height: 350px; width: 350px;">

                    <button class="btn btn-primary mx-auto" 
                    type="button" 
                    style="width: 150px" 
                    @click="toggleImageModal()">
                    
                    Close
                </button>
                </div>
            </base-modal>
            <!-- END IMAGE MODAL -->

            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-12 d-flex">
                            <button class="btn btn-outline-primary py-1 px-4 ms-auto" @click="toggleModal()" @mouseover="createButtonMouseOver" @mouseout="createButtonMouseOut">
                                <div class="d-flex">
                                    <span class="bold me-2">신규 등록</span>
                                    <icon-bell class="my-auto" :color="iconColor" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr>
                                <th scope="col" class="bold">순번</th>
                                <th scope="col" class="bold">가입일자</th>
                                <th scope="col" class="bold">제목</th>
                                <th scope="col" class="bold">상세보기</th>
                            </tr>
                        </thead>

                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="4" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <tbody v-else>
                            <tr v-for="(notification, index) in notifications" :key="notification">
                                <td class="align-middle bold">{{ (index + 1) * currentPage }}</td>
                                <td class="align-middle">{{ formatDate(notification.createdAt) }}</td>
                                <td class="align-middle">{{ notification.title }}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary text-white" @click="toggleModal(notification)">
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <pagination :currentPage="currentPage" :totalPage="Math.ceil(totalValue/limit)" :callback="movePage" />
        </div>
    </app-manage-tab-layout>
</template>

<script>
    import moment from 'moment';
    
    import AppManageTabLayout from "../../components/AppManageTab/AppManageTabLayout.vue"

    import Pagination from "../../components/Pagination.vue"
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import IconBell from '../../components//icons/IconBell.vue'
    import IconAttachment from '../../components//icons/IconAttachment.vue'

    export default {
        components: {
            'app-manage-tab-layout': AppManageTabLayout,
            'icon-bell': IconBell,
            'shimmer-cell': ShimmerCell,
            'pagination': Pagination,
            'icon-attachment': IconAttachment
        },
        data() {
            return {
                limit: 15,
                currentPage: 1,
                iconColor: '#023366',
                selectedNotif: null,
                isModalShow: false,
                title: null,
                link: null,
                content: null,
                isAttachmentModalShow: false,
                selectedImage: null,
            }
        },

        props: {
            query: String,
        },

        computed: {
            notifications() {
                return this.$store.getters['notifications/notifications'];
            },

            isSubmit() {
                return this.$store.getters['notifications/isSubmit'];
            },

            isDataLoaded() {
                return this.$store.getters['notifications/isDataLoaded'];
            },

            totalValue() {
                return this.$store.getters['notifications/totalValue'];
            },

            imageUrl(){
                return this.$store.getters['notifications/imageUrl'];
            }
        },

        watch: {
            isSubmit: function () {
                if (!this.isSubmit) {
                    this.title = null,
                        this.link = null,
                        this.content = null,
                        this.isModalShow = false;
                }
            },

            imageUrl(){
                this.createNotif()
            }
        },

        methods: {
            getAllNotifications() {
                this.$store.dispatch('notifications/getAllNotification', {
                    'page': this.currentPage,
                    'limit': this.limit,
                });
            },

            createAction(){
                if (this.$refs.image.files.length > 0 ){
                    const formData = new FormData();
                    formData.append('image', this.selectedImage)

                    this.$store.dispatch('notifications/uploadNotifImage', formData);
                    return
                }
                this.createNotif();
            },

            formatDate(dateString) {
                return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
            },

            toggleModal(selectedNotif) {
                //* Reset selectedImage
                this.selectedImage = null

                if (selectedNotif != null) {
                    this.selectedNotif = selectedNotif;
                    this.title = selectedNotif.title;
                    this.link = selectedNotif.link;
                    this.content = selectedNotif.content;
                } else {
                    this.title = null;
                    this.link = null;
                    this.content = null;
                    this.selectedNotif = null;
                }
                this.isModalShow = !this.isModalShow;
            },

            createNotif() {
                let params = {
                    'title': this.title,
                    'link': this.link,
                    'content': this.content
                };

                if (this.selectedImage){
                    params['image_url'] = this.imageUrl;
                }

                this.$store.dispatch('notifications/createNotif', params);
            },

            createButtonMouseOver() {
                this.iconColor = "#FFFFFF"
            },

            createButtonMouseOut() {
                this.iconColor = "#023366"
            },

            selectImage(){
                const formData = new FormData();
                formData.append('image', this.$refs.image.files[0])
                this.selectedImage = this.$refs.image.files[0];
            },

            toggleImageModal(){
                this.isAttachmentModalShow = !this.isAttachmentModalShow;
            },

            movePage(page) {
                this.currentPage = page;
                this.getAllNotifications();
            },
        },

        created() {
            this.getAllNotifications();
        },
    }
</script>