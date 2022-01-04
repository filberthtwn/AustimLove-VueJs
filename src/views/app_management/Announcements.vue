<template>
    <app-manage-tab-layout :activeItem="'announcements'">
        <div>
            <base-modal :isShow="isModalShow">
                <!-- UPDATE ANNOUNCEMENT FORM -->
                <div id="announcement-form-d" v-if="!showConfirmation">
                    <form enctype="multipart/form-data" v-on:submit.prevent="createAnnouncement">
                    <div class="container-fluid">
                        <div class="row mb-5">
                            <div class="col-2">
                                &nbsp;
                            </div>
                            <div class="col-8">
                                <h1 class="text-center mb-0">공지사항 등록</h1>
                            </div>
                            <div class="col-2 d-flex">
                                <button class="btn my-auto ms-auto p-0" type="button" style="line-height:0rem; height: 21px; width:21px;" @click="toggleModal()">
                                    <img src="@/assets/img/ui/ic_times.svg" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-grid gap-4">
                                    <div>
                                        <label for="title" class="form-label bold">제목</label>
                                        <input id="title" type="text" class="form-control" placeholder="e.g. Easter Promo" name="title" v-model="title" />
                                    </div>
                                    <div>
                                        <label for="content" class="form-label bold">내용</label>
                                        <textarea id="content" class="form-control" placeholder="e.g. Lorem ipsum dolor sit amet, consectetur adip" name="content" v-model="content" rows="5"></textarea>
                                    </div>
                                    <div v-if="!isLoading">
                                        <button class="btn btn-primary w-100" v-if="(selectedAnnoucement == null)" @click="createAnnouncement">등록</button>
                                        <div class="d-flex gap-4" v-else>
                                            <button class="btn btn-danger flex-grow-1" type="button" @click="deleteAnnouncement">{{ $strings.DELETE() }}</button>
                                            <button class="btn btn-primary flex-grow-1" type="button" @click="toggleConfirmation()">{{ $strings.SAVE() }}</button>
                                        </div>
                                    </div>
                                    <load-widget v-else></load-widget>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>

                <!-- UPDATE CONFIRMATION CONTAINER -->
                <div id="confirmation-d" v-else>
                    <div class="d-flex flex-column p-3" v-if="!isLoading">
                        <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
                        <div class="d-flex mx-auto gap-3">
                            <button class="btn btn-outline-primary" style="width: 150px" @click="toggleConfirmation()">
                                {{ $strings.NO() }}
                            </button>
                            <button class="btn btn-primary" style="width: 150px" @click="updateAnnouncement()">
                                {{ $strings.YES() }}
                            </button>
                        </div>
                    </div>
                    <load-widget :loading="true"  :size="'72px'" v-else/>
                </div>
            </base-modal>

            <!-- ALERT COMPONENT -->
            <custom-alert class="mt-4" v-if="(message)" :isSuccess="isSuccess" :message="message"/>
            
            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-12 d-flex">
                            <button class="btn btn-outline-primary py-1 px-4 ms-auto" @click="toggleModal()"
                            @mouseover="createButtonMouseOver" @mouseout="createButtonMouseOut">
                                <div class="d-flex">
                                    <span class="bold me-1 my-auto">신규 등록</span>
                                    <icon-popup class="my-auto" :color="iconColor" />
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
                            <tr v-for="(announcement, index) in announcements" :key="announcement">
                                <td class="align-middle bold">{{ index + 1 }}</td>
                                <td class="align-middle">{{ formatDate(announcement.createdAt) }}</td>
                                <td class="align-middle">{{ announcement.title }}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary text-white" @click="toggleModal(announcement)">
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
    import IconPopup from '../../components//icons/IconPopup.vue'

    export default {
        components: {
            'app-manage-tab-layout': AppManageTabLayout,
            'shimmer-cell': ShimmerCell,
            'pagination': Pagination,
            'icon-popup': IconPopup,
        },
        data() {
            return {
                limit: 1,
                currentPage: 1,
                iconColor: '#023366',
                isModalShow: false,
                selectedAnnoucement: null,
                date: null,
                title: null,
                content: null,
                showConfirmation: false,
                message: ''
            }
        },
        props: {
            query: String,
        },
        computed: {
            announcements() {
                return this.$store.getters['announcements/announcements'];
            },
            isLoading() {
                return this.$store.getters['announcements/isLoading'];
            },
            isDataLoaded() {
                return this.$store.getters['announcements/isDataLoaded'];
            },
            totalValue() {
                return this.$store.getters['announcements/totalValue'];
            },
            response() {
                return this.$store.getters['announcements/response'];
            }
        },
        watch: {
            isLoading: function () {
                if (!this.isLoading) {
                    this.title = null;
                    this.content = null;
                    this.isModalShow = false;

                    this.showConfirmation = false;
                }
            },
            isSuccess: function () {
                this.announcement = null;
                this.isModalShow = false;
            },
            response() {
                this.isSuccess = this.response.success;
                this.message  = this.response.message;

                this.getAllAnnouncement();
            },
        },
        methods: {
            getAllAnnouncement() {
                this.$store.dispatch('announcements/getAllAnnouncement', {
                    'page': this.currentPage,
                    'limit': this.limit,
                });
            },
            createAnnouncement() {
                const payload = {
                    'title': this.title,
                    'content': this.content
                };
                this.$store.dispatch('announcements/createAnnouncement', payload);
            },

            toggleConfirmation(){
                this.showConfirmation = !this.showConfirmation
            },

            deleteAnnouncement() {
                const payload = {
                    "id": this.selectedAnnoucement.id,
                };
                this.$store.dispatch('announcements/deleteAnnouncement', payload);
            },

            formatDate(dateString) {
                return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
            },

            movePage(page) {
                this.currentPage = page;
                this.getAllAnnouncement();
            },

            createButtonMouseOver() {
                this.iconColor = "#FFFFFF"
            },

            createButtonMouseOut() {
                this.iconColor = "#023366"
            },

            updateAnnouncement(){
                this.isLoading = true;
                const payload = {
                    "id": this.selectedAnnoucement.id,
                    'title': this.title,
                    'content': this.content
                };
                this.$store.dispatch('announcements/updateAnnouncement', payload);
            },

            toggleModal(announcement) {
                if (announcement != null) {
                    this.selectedAnnoucement = announcement;
                    this.title = announcement.title;
                    this.date = announcement.date;
                    this.content = announcement.content;
                } else {
                    this.selectedAnnoucement = null;
                }
                this.isModalShow = !this.isModalShow;
            },
        },
        created() {
            this.getAllAnnouncement();
        },
    };
</script>

<style scoped>
    button span {
        font-family: NotoSansKR;
        /* color: #505d7c; */
    }
</style>